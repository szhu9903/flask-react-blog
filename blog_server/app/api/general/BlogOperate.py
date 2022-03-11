import time
from flask import g, request, current_app
from app.comm.CompositeOperate import CompositeOperate
from app.comm.RedisExecute import RedisExecute
from app.comm.SqlExecute import SqlExecute

class BlogOperate(CompositeOperate):

    def __init__(self, module):
        super(BlogOperate, self).__init__(module)

    # 获取文章详情，有参数ID,仅获取一跳数据，以后加入异步任务
    def deal_get_data(self):
        # time.sleep(10)
        super(BlogOperate, self).deal_get_data()
        result_data = g.result['data']
        record_id = g.view_args.get('record_id')
        if (len(result_data) == 1) and record_id:
            # 记录阅读次数，ip:blogid;blogid1;blogid2
            client_ip = request.headers.get('X-Forwarded-For') or request.remote_addr
            redis_ip_id = '%s-%s' % (client_ip, record_id)
            redis_ip = RedisExecute.sys_get(redis_ip_id)
            if redis_ip:  # 未浏览
                return
            RedisExecute.sys_set(redis_ip_id, 1, current_app.config['BLOG_READ_NUMBER_TIME'])
            # 更新阅读量
            result_data[0]['b_views'] += 1
            update_data = { "b_views": result_data[0]['b_views'] }
            sql_update = self.module.get_update_sql(update_data, record_id)
            SqlExecute.commit_sql_data(sql_update, update_data)
            return

