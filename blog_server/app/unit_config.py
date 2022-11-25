

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
    # blog
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
    },
    # user
    "u_role": {
        "tab_name": "urrelation",
        "link_column": "id:ur_userid",
        "sub_tab": {
            "tab_name": "sysrole",
            "link_column": "ur_roleid:id",
        }
    },
    # role
    "r_purview": {
        "tab_name": "rprelation",
        "link_column": "id:rp_roleid",
        "sub_tab": {
            "tab_name": "syspurview",
            "link_column": "rp_purviewid:id",
        }
    },
    "r_menu": {
        "tab_name": "rmrelation",
        "link_column": "id:rm_roleid",
        "sub_tab": {
            "tab_name": "sysmenu",
            "link_column": "rm_menuid:id",
        }
    }
}

# 提交组合配置
depth_post_map = {
    # blog
    "b_tag": {
        "tab_name": "btrelation",
        "link_column": "id:bt_blogid",
    },
    # user
    "u_role": {
        "tab_name": "urrelation",
        "link_column": "id:ur_userid",
    },
    # role
    "r_purview": {
        "tab_name": "rprelation",
        "link_column": "id:rp_roleid",
    },
    "r_menu": {
        "tab_name": "rmrelation",
        "link_column": "id:rm_roleid",
    }
}


error_info_map = {
    'uk_blog_b_title' : '重复文章！',
    'uk_blog_like_log_bll_blogid_bll_userid': '用户不能重复点赞！',
    'uk_blog_user_zu_account': '用户重复',
}





