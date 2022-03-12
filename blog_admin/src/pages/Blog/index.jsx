import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Table } from 'antd';
import action from '../../redux/actions'
import { blogColumns } from './columns';

export default function Blog() {

  const dispatch = useDispatch();
  const { blogList, blogTotalSize } = useSelector((state) => state.blog);
  console.log(blogList);

  useEffect(() => {
    dispatch(action.blog.getBlogList());
  }, [])
  
  return (
    <div className='blog-tab'>
      <Table size="small" columns={blogColumns} dataSource={blogList} rowKey={blog => blog.id} />
    </div>
  )
}
