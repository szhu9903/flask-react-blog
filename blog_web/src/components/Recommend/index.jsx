import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { List, Skeleton } from 'antd';
import actions from '../../redux/actions'
import './index.css'

export default function Recommend() {

  const { blogRecommend } = useSelector(state => state.blog)
  const dispatch = useDispatch();

  const getBlogListParam = "pagination=1,5&order=b_likecount desc";

  // 推荐文章获取点赞量最高
  useEffect(() => {
    if (blogRecommend.length === 0){
      dispatch(actions.blog.getBlogRecommend(getBlogListParam));
    }
  }, [])

  return (
    <>
      <div className='recommend'>
        <div className='recommend-title'>
          文章推荐
        </div>
        {blogRecommend.length === 0 
          ?
          <Skeleton active paragraph={false} />
          :
          <List
          itemLayout="horizontal"
          dataSource={blogRecommend}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                // avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                title={<Link to={`/blog/detail/${item.id}`}>{item.b_title}</Link>}
                description={<span className='brief'>{item.b_brief}</span>}
              />
            </List.Item>
          )}
        />
        }

      </div>
    </>
  )
}
