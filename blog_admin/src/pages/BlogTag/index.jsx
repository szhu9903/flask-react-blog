import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Table, Select, Input, Button, message } from 'antd';
import action from '../../redux/actions'
import { blogTagColumns } from './columns';
import { blogPageSize } from '../../utils/config';
import OperateBlog from './OperateBlogTag';
import api from '../../api';
import './index.css'


export default function BlogTag() {

  const dispatch = useDispatch();
  const { blogTagTotalSize, blogTag } = useSelector((state) => state.sys);

  useEffect(() => {
    let getBlogTagListParam = `pagination=1,${blogPageSize}`;
    dispatch(action.sys.getBlogTag(getBlogTagListParam));
  }, [])

  // 创建标签
  const createBlogTag = () => {
    dispatch(action.sys.updateData({isOperateBlogTag: true}));
  }

  // 修改标签
  const updateBlogTag = (record) => () => {
    dispatch(action.sys.updateData({blogTagDetail: record, isOperateBlogTag: true}));
  }

  // 删除标签
  const deleteBlogTag = (record) => async () => {
    let response = await api.sys.delBlogTag({id: record.id});
    if (response.data.status === 200) {
      message.success("删除成功！")
      let pageIndex = Math.ceil((blogTagTotalSize-1)/blogPageSize);
      let getBlogTagListParam = `pagination=${pageIndex},${blogPageSize}`;
      dispatch(action.sys.getBlogTag(getBlogTagListParam));
    }

  }

  // 分页
  const onChangBlogTagPage = (pagination) => {
    let getBlogTagListParam = `pagination=${pagination.current},${blogPageSize}`;
    dispatch(action.sys.getBlogTag(getBlogTagListParam));
  }

  // tab 分页参数
  const tabPagination = {
    pageSize: blogPageSize,
    total: blogTagTotalSize,
  }

  return (
    <div>
      <OperateBlog />
      <div className='blog-search'>
        <Button className='create-btn' type="primary" onClick={createBlogTag} >新标签</Button>
      </div>
      <div className='blog-tab'>
        <Table 
          size="middle" 
          columns={blogTagColumns(updateBlogTag, deleteBlogTag)} 
          dataSource={blogTag} 
          rowKey={blogTag => blogTag.id} 
          onChange={onChangBlogTagPage}
          pagination={tabPagination}
        />
      </div>
    </div>
  )
}
