import React, { useEffect, useState } from 'react'
import { Row, Col } from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import action from '../../redux/actions'
import BlogList from '../../components/BlogList'
import UserCar from '../../components/UserCar';
import BlogTag from '../../components/BlogTag';
import Recommend from '../../components/Recommend';
import './index.css'

let getBlogListParam = "pagination=1,10&order=b_views desc";

export default function Home() {

  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(action.blog.getBlogList(getBlogListParam));
    return () => dispatch(action.blog.clearBlogList());
  }, [])

  return (
    <>
      <Row justify="center">
        <Col span={12}>
          <BlogList />
        </Col>
        <Col span={4}>
          <div className='sidebar'>
            <UserCar />
            <BlogTag />
            <Recommend />
          </div>
        </Col>
      </Row> 
    </>
  )
}
