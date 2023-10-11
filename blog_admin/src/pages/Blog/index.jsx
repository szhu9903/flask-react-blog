import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Table, Select, Input, Button, message } from 'antd';
import action from '../../redux/actions'
import { blogColumns } from './columns';
import { blogPageSize } from '../../utils/config';
import OperateBlog from './OperateBlog';
import api from '../../api';
import './index.css'


export default function Blog() {

  const [blogTypeParam, setBlogTypeParam] = useState(null);
  const [blogTitleParam, setBlogTitleParam] = useState(null);

  const dispatch = useDispatch();
  const { blogList, blogTotalSize, blogType } = useSelector((state) => state.blog);

  useEffect(() => {
    dispatch(action.blog.getBlogType());
    dispatch(action.sys.getBlogTag());
    let getBlogListParam = `pagination=1,${blogPageSize}`;
    dispatch(action.blog.getBlogList(getBlogListParam));
  }, [])

  // 分类所搜
  const searchTypeBlog = (value) => {
    setBlogTypeParam(value);
    let getBlogListParam = `pagination=1,${blogPageSize}`
    if (value !== undefined){
      getBlogListParam = `filter=b_type=${value}&` + getBlogListParam;
    }
    if(blogTitleParam){
      getBlogListParam = `fuzzyfilter=b_title=${blogTitleParam}&` + getBlogListParam;
    }
    dispatch(action.blog.getBlogList(getBlogListParam));
  }

  // 标题搜索
  const searchTitleBlog = (value) => {
    setBlogTitleParam(value);
    let getBlogListParam = `fuzzyfilter=b_title=${value}&pagination=1,${blogPageSize}`;
    if(blogTypeParam){
      getBlogListParam = `filter=b_type=${blogTypeParam}&` + getBlogListParam;
    }
    dispatch(action.blog.getBlogList(getBlogListParam));
  }

  // 创建文章
  const createBlog = () => {
    dispatch(action.blog.updateIsOperateBlog({isOperateBlog: true}));
  }

  // 修改文章
  const updateBlog = (record) => () => {
    dispatch(action.blog.getBlogDetail(record)); // 获取文章内容
    dispatch(action.blog.updateIsOperateBlog({isOperateBlog: true}));
  }

  // 删除文章
  const deleteBlog = (record) => async () => {
    console.log('删除文章', record);
    let response = await api.blog.delBlog({id: record.id});
    if (response.data.status === 200) {
      message.success("删除成功！")
      let pageIndex = Math.ceil((blogTotalSize-1)/blogPageSize);
      let getBlogListParam = `pagination=${pageIndex},${blogPageSize}`;
      dispatch(action.blog.getBlogList(getBlogListParam));
    }

  }

  // 分页
  const onChangBlogPage = (pagination) => {
    let getBlogListParam = `pagination=${pagination.current},${blogPageSize}`;
    if(blogTypeParam){
      getBlogListParam = `filter=b_type=${blogTypeParam}&` + getBlogListParam;
    }
    if(blogTitleParam){
      getBlogListParam = `fuzzyfilter=b_title=${blogTitleParam}&` + getBlogListParam;
    }
    dispatch(action.blog.getBlogList(getBlogListParam));
  }

  // tab 分页参数
  const tabPagination = {
    pageSize:blogPageSize,
    total: blogTotalSize,
  }

  return (
    <div>
      <OperateBlog />
      <div className='blog-search'>
        <Select className='search-type' placeholder="文章分类搜索" onChange={searchTypeBlog} onClear={() => setBlogTypeParam(null)} style={{ width: 200 }} allowClear>
          {blogType && 
            blogType.map(typeItem => <Select.Option key={typeItem.id}>{typeItem.bt_name}</Select.Option>)
          }
        </Select>
        <Input.Search placeholder="标题搜索" onSearch={searchTitleBlog} style={{ width: 230 }} enterButton allowClear />
        <Button className='create-btn' type="primary" onClick={createBlog} >新文章</Button>
      </div>
      <div className='blog-tab'>
        <Table 
          size="middle" 
          columns={blogColumns(updateBlog, deleteBlog)} 
          dataSource={blogList} 
          rowKey={blog => blog.id} 
          onChange={onChangBlogPage}
          pagination={tabPagination}
        />
      </div>
    </div>
  )
}
