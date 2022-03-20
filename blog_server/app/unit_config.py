

default_result = {
    'status': 200,
    'code': 0x06,
    'data': None,
    'message': '请求成功'
}

default_limit_size = 300

default_page_data = {
    "page_size": 10,
    "page_index": 1
}

# 补充登录用户数据字段
add_user_col = {
    'bloglikelog': 'bll_userid',
    'blog': 'b_createuid',
}

# 查询子表数据
depth_data_map = {
    "b_type": {
        "tab_name": "blogtype",
        "link_column": "b_type:id",
    },
    "b_tag": {
        "tab_name": "btrelation",
        "link_column": "id:bt_blogid",
        "sub_tab":{
            "tab_name": "blogtag",
            "link_column": "bt_tagid:id",
        }
    }
}

# 提交组合配置
depth_post_map = {
    "b_tag": {
        "tab_name": "btrelation",
        "link_column": "id:bt_blogid",
    }
}


error_info_map = {
    'uk_blog_b_title' : '重复文章！',
    'uk_blog_like_log_bll_blogid_bll_userid': '用户不能重复点赞！',
}





