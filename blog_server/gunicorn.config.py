
import gevent.monkey
gevent.monkey.patch_all()


workers = 3 #主gun线程 分发三个子worker
# threads = 3  #每个worker 小子线程
worker_class = "gevent" # 采用gevent库，支持异步处理请求，提高吞吐量，
# worker_class = "geventwebsocket.gunicorn.workers.GeventWebSocketWorker" # websocket ，
bind = "0.0.0.0:8005"


