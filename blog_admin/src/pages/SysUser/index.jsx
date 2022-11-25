import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Table, Select, Input, Button, message } from 'antd';
import action from '../../redux/actions'
import { blogColumns } from './columns';
import { sysPageSize } from '../../utils/config';
import OperateUser from './OperateUser';
import api from '../../api';
import './index.css'


export default function SysUser() {

  const dispatch = useDispatch();
  const { blogUserList, blogUserTotalSize } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(action.sys.getSysRole());
    let getUserParam = `pagination=1,${sysPageSize}`;
    dispatch(action.user.getBlogUser(getUserParam));
  }, [])

  // 标题搜索 bu_username
  const searchUserName = (value) => {
    let getUserParam = `fuzzyfilter=bu_username=${value}&pagination=1,${sysPageSize}`;
    dispatch(action.user.getBlogUser(getUserParam));
  }

  // 创建用户
  const createUser = () => {
    dispatch(action.user.updateData({isOperateUser: true, blogUserDetail:{}}));
  }

  // 修改用户
  const updateUser = (record) => () => {
    dispatch(action.blog.updateData({isOperateUser: true, blogUserDetail: record}));
  }

  // 删除用户
  const deleteUser = (record) => async () => {
    console.log('删除用户', record);
    let response = await api.user.delBlogUser({id: record.id});
    if (response.data.status === 200) {
      message.success("删除成功！")
      let pageIndex = Math.ceil((blogUserTotalSize-1)/sysPageSize);
      let getUserParam = `pagination=${pageIndex},${sysPageSize}`;
      dispatch(action.user.getBlogUser(getUserParam));
    }

  }

  // 分页
  const onChangBlogPage = (pagination) => {
    let getUserParam = `pagination=${pagination.current},${sysPageSize}`;
    dispatch(action.user.getBlogUser(getUserParam));
  }

  // tab 分页参数
  const tabPagination = {
    pageSize:sysPageSize,
    total: blogUserTotalSize,
  }

  return (
    <div>
      <OperateUser />
      <div className='blog-search'>
        <Input.Search placeholder="标题搜索" onSearch={searchUserName} style={{ width: 230 }} enterButton allowClear />
        <Button className='create-btn' type="primary" onClick={createUser} >创建新用户</Button>
      </div>
      <div className='blog-tab'>
        <Table 
          size="middle"
          columns={blogColumns(updateUser, deleteUser)} 
          dataSource={blogUserList} 
          rowKey={user => user.id} 
          onChange={onChangBlogPage}
          pagination={tabPagination}
        />
      </div>
    </div>
  )
}
