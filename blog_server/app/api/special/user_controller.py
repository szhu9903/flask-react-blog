import time
import logging
from app.api.special import special
from flask import current_app, request, g, jsonify
from app.comm.RedisExecute import RedisExecute
from app.comm.SqlExecute import SqlExecute
from app.comm.User import User
from app.extensions import github
from app.unit_config import table_module_map

logger = logging.getLogger('app')

# 用户登陆
@special.route('/login/', methods=['POST'])
def user_login():
    try:
        req_data = request.json
        username = req_data['data'].get('user_name')
        password = req_data['data'].get('user_pwd')
        if not (username and password):
            g.result['message'] = '请求数据不完善'
            return jsonify(g.result)
        # 查询用户是否存在
        user = User()
        user_name = user.get_user_message(username)
        # 验证用户密码
        if not (user_name and user.verify_password(password)):
            g.result['message'] = '请检查用户名、密码！'
            return jsonify(g.result)
        # 生成验证Token和刷新Token
        access_token= user.generate_auth_token(user.id, current_app.config['ACCESS_TOKEN_TIME'])
        refresh_token = user.generate_auth_token(user.id, current_app.config['REFRESH_TOKEN_TIME'])
        token_data = {'access_token': str(access_token, encoding='utf-8'),
                      'refresh_token': str(refresh_token, encoding='utf-8'),
                      'token_time': time.time() + current_app.config['ACCESS_TOKEN_TIME'],
                      'user_info': user.user_non_sensitive}
        # 验证Token存入Redis，用于服务端控制Token,修改密码等
        RedisExecute.token_set(user.id, token_data['refresh_token'], current_app.config['REFRESH_TOKEN_TIME'])
        g.result['message'] = '登录成功!'
        g.result['data'] = token_data
    except Exception as Err:
        logger.exception('服务器发生错误！%s' % Err)
        g.result['message'] = f'登录失败：{Err}'
    return jsonify(g.result)

# 验证token失效，刷新Token
@special.route('/update/tokens', methods=['POST'])
def update_tokens():
    try:
        req_data = request.json
        refresh_token = req_data['data'].get('refresh_token')
        if not (refresh_token):
            g.result['message'] = '请求数据不完善'
            return jsonify(g.result)
        # 解析Token
        token_json = User.verify_token(refresh_token)
        if not token_json:
            g.result['message'] = '刷新Token失效!'
        if token_json.get('id'):
            # 去redis验证刷新Token白名单
            redis_refresh_token = RedisExecute.token_get(token_json['id'])
            if redis_refresh_token and refresh_token == str(redis_refresh_token, encoding='utf-8'):
                # 生成验证Token和刷新Token
                access_token = User.generate_auth_token(token_json['id'], current_app.config['ACCESS_TOKEN_TIME'])
                token_data = {'access_token': str(access_token, encoding='utf-8'),
                              'token_time': time.time() + current_app.config['ACCESS_TOKEN_TIME']}
                g.result['message'] = '刷新Token成功!'
                g.result['data'] = token_data
                return jsonify(g.result)
        g.result['message'] = 'refresh token 失效'
    except Exception as Err:
        logger.exception('服务器发生错误！%s' % Err)
        g.result['message'] = f'登录失败：{Err}'
    return jsonify(g.result)


# GitHub 登陆，登陆接口
@special.route('/github/login')
def github_login():
    try:
        return github.authorize()
    except Exception as Err:
        logger.exception('服务器发生错误！%s' % Err)
        g.result['message'] = f'登录失败：{Err}'
    return jsonify(g.result)

# github 登陆回调函数
@special.route('/callback/github/')
@github.authorized_handler
def authorized(access_token):
    try:
        if not access_token:
            g.result['message'] = 'github获取用户失败'
            return jsonify(g.result)
        github_user = github.get('user', access_token=access_token)
        print(github_user)
        user_data = {
            'bu_account': github_user['login'],
            'bu_userphoto': github_user['avatar_url'],
            'bu_username': github_user['name']
        }
        #验证是否存在该用户,存在时更新，不存在时创建
        user = User()
        user_name = user.get_user_message(github_user['login'])
        BlogUser = table_module_map['bloguser']
        if user_name:
            sql_update = BlogUser.get_update_sql(user_data, user.id)
            SqlExecute.commit_sql_data(sql_update, user_data)
        else:
            #创建新用户
            sql_insert = BlogUser.get_insert_sql(user_data)
            res_data = SqlExecute.commit_sql_data(sql_insert, user_data)
            user.id = res_data
        # 生成验证Token和刷新Token
        access_token = user.generate_auth_token(user.id, current_app.config['ACCESS_TOKEN_TIME'])
        refresh_token = user.generate_auth_token(user.id, current_app.config['REFRESH_TOKEN_TIME'])
        # 非敏感数据，存储在localStorage
        user_data['id'] = user.id
        del user_data['bu_account']
        token_data = {'access_token': str(access_token, encoding='utf-8'),
                      'refresh_token': str(refresh_token, encoding='utf-8'),
                      'token_time': time.time() + current_app.config['ACCESS_TOKEN_TIME'],
                      'user_info': user_data}
        # 验证Token存入Redis，用于服务端控制Token,修改密码等
        RedisExecute.token_set(user.id, token_data['refresh_token'], current_app.config['REFRESH_TOKEN_TIME'])
        # return render_template('viewport.html', token=json.dumps(token_data), domain='http://localhost:8080')
        g.result['message'] = '登录成功!'
        g.result['data'] = token_data
    except Exception as Err:
        logger.exception('github 验证失败: %s' % Err)
        g.result['message'] = f'登录失败：{Err}'
    return jsonify(g.result)



