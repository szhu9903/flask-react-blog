
from app.comm.TableModule import TableModule

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

table_module_map = {
    'blog': TableModule('blog',['blog_LV', 'blog_UV']),
    'bloguser': TableModule('blog_user'),
    'blogtype': TableModule('blog_type'),
    'blogcomment': TableModule('blog_comment', ['blog_comment_V']),
    'bloglikelog': TableModule('blog_like_log'),
    'btrelation': TableModule('bt_relation'),
    'blogtag': TableModule('blog_tag'),
}


error_info_map = {
    'uk_blog_b_title' : '重复文章！',
    'uk_blog_like_log_bll_blogid_bll_userid': '用户不能重复点赞！',
}





