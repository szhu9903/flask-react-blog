
from app.comm.TableModule import TableModule

table_module_map = {
    'blog': TableModule('blog',['blog_LV', 'blog_UV']),
    'bloguser': TableModule('blog_user'),
    'sysrole': TableModule('sys_role'),
    'syspurview': TableModule('sys_purview'),
    'sysmenu': TableModule('sys_menu'),
    'urrelation': TableModule('ur_relation'),
    'rprelation': TableModule('rp_relation'),
    'rmrelation': TableModule('rm_relation'),
    'blogtype': TableModule('blog_type'),
    'blogcomment': TableModule('blog_comment', ['blog_comment_V']),
    'bloglikelog': TableModule('blog_like_log'),
    'btrelation': TableModule('bt_relation'),
    'blogtag': TableModule('blog_tag'),
}
