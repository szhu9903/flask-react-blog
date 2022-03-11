import React from 'react'
import { useSelector } from 'react-redux'
import { List, Space, Divider, Skeleton } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined, UserOutlined, FieldTimeOutlined, EyeOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import './index.css'

export default function BlogList(props) {

  const { blogList, blogTotalSize } = useSelector(state => state.blog);

  const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );

  return (
    
    <div className='blog-list'>
      {blogList.length === 0 && blogTotalSize === null
        ?
        <Skeleton active />
        :
        <List
          itemLayout="vertical"
          size="large"
          dataSource={blogList}
          renderItem={blog => (
            <List.Item
              key={blog.id}
              actions={[
                <IconText icon={EyeOutlined} text={blog.b_views} key="list-vertical-star-o" />,
                <IconText icon={LikeOutlined} text={blog.b_likecount} key="list-vertical-like-o" />,
                <IconText icon={MessageOutlined} text={blog.b_commentcount} key="list-vertical-message" />,
              ]}
              extra={""
                // <img
                //   width={200}
                //   height={120}
                //   alt="logo"
                //   src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                // />
              }
            >
              <List.Item.Meta
                title={
                  <Link to={`/blog/detail/${blog.id}`}>{blog.b_title}</Link>
                }
                description={
                  <div>
                    <IconText icon={UserOutlined} text={blog.bu_username} key="list-vertical-star-o" /><Divider type="vertical" />
                    <IconText icon={FieldTimeOutlined} text={blog.b_createdate?blog.b_createdate.substr(0, 10):""} key="list-vertical-like-o" /><Divider type="vertical" />
                    <span>{blog.bt_name}</span>
                  </div>
                }
              />
              {/* {blog.b_brief} */}
              <p className='brief'>{blog.b_brief}</p>
            </List.Item>
          )}
        />
      }

    </div>
  )
}
