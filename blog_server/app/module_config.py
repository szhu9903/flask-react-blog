
from app.comm.TableModule import TableModule

table_module_map = {
    'blog': TableModule('blog',['blog_LV', 'blog_UV']),
    'bloguser': TableModule('blog_user'),
    'blogtype': TableModule('blog_type'),
    'blogcomment': TableModule('blog_comment', ['blog_comment_V']),
    'bloglikelog': TableModule('blog_like_log'),
    'btrelation': TableModule('bt_relation'),
    'blogtag': TableModule('blog_tag'),
}
