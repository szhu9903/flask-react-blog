from flask import g
from app.unit_config import depth_data_map, table_module_map, add_user_col
from .GeneralOperate import GeneralOperate
from .SqlExecute import SqlExecute

class CompositeOperate(GeneralOperate):

    def __init__(self, module):
        super(CompositeOperate, self).__init__(module)

    def check_get_permissions(self):
        pass

    def check_operation_permissions(self):
        user = g.flask_httpauth_user
        # 无用户登录信息，不能进行操作
        if not user:
            g.is_continue_exec = False
            g.result["message"] = "未登录！"
            g.result["status"] = 401
            return
        if g.view_args['config_name'] not in user.get(2, []):
            g.is_continue_exec = False
            g.result["message"] = "无权操作！"
            g.result["status"] = 401
            return

    def get_link_module_data(self, module, row_data):
        module_name = module['tab_name']
        main_col, fk_col = module['link_column'].split(':')
        sql_query = table_module_map[module_name].sql_query_default
        sql_query = f'{sql_query} where {fk_col}=%s'
        sub_datas = SqlExecute.query_sql_data(sql_query, (row_data[main_col]))
        if not g.is_continue_exec:
            return None
        if module.get("sub_tab"):
            result_datas = []
            for sub_data in sub_datas:
                sub_sub_data = self.get_link_module_data(module.get("sub_tab"), sub_data)
                if sub_sub_data: result_datas.append(sub_sub_data[0])
            return result_datas if result_datas else None
        else:
            return sub_datas if sub_datas else None

    def deal_get_data(self):
        super(CompositeOperate, self).deal_get_data()
        depth_col = g.args_data.get('depth_col')
        depth_col_list = depth_col.split(',') if depth_col and depth_col.strip() else []
        result_data = g.result.get('data')
        # 数据集遍历
        for row_data in result_data:
            # url sub参数遍历
            for col_name in depth_col_list:
                if col_name not in depth_data_map:
                    continue
                # 存在下级数据配置，分开处理外键关联，和1对多或多对多
                sub_data = self.get_link_module_data(depth_data_map[col_name], row_data)
                row_data[col_name] = sub_data

    # 提交检查前是否补充提交所需用户数据，通过登录用户获取
    def check_column_data(self):
        config_name = g.view_args.get('config_name')
        if config_name in add_user_col:
            g.json_data['data'][add_user_col[config_name]] = g.flask_httpauth_user.get('id')
        super(CompositeOperate, self).check_column_data()




