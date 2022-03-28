import os
import logging
import datetime
from nextcloud_client import Client
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

# 文件上传
@special.route("/upload/img/", methods=["POST"])
@auth_user
def upload_img():
    try:
        user = g.flask_httpauth_user
        if (not user) or ("blog" not in user.get(2, [])):
            g.is_continue_exec = False
            g.result["message"] = "无权上传！"
            g.result["status"] = 403
            return jsonify(g.result)
        print('request.filesrequest.files')
        file_data = request.files['file']
        print('file_datafile_datafile_data', file_data)
        # 连接文件服务
        nextCloud = Client(current_app.config['NEXTCLOUD_URL'])
        nextCloud.login(current_app.config['NEXTCLOUD_USERNAME'], current_app.config['NEXTCLOUD_PASSWORD'])
        # 文件保存位置 文件名
        now_date = datetime.datetime.now()
        file_name = now_date.strftime("%Y%m%d%H%M%S%f") + file_data.filename
        save_path = os.path.join(current_app.config['BLOG_IMAGES'], file_name)
        # 上传文件，获取共享连接
        nextCloud.put_file_contents(save_path, file_data)
        link_info = nextCloud.share_file_with_link(save_path)

        g.result['data'] = {"link_url": f'{link_info.get_link()}/preview'}
    except Exception as Err:
        logger.error('服务器发生错误！%s' % Err)
        g.result['message'] = f'获取菜单失败：{Err}'
        g.result['code'] = 0x22
    return jsonify(g.result)
