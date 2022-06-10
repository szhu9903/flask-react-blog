import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Table, Select, Input, Button, message } from 'antd';
import action from '../../redux/actions'
import { blogColumns } from './columns';
import { blogPageSize } from '../../utils/config';
import OperateBlog from './OperateBlogType';
import api from '../../api';
import './index.css'


export default function BlogType() {

  const dispatch = useDispatch();
  const { blogTypeTotalSize, blogType } = useSelector((state) => state.blog);

  useEffect(() => {
    let getBlogTypeListParam = `pagination=1,${blogPageSize}`;
    dispatch(action.blog.getBlogType(getBlogTypeListParam));
  }, [])

  // 创建分类
  const createBlog = () => {
    dispatch(action.blog.updateData({isOperateBlogType: true}));
  }

  // 修改分类
  const updateBlog = (record) => () => {
    dispatch(action.blog.updateData({blogTypeDetail: record, isOperateBlogType: true}));
  }

  // 删除分类
  const deleteBlog = (record) => async () => {
    let response = await api.blog.delBlogType({id: record.id});
    if (response.data.status === 200) {
      message.success("删除成功！")
      let pageIndex = Math.ceil((blogTypeTotalSize-1)/blogPageSize);
      let getBlogTypeListParam = `pagination=${pageIndex},${blogPageSize}`;
      dispatch(action.blog.getBlogType(getBlogTypeListParam));
    }

  }

  // 分页
  const onChangBlogPage = (pagination) => {
    let getBlogTypeListParam = `pagination=${pagination.current},${blogPageSize}`;
    dispatch(action.blog.getBlogType(getBlogTypeListParam));
  }

  // tab 分页参数
  const tabPagination = {
    pageSize: blogPageSize,
    total: blogTypeTotalSize,
  }

  return (
    <div>
      <OperateBlog />
      <div className='blog-search'>
        <Button className='create-btn' type="primary" onClick={createBlog} >新分类</Button>
      </div>
      <div className='blog-tab'>
        <Table 
          size="middle" 
          columns={blogColumns(updateBlog, deleteBlog)} 
          dataSource={blogType} 
          rowKey={blogType => blogType.id} 
          onChange={onChangBlogPage}
          pagination={tabPagination}
        />
      </div>
    </div>
  )
}
