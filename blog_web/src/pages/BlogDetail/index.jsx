import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Row, Col, Tag, Affix } from 'antd'
import { MessageOutlined, LikeOutlined, EyeOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm' 
import MarkdownNavbar from 'markdown-navbar';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import { xonokai } from 'react-syntax-highlighter/dist/esm/styles/prism'
import action from '../../redux/actions';
import UserCar from '../../components/UserCar'
import BlogComment from '../../components/BlogComment'
import { getColorArr } from '../../utils/config';
import './index.css'
import '../../assets/rainbow.css'
import 'markdown-navbar/dist/navbar.css';

export default function BlogDetail() {

  const param = useParams();

  const { blogDetail } = useSelector(state => state.blog);
  const dispatch = useDispatch();

  // 进入详情页面，根据param加载文章内容
  useEffect(()=>{
    dispatch(action.blog.getBlogDetail(param));
  }, []);


  // 代码高亮
  const Code = {
    code({node, inline, className, children, ...props}) {
      const match = /language-(\w+)/.exec(className || '')
      return !inline && match ? (
        <SyntaxHighlighter 
        children={String(children).replace(/\n$/, '')}
          style={xonokai}
          language={match[1]}
          PreTag="div"
          {...props}
        />
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      )
    }
  }

  return (
    <>
      <Row justify="center">
        <Col span={12}>
          <div className='content'>
            {/* 文章区域 */}
            <div className='detail'>
              <h1>{blogDetail.b_title}</h1>
              <div className='synoposis'>
                <div className='synoposis-args'>
                  <span>作者：{blogDetail.bu_username} 于 {blogDetail.b_createdate?blogDetail.b_createdate.substr(0, 10):""} 发布</span> 
                  <span><EyeOutlined /> {blogDetail.b_views} </span>
                  <span><LikeOutlined /> {blogDetail.b_likecount}  </span>
                  <span><MessageOutlined /> {blogDetail.b_commentcount} </span>
                </div>
                <div>
                  文章分类：{blogDetail.b_type?blogDetail.b_type[0].bt_name:""} 文章标签：
                  { blogDetail.b_tag &&
                    blogDetail.b_tag.map((tag) => (<Tag key={tag.id} color={getColorArr()}>{tag.bt_tagname}</Tag>))
                  }
                </div>
              </div>
              <div id='write'>
                <ReactMarkdown 
                  components={Code}
                  children={blogDetail.b_content}
                  remarkPlugins={[remarkGfm]}
                />
              </div>
            </div>
            {/* 评论区 */}
            <BlogComment {...param}/>
          </div>

        </Col>
        <Col span={4}>
          <div>
            <UserCar />
            <Affix offsetTop={68}>
              <div className='detail-nav'>
                <div className='tag-title'>
                    文章导航
                </div>
                <div className="navigation">
                  <MarkdownNavbar source={blogDetail.b_content} />
                </div>
              </div>
            </Affix>
          </div>
        </Col>
      </Row> 
    </>
  )
}
