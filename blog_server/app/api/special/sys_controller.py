import logging
from flask import current_app, g, request, jsonify
from app.api.special import special
from app.comm.RedisExecute import RedisExecute

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
