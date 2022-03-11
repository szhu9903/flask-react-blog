import os

# from dotenv import load_dotenv
#
# # 加载 env, 部署使用docker 环境变量，不上传本地环境文件
# dotenv_path = os.path.join(os.path.abspath(os.path.dirname(__file__)), '.env')
# if os.path.exists(dotenv_path):
#     load_dotenv(dotenv_path, override=True)  #  override=True: 覆写已存在的变量

from app import create_app
app = create_app(os.environ.get('FLASK_CONFIG'))

@app.route("/test")
def test():
    return "<h1>szhu9903</h1>"

# @app.route("/wstest")
# def wstest():
#     ws = request.environ.get("wsgi.websocket")
#     if not ws:
#         return "error connect websocket!"
#     while not ws.closed:
#         req_data = ws.receive()
#         print("success websocket")
#         if req_data:
#             ws.send("ECHO: " + req_data)


if __name__ == '__main__':
    # from gevent.pywsgi import WSGIServer
    # from geventwebsocket.handler import WebSocketHandler
    # server = WSGIServer(('0.0.0.0', 8005), app, handler_class=WebSocketHandler)
    # logger.info("start")
    # server.serve_forever()
    app.run(host='0.0.0.0', port=8005)