import logging
from flask import Flask
from config import config_map
from app.utils.loging_util import create_logger
from app.utils.json_util import DateEncoder

logger = logging.getLogger('app')

def create_app(config_name):
    app = Flask(__name__)
    app.config.from_object(config_map[config_name]())
    app.json_encoder = DateEncoder
    # 加载蓝图，及消息中间件
    init_blueprint(app)
    # 加载扩展
    init_extensions(app)
    return app

def init_blueprint(new_app):
    # 过程中初始化数据模型需要手动打开上下文 获取数据库连接
    with new_app.app_context():
        from app.api import special
        from app.api import general
    new_app.register_blueprint(special, url_prefix='/api/v2')
    new_app.register_blueprint(general, url_prefix='/api/v3')

def init_extensions(new_app):
    from app.extensions import cors, github
    # 跨域
    cors.init_app(new_app, resources={r"/api/v3/*": {"origins": "*"}})
    cors.init_app(new_app, resources={r"/api/v2/*": {"origins": "*"}})
    # GitHub 登陆配置
    github.init_app(new_app)



