-- 更新分类下数量
DROP TRIGGER IF EXISTS blog_TAI;
DELIMITER ||
CREATE TRIGGER blog_TAI AFTER INSERT
ON blog FOR EACH ROW 
BEGIN
	UPDATE blog_type SET bt_blogcount = bt_blogcount + 1 WHERE id=NEW.b_type;
END
||
DELIMITER;

-- 创建新用户默认分配角色
DROP TRIGGER IF EXISTS blog_user_TAI;
DELIMITER ||
CREATE TRIGGER blog_user_TAI AFTER INSERT
ON blog_user FOR EACH ROW
BEGIN
    INSERT ur_relation(ur_userid, ur_roleid) VALUES (NEW.id, 2);
END
||
DELIMITER;

-- 新增点赞更新文章或评论点赞量
DROP TRIGGER IF EXISTS blog_like_log_TAI;
DELIMITER ||
CREATE TRIGGER blog_like_log_TAI AFTER INSERT
ON blog_like_log FOR EACH ROW
BEGIN
    IF (NEW.bll_blogcommentid IS NULL) THEN
        UPDATE blog SET b_likecount=b_likecount+1 WHERE id=NEW.bll_blogid;
    ELSE
        UPDATE blog_comment SET bc_likecount=bc_likecount+1 WHERE id=NEW.bll_blogcommentid;
    END IF;
END
||
DELIMITER;

-- 更新点赞 文章或评论点赞量
DROP TRIGGER IF EXISTS blog_like_log_TAU;
DELIMITER ||
CREATE TRIGGER blog_like_log_TAU AFTER INSERT
ON blog_like_log FOR EACH ROW
BEGIN
    DECLARE add_like INT;
    IF NEW.bll_status = 1 THEN
        SET add_like = 1;
    ELSE
        SET add_like = -1;
    END IF;
    IF (NEW.bll_blogcommentid IS NULL) THEN
        UPDATE blog SET b_likecount=b_likecount+add_like WHERE id=NEW.bll_blogid;
    ELSE
        UPDATE blog_comment SET bc_likecount=bc_likecount+add_like WHERE id=NEW.bll_blogcommentid;
    END IF;
END
||
DELIMITER;

