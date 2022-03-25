import logging
from flask import current_app, g, request, jsonify
from app.api.special import special
from app.comm.RedisExecute import RedisExecute
from app.comm.SqlExecute import SqlExecute
from app.utils.auth_utils import auth_user
from .special_help import format_menu

logger = logging.getLogger('app')

# 获取首页点击量，
@special.route('/syslike/', methods=['GET'])
def get_sys_like():
    try:
        # 查询redis中是否存在网站点击量数据
        index_num = RedisExecute.sys_get("index_like_number")
        if not index_num:
            index_num = 9999
            RedisExecute.sys_set("index_like_number", index_num, current_app.config['INDEX_LIKE_NUMBER_TIME'])
        # 格式化数据 返回结果
        g.result['data'] = {"sb_number": int(index_num)}
    except Exception as Err:
        logger.exception('服务器发生错误！%s' % Err)
        g.result['message'] = f'登录失败：{Err}'
    return jsonify(g.result)

# 获取首页点击量增加
@special.route('/syslike/', methods=['PUT'])
def put_sys_like():
    try:
        # 查询redis中是否存在网站点击量数据
        new_like = int(request.json['data'].get('sb_number') or 0)
        if not new_like:
            g.result['message'] = '更新参数有误'
            return jsonify(g.result)
        RedisExecute.sys_set("index_like_number", new_like, current_app.config['INDEX_LIKE_NUMBER_TIME'])
        g.result['message'] = '更新成功'
    except Exception as Err:
        logger.exception('服务器发生错误！%s' % Err)
        g.result['message'] = f'登录失败：{Err}'
    return jsonify(g.result)


# 获取用户后台管理菜单
@special.route('/usermenu/', methods=['GET'])
@auth_user
def get_user_menus():
    try:
        user_id = g.flask_httpauth_user.get('id') if g.flask_httpauth_user else None
        if user_id is None:
            g.result['status'] = 401
            g.result['message'] = '警告⚠️：后台无权!'
            return jsonify(g.result)
        # 获取用户菜单
        query_sql = """
            SELECT
                sm.id,sm.sm_name,sm.sm_menupath,sm.sm_menuupid,sm.sm_sort
            FROM rm_relation rr
            LEFT JOIN sys_role sr ON (rr.rm_roleid = sr.id)
            LEFT JOIN sys_menu sm ON (rr.rm_menuid = sm.id)
            LEFT JOIN ur_relation ur ON (sr.id = ur.ur_roleid)
            LEFT JOIN blog_user bu on (ur.ur_userid = bu.id)
            where bu.bu_delflag=0 and bu.id=%s
            group by sm.id order by sm.sm_sort
        """
        user_menus = SqlExecute.query_sql_data(query_sql, (user_id))
        if not user_menus:
            g.result['status'] = 401
            g.result['message'] = '警告：后台无权!'
            return jsonify(g.result)
        # 格式化菜单
        new_menus = format_menu(user_menus, None)
        g.result['data'] = new_menus
    except Exception as Err:
        logger.error('服务器发生错误！%s' % Err)
        g.result['message'] = f'获取菜单失败：{Err}'
        g.result['code'] = 0x22
    return jsonify(g.result)

#
# # 文件上传
# @api.route("/file/upload", methods=["post"])
# @auth.login_required
# def file_upload():
#     try:
#         file_data = request.files['file']
#         now_date = datetime.datetime.now()
#         # 每日文件夹
#         file_path = os.path.join(current_app.config['FILE_PATH'], now_date.strftime("%Y%m%d"))
#         if not os.path.isdir(file_path):
#             os.makedirs(file_path)
#         # 文件名
#         file_name = now_date.strftime("%H%M%S") + now_date.strftime("%f") + file_data.filename
#         # 保存文件 返回路径
#
#         save_path = os.path.join(file_path, file_name)
#         file_data.save(save_path)
#         res_data = {"file_url": "http://zsjblog.com" + save_path.replace(current_app.config['BASE_PATH'], '')}
#         return success_response(res_data)
#     except Exception as Err:
#         logger.error('request [%s] err %s' % (request.path, Err))
#         return error_response("ERR", str(Err))
