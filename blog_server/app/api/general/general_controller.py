import logging
from . import general
from flask import current_app, request, g, jsonify
from app.comm.GeneralOperate import GeneralOperate
from app.comm.CompositeOperate import CompositeOperate
from .BlogOperate import BlogOperate
from .CommentController import CommentController
from app.module_config import table_module_map

logger = logging.getLogger('app')

operate_config = {
    'blog': BlogOperate(table_module_map['blog']),
    'blogcomment': CommentController(table_module_map['blogcomment']),
    'blogtype': CompositeOperate(table_module_map['blogtype']),
    'bloglikelog': CompositeOperate(table_module_map['bloglikelog']),
    'blogtag': CompositeOperate(table_module_map['blogtag']),
}

# get 请求通用处理
@general.route('/<string:config_name>/', methods=["GET"])
@general.route('/<string:config_name>/<int:record_id>/', methods=["GET"])
def general_get_api(config_name, record_id=None):
    logger.info(f"{config_name}-GET")
    try:
        if config_name.lower() in operate_config.keys():
            operate_config[config_name].deal_get_method(request)
        else:
            g.result["message"] = f'未匹配到视图{config_name}'
    except Exception as Err:
        g.result["message"] = f'异常{str(Err)}'
    logger.info(f"res-{config_name}-GET===={g.result['status']}")
    return jsonify(g.result)

# post 请求通用处理
@general.route('/<string:config_name>/', methods=["POST"])
def general_post_api(config_name):
    logger.info(f"{config_name}")
    try:
        if config_name.lower() in operate_config.keys():
            operate_config[config_name].deal_post_method(request)
        else:
            g.result["message"] = f'未匹配到视图{config_name}'
    except Exception as Err:
        g.result["message"] = f'异常{str(Err)}'
    logger.info(f"[res-{config_name}]===={g.result['status']}")
    return jsonify(g.result)

# put 请求通用处理
@general.route('/<string:config_name>/<int:record_id>/', methods=["PUT"])
def general_put_api(config_name, record_id):
    logger.info(f"{config_name}-{record_id}")
    try:
        if config_name.lower() in operate_config.keys():
            operate_config[config_name].deal_put_method(request)
        else:
            g.result["message"] = f'未匹配到视图{config_name}'
    except Exception as Err:
        g.result["message"] = f'异常{str(Err)}'
    logger.info(f"res-{config_name}-{record_id}===={g.result['status']}")
    return jsonify(g.result)

# delete 请求通用处理
@general.route('/<string:config_name>/<int:record_id>/', methods=["DELETE"])
def general_delete_api(config_name, record_id):
    logger.info(f"{config_name}-{record_id}")
    try:
        if config_name.lower() in operate_config.keys():
            operate_config[config_name].deal_delete_method(request)
        else:
            g.result["message"] = f'未匹配到视图{config_name}'
    except Exception as Err:
        g.result["message"] = f'异常{str(Err)}'
    logger.info(f"res-{config_name}-{record_id}===={g.result['status']}")
    return jsonify(g.result)

