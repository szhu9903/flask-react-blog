INSERT INTO sys_purview(sp_name, sp_apipath, sp_type) values ('文章操作', 'blog', 2);
INSERT INTO sys_purview(sp_name, sp_apipath, sp_type) values ('文章分类操作', 'blogtype', 2);
INSERT INTO sys_purview(sp_name, sp_apipath, sp_type) values ('文章标签操作', 'blogtag', 2);
INSERT INTO sys_purview(sp_name, sp_apipath, sp_type) values ('评论操作', 'blogcomment', 2);
INSERT INTO sys_purview(sp_name, sp_apipath, sp_type) values ('点赞', 'bloglikelog', 2);
INSERT INTO sys_purview(sp_name, sp_apipath, sp_type) values ('用户查看', 'bloguser', 1);
INSERT INTO sys_purview(sp_name, sp_apipath, sp_type) values ('用户管理', 'bloguser', 2);
INSERT INTO sys_purview(sp_name, sp_apipath, sp_type) values ('角色', 'sysrole', 2);

INSERT INTO sys_menu(sm_name, sm_menupath, sm_sort) values ('文章', '/blog', 1);
INSERT INTO sys_menu(sm_name, sm_menupath, sm_sort) values ('首页', '/home', 2);
INSERT INTO sys_menu(sm_name, sm_sort) values ('配置', 3);
INSERT INTO sys_menu(sm_name, sm_menupath, sm_menuupid, sm_sort) values ('分类', '/type', 3, 4);
INSERT INTO sys_menu(sm_name, sm_menupath, sm_menuupid, sm_sort) values ('标签', '/tag', 3, 5);

INSERT INTO sys_role(sr_name) values ('管理员');
INSERT INTO sys_role(sr_name) values ('GitHub');

INSERT INTO blog_user(bu_account, bu_pwd, bu_username, bu_isadmin) values ('test1', 'pbkdf2:sha256:150000$JHc2Qw9u$9ee0320aea64911a11f3e8bb972214b89e6fb6d0bb303e3aec78e8e5e9966177', '测试1', 1);
INSERT INTO blog_user(bu_account, bu_pwd, bu_username, bu_isadmin) values ('test2', 'pbkdf2:sha256:150000$JHc2Qw9u$9ee0320aea64911a11f3e8bb972214b89e6fb6d0bb303e3aec78e8e5e9966177', '测试2', 0);

INSERT INTO ur_relation(ur_userid, ur_roleid) values (1, 1);

INSERT INTO rp_relation(rp_roleid, rp_purviewid) values (1, 1),(1, 2),(1, 3),(1, 4),(1, 5),(1, 7),(1, 8),(2, 4),(2, 5),(2, 6);

INSERT INTO rm_relation(rm_roleid, rm_menuid) values (1, 1),(1, 2),(1, 3),(1, 4),(1, 5);

INSERT INTO blog_type(bt_name) values ('python');
INSERT INTO blog_type(bt_name) values ('react');

INSERT INTO blog_tag(bt_tagname) values ('flask');
INSERT INTO blog_tag(bt_tagname) values ('twisted');
INSERT INTO blog_tag(bt_tagname) values ('react-route');
INSERT INTO blog_tag(bt_tagname) values ('redux');

INSERT INTO blog(b_title, b_brief, b_content, b_type, b_createuid) values ('test部署', 'flask 部署到云服务器', '# 测试文章内容', 1, 1);
INSERT INTO blog(b_title, b_brief, b_content, b_type, b_createuid) values ('前端', '测试', '# 测试文章内容', 2, 1);
INSERT INTO blog(b_title, b_brief, b_content, b_type, b_createuid) values ('test', '描述', '# 测试文章内容', 1, 1);

INSERT INTO bt_relation(bt_blogid, bt_tagid) values (1, 1);
INSERT INTO bt_relation(bt_blogid, bt_tagid) values (2, 3);
INSERT INTO bt_relation(bt_blogid, bt_tagid) values (2, 4);
INSERT INTO bt_relation(bt_blogid, bt_tagid) values (3, 1);
INSERT INTO bt_relation(bt_blogid, bt_tagid) values (3, 2);
