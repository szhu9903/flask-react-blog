from redis import Redis
from flask import current_app


class RedisExecute(object):

    @staticmethod
    def token_set(name, value, ex):
        redis = Redis(connection_pool=current_app.config['TOKEN_REDIS_POOL'])
        return redis.set(name, value, ex)

    @staticmethod
    def token_get(name):
        redis = Redis(connection_pool=current_app.config['TOKEN_REDIS_POOL'])
        return redis.get(name)


    @staticmethod
    def sys_get(name):
        redis = Redis(connection_pool=current_app.config['SYS_REDIS_POOL'])
        return redis.get(name)

    @staticmethod
    def sys_set(name, value, ex):
        redis = Redis(connection_pool=current_app.config['SYS_REDIS_POOL'])
        return redis.set(name, value, ex)
