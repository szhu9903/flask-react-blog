import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Comment, Avatar, Button, Input, message, Form } from 'antd';
import { LikeTwoTone, LikeOutlined } from '@ant-design/icons';
import { getUserInfo } from '../../utils/user';
import api from '../../api'
import action from '../../redux/actions';
import './index.css'


const { TextArea } = Input;

export default function BlogComment(props) {
  
  // redux
  const { blogComment, showReplay } = useSelector(state => state.blog);
  const dispatch = useDispatch();
  // 路由参数
  const param = props;
  // 用户信息
  const userInfo = getUserInfo();
  

  // 获取文章评论
  useEffect(() => {
    dispatch(action.blog.getBlogComment(param));
  }, [])
  
  // 提交文章评论
  const addBlogComment = async (values) => {
    // 用户检查
    if (typeof userInfo.id !== "number" && userInfo.id !== 0){
      dispatch(action.login.updateIsShowLogin({isShowLogin: true}));
      return;
    }
    const { commentText, perUser, perComment } = values;
    if (typeof commentText !== 'string' || commentText.trim().length === 0) {
      message.warning("提交内容无效！")
      return ;
    }
    let commintData = {
      data: {
        bc_blogid: param.id,
        bc_content: commentText,
        bc_commentupid: perComment,
        bc_parentuid: perUser,
      }
    }
    let response = await api.blog.addBlogComment(commintData);
    if(response.data.status === 200){
      dispatch(action.blog.updateIsReplay(param));
      dispatch(action.blog.getBlogComment(param));
    }

  }

  // 点赞
  const addLikeLog = ({id, is_like}) => async () => {
    // 用户检查
    if (typeof userInfo.id !== "number" && userInfo.id !== 0){
      dispatch(action.login.updateIsShowLogin({isShowLogin: true}));
      return;
    }
    let likeData = {
      data: {
        bll_blogcommentid: id,
        bll_blogid: param.id,
        bll_status: !is_like,
      },
      type: "replace",
    }
    let response = await api.blog.addBlogLikeLog(likeData);
    if(response.data.status === 200){
      dispatch(action.blog.getBlogComment(param));
    }
  };

  // 显示评论框
  const showDisplay = (id) => () => {
    // 用户检查
    if (typeof userInfo.id !== "number" && userInfo.id !== 0){
      dispatch(action.login.updateIsShowLogin({isShowLogin: true}));
      return;
    }
    const data = { id }
    dispatch(action.blog.updateIsReplay(data));
  }

  // 评论操作
  const likeAction = (comment) => [
    <div>
      <span className="add-like" onClick={addLikeLog(comment)}>
        <span>{comment.is_like?<LikeTwoTone />:<LikeOutlined />}</span>
        <span>{comment.bc_likecount}</span>
      </span>
      <span className="comment-action" onClick={showDisplay(comment.id)}>{comment.id === showReplay.replayId && showReplay.isShow?"取消回复":"回复"}</span>
      <div className='comment-submit' style={{display: comment.id === showReplay.replayId && showReplay.isShow?"block":"none"}}>
        <Form 
          name={`comment_${comment.id}`}
          size="small"
          initialValues={{ perUser: comment.bc_createuid, perComment: comment.bc_commentupid }} 
          onFinish={addBlogComment}
          autoComplete="off" 
        >
          <Form.Item name="perUser" hidden={true}><Input /></Form.Item>
          <Form.Item name="perComment" hidden={true}><Input /></Form.Item>
          <Form.Item name="commentText">
            <TextArea rows={4} placeholder={`@${comment.create_uname}:`} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" size="small" htmlType="submit"> 回 复 </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  ]

  return (
    <div className='commect'>
      {
        userInfo.id && 
        <div className='comment-submit'>
          <Form name="basic" size="small" onFinish={addBlogComment} autoComplete="off" >
            <Form.Item name="commentText">
              <TextArea rows={4}/>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit"> 评 论 </Button>
            </Form.Item>
          </Form>
        </div>
      }

      <h2>评论区. Issues</h2>
      { blogComment.length>0 ?
        blogComment.map((comment) => (
          <Comment
            key={comment.id}
            actions={likeAction({...comment, bc_commentupid: comment.id})}
            author={<a>{comment.create_uname}</a>}
            avatar={<Avatar src={comment.create_uphoto} alt={comment.create_uname} />}
            content={<p>{comment.bc_content}</p>}
          >
            {
              comment.sub.map((sub) => (          
                <Comment
                  key={sub.id}
                  actions={likeAction(sub)}
                  author={<><a>{sub.create_uname}</a><span> 回复 </span><a>{sub.parent_uname}</a></>}
                  avatar={<Avatar src={sub.create_uphoto} alt={sub.create_uname} />}
                  content={<p>{sub.bc_content}</p>}
                />
              ))
            }
          </Comment>
        ))
        : "暂无评论..."
      }

    </div>
  )
}
