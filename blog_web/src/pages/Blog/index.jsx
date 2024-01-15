import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Input, Pagination } from 'antd';
import { blogPageSize } from '../../utils/config';
import action from '../../redux/actions';
import BlogList from '../../components/BlogList';
import BlogType from '../../components/BlogType';
import BlogTag from '../../components/BlogTag';
import Recommend from '../../components/Recommend';
import './index.css';


const { Search } = Input;

export default function Blog() {

  const { blogTotalSize, blogTypeId } = useSelector(state => state.blog);
  const dispatch = useDispatch();

  const blogSearchOrder = "order=id desc";

  console.log('这里发丝的功夫ii阿斯房东', blogTypeId);

  useEffect(()=>{
    let getBlogListParam = `pagination=1,${blogPageSize}&${blogSearchOrder}`;
    dispatch(action.blog.getBlogList(getBlogListParam));
    return () => dispatch(action.blog.clearBlogList());
  }, [])

  // 分页回调
  const onChangBlogPage = (page) => {
    let getBlogListParam = `pagination=${page},${blogPageSize}&${blogSearchOrder}`;
    if(blogTypeId){
      getBlogListParam += `&filter=b_type=${blogTypeId}`
    }
    dispatch(action.blog.getBlogList(getBlogListParam));
  }

  // 查询文章
  const getSearchBlog = (value) => {
    dispatch(action.blog.clearBlogList());
    let getBlogListParam = `fuzzyfilter=b_title=${value}&pagination=1,${blogPageSize}&${blogSearchOrder}`;
    dispatch(action.blog.getBlogList(getBlogListParam));
  }

  return (
    <>
      <Row justify="center">
        <Col span={12}>
          <BlogList />
          {blogTotalSize !== null && blogTotalSize !== 0  &&
            <div className='blog-page'>
              <Pagination defaultCurrent={1} onChange={onChangBlogPage} pageSize={blogPageSize} total={blogTotalSize} />
            </div>
          }
        </Col>
        <Col span={4}>
          <div>
            <div className='search'>
              <Search placeholder="搜索文章" onSearch={getSearchBlog} enterButton />
            </div>
            <BlogType />
            <BlogTag />
            <Recommend />
          </div>
        </Col>
      </Row> 
    </>
  )
}
