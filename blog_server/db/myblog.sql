
-- 用户
CREATE TABLE IF NOT EXISTS `blog_user`(
    /* ID */
    `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    /* 账号 */
    `bu_account` VARCHAR(30)  NOT NULL,
    /* 密码 */
    `bu_pwd` VARCHAR(100)  NOT NULL DEFAULT '',
    /* 性别*/
    `bu_sex` VARCHAR(10)  NOT NULL  DEFAULT '',
    /* 用户名 */
    `bu_username` VARCHAR(50)  NOT NULL DEFAULT '',
    /* 头像地址 */
    `bu_userphoto` VARCHAR(100)  NOT NULL DEFAULT '' ,
    /* 电话 */
    `bu_phone` VARCHAR(50)  NOT NULL DEFAULT '',
    /* 邮箱 */
    `bu_email` VARCHAR(50)  NOT NULL DEFAULT '',
    /* 注册时间 */
    `bu_createdate` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    /* 有效状态 0：有效;1：无效 */
    `bu_delflag` INT UNSIGNED NOT NULL DEFAULT 0,
    UNIQUE KEY `uk_blog_user_zu_account` (`bu_account`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 角色
CREATE TABLE IF NOT EXISTS `sys_role`(
    /* ID */
    `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY ,
    /* 角色名称 */
    `sr_name` VARCHAR(30) NOT NULL ,
    UNIQUE KEY `uk_sys_role_sr_name` (`sr_name`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 权限
CREATE TABLE IF NOT EXISTS `sys_purview`(
    /* ID */
    `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY ,
    /* 权限名称 */
    `sp_name` VARCHAR(30) NOT NULL ,
    /* api_path */
    `sp_apipath` VARCHAR(30) NOT NULL ,
    /* 权限类型(1:查看2:操作) */
    `sp_type` TINYINT UNSIGNED NOT NULL ,
    UNIQUE KEY `uk_sys_role_sr_name` (`sp_name`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 用户-角色关联表
CREATE TABLE IF NOT EXISTS `ur_relation`(
    /* ID */
    `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY ,
    /* 用户ID(blog_user) */
    `ur_userid` INT UNSIGNED NOT NULL ,
    /* 角色ID(sys_role) */
    `ur_roleid` INT UNSIGNED NOT NULL ,
    UNIQUE KEY `uk_ur_relation_ur_userid_ur_roleid` (`ur_userid`, `ur_roleid`),
    CONSTRAINT `fk_ur_relation_ur_userid` FOREIGN KEY (`ur_userid`) REFERENCES blog_user(`id`) ON DELETE CASCADE ,
    CONSTRAINT `fk_ur_relation_ur_roleid` FOREIGN KEY (`ur_roleid`) REFERENCES sys_role(`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 角色-权限关联表
CREATE TABLE IF NOT EXISTS `rp_relation`(
    /* ID */
    `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY ,
    /* 角色ID(sys_role) */
    `rp_roleid` INT UNSIGNED NOT NULL ,
    /* 权限ID(syspurview) */
    `rp_purviewid` INT UNSIGNED NOT NULL ,
    UNIQUE KEY `uk_ur_relation_rp_roleid_rp_purviewid` (`rp_roleid`, `rp_purviewid`),
    CONSTRAINT `fk_rp_relation_rp_roleid` FOREIGN KEY (`rp_roleid`) REFERENCES sys_role(`id`),
    CONSTRAINT `fk_rp_relation_rp_purviewid` FOREIGN KEY (`rp_purviewid`) REFERENCES sys_purview(`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 文章
CREATE TABLE IF NOT EXISTS `blog`(
    /* ID */
    `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    /* 标题 */
    `b_title` VARCHAR(100)  NOT NULL DEFAULT '',
    /* 摘要*/
    `b_brief` VARCHAR(300)  NOT NULL DEFAULT '',
    /* 内容 */
    `b_content` LONGTEXT NULL,
    /* 浏览量	 */
    `b_views` INT UNSIGNED  NOT NULL DEFAULT 0,
    /* 点赞量 */
    `b_likecount` INT UNSIGNED  NOT NULL DEFAULT 0,
    /* 评论量 */
    `b_commentcount` INT UNSIGNED  NOT NULL DEFAULT 0,
    /* 分类(blog_type) */
    `b_type` INT UNSIGNED NOT NULL,
    /* 封面地址 */
    `b_cover` VARCHAR(100) NOT NULL DEFAULT '',
    /* 创建人(blog_user) */
    `b_createuid` INT UNSIGNED NOT NULL,
    /* 创建时间 */
    `b_createdate` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    /* 有效状态 0：有效; 1：无效 */
    `b_delflag` INT UNSIGNED NOT NULL DEFAULT 0,
    UNIQUE KEY `uk_blog_b_title` (`b_title`),
    CONSTRAINT `fk_blog_b_type` FOREIGN KEY (`b_type`) REFERENCES `blog_type`(`id`),
    CONSTRAINT `fk_blog_b_createuid` FOREIGN KEY (`b_createuid`) REFERENCES `blog_user`(`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 文章点赞记录
CREATE TABLE IF NOT EXISTS `blog_like_log`(
    /* ID */
    `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    /* 点赞文章(blog) */
    `bll_blogid` INT UNSIGNED NOT NULL,
    /* 点赞评论(blog_comment) */
    `bll_blogcommentid` INT UNSIGNED NULL,
    /* 点赞用户(blog_user) */
    `bll_userid` INT UNSIGNED NOT NULL,
    /* 点赞状态 0:取消点赞; 1:已点赞 */
    `bll_status` INT UNSIGNED NOT NULL DEFAULT 0,
    /* 点赞时间 */
    `bll_createdate` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE `uk_blog_like_log_bll_blogid_bll_blog_commentid_bll_userid` (`bll_blogid`,`bll_blogcommentid`,`bll_userid`),
    CONSTRAINT `fk_blog_like_log_bll_blogid` FOREIGN KEY (`bll_blogid`) REFERENCES `blog`(`id`),
    CONSTRAINT `fk_blog_like_log_bll_blogcommentid` FOREIGN KEY (`bll_blogcommentid`) REFERENCES `blog_comment`(`id`),
    CONSTRAINT `fk_blog_like_log_bll_userid` FOREIGN KEY (`bll_userid`) REFERENCES `blog_user`(`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 文章分类
CREATE TABLE IF NOT EXISTS `blog_type`(
    /* ID */
    `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    /* 分类名称 */
    `bt_name` VARCHAR(100)  NOT NULL DEFAULT '',
    /* 分类下文章量 */
    `bt_blogcount` INT UNSIGNED  NOT NULL DEFAULT 0,
    UNIQUE KEY `uk_blog_type_bt_name` (`bt_name`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 文章-标签关联表
CREATE TABLE IF NOT EXISTS `bt_relation`(
    /* ID */
    `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY ,
    /* 文章ID(blog) */
    `bt_blogid` INT UNSIGNED NOT NULL ,
    /* 标签ID(blog_tag) */
    `bt_tagid` INT UNSIGNED NOT NULL ,
    UNIQUE KEY `uk_bt_relation_bt_blogid_bt_tagid` (`bt_blogid`, `bt_tagid`),
    CONSTRAINT `fk_bt_relation_bt_blogid` FOREIGN KEY (`bt_blogid`) REFERENCES blog(`id`) ON DELETE CASCADE ,
    CONSTRAINT `fk_bt_relation_bt_tagid` FOREIGN KEY (`bt_tagid`) REFERENCES blog_tag(`id`) ON DELETE CASCADE
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 技术标签
CREATE TABLE IF NOT EXISTS `blog_tag`(
    /* ID */
    `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    /* 标签名称 */
    `bt_tagname` VARCHAR(100)  NOT NULL DEFAULT '',
    UNIQUE KEY `uk_blog_tag_bt_tagname` (`bt_tagname`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 文章评论
CREATE TABLE IF NOT EXISTS `blog_comment`(
    /* ID */
    `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    /* 评论所属文章(blog) */
    `bc_blogid` INT UNSIGNED NOT NULL,
    /* 评论内容 */
    `bc_content` VARCHAR(300)  NOT NULL DEFAULT '',
    /* 点赞量 */
    `bc_likecount` INT UNSIGNED NOT NULL DEFAULT 0,
    /* 上级评论(blog_commect) */
    `bc_commentupid` INT UNSIGNED NULL,
    /* 回复的人(blog_user) */
    `bc_parentuid` INT UNSIGNED NULL,
    /* 创建人(blog_user) */
    `bc_createuid` INT UNSIGNED NOT NULL,
    /* 创建时间 */
    `bc_createdate` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT `fk_blog_comment_bc_blogid` FOREIGN KEY (`bc_blogid`) REFERENCES `blog`(`id`),
    CONSTRAINT `fk_blog_comment_bc_commentupid` FOREIGN KEY (`bc_commentupid`) REFERENCES `blog_comment`(`id`),
    CONSTRAINT `fk_blog_comment_bc_parentuid` FOREIGN KEY (`bc_parentuid`) REFERENCES `blog_user`(`id`),
    CONSTRAINT `fk_blog_comment_bc_createuid` FOREIGN KEY (`bc_createuid`) REFERENCES `blog_user`(`id`)
 )ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 系统配置(首页点赞量、)
CREATE TABLE if not exists `sys_blog`(
    /* ID */
    `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    /* 配置项名称 */
    `sb_name` VARCHAR(100)  NOT NULL DEFAULT '',
    /* 配置项数字 */
    `sb_number` INT  NOT NULL DEFAULT 0,
    /* 配置项信息描述 */
    `sb_context` VARCHAR(100)  NOT NULL DEFAULT '',
    UNIQUE KEY `uk_blog_tag_sb_name` (`sb_name`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


