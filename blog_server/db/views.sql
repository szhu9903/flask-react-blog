-- 文章列表视图
CREATE OR REPLACE VIEW blog_LV AS
SELECT
a.id, a.b_title, a.b_brief, a.b_views, a.b_likecount, a.b_commentcount,  a.b_cover,  a.b_createdate, a.b_delflag,
a.b_createuid, b.bu_username,
a.b_type, c.bt_name
FROM blog a
LEFT JOIN blog_user b ON (a.b_createuid = b.id)
LEFT JOIN blog_type c ON (a.b_type = c.id)

-- 文章用户视图
CREATE OR REPLACE VIEW blog_UV AS
SELECT
a.id, a.b_title, a.b_brief, a.b_content, a.b_views, a.b_likecount, a.b_commentcount,  a.b_cover,  a.b_createdate, a.b_delflag, a.b_type,
a.b_createuid, b.bu_username
FROM blog a
LEFT JOIN blog_user b ON (a.b_createuid = b.id)

-- 评论视图
CREATE OR replace VIEW blog_comment_V AS
SELECT
    a.id,a.bc_blogid,a.bc_content,a.bc_likecount,a.bc_commentupid,
    a.bc_createuid,b.bu_username AS create_uname,b.bu_userphoto AS create_uphoto,
    a.bc_parentuid,c.bu_username AS parent_uname,c.bu_userphoto AS parent_uphoto,
    a.bc_createdate
FROM blog_comment a
LEFT JOIN blog_user b ON (a.bc_createuid=b.id)
LEFT JOIN blog_user c ON (a.bc_parentuid=c.id)

-- 用户视图：角色、权限
CREATE OR replace VIEW blog_user_V AS
SELECT
    a.id,a.bu_account,a.bu_username,a.bu_delflag,
    c.sr_name,e.sp_name,e.sp_apipath,e.sp_type
FROM blog_user a
LEFT JOIN ur_relation b ON (a.id=b.ur_userid)
LEFT JOIN sys_role c ON (b.ur_roleid = c.id)
LEFT JOIN rp_relation d ON (c.id = d.rp_roleid)
LEFT JOIN sys_purview e ON (d.rp_purviewid = e.id)

