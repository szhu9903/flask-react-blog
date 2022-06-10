import React, { useEffect, useState } from 'react'
import { Modal, Form, Input, Select, Button, Row, Col, message } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { blogPageSize } from '../../../utils/config';
import action from '../../../redux/actions';
import api from '../../../api';

export default function OperateBlogType(props) {

  const [blogForm] = Form.useForm();

  const dispatch = useDispatch();
  const { isOperateBlogType, blogTypeTotalSize, blogTypeDetail } = useSelector((state) => state.blog)

  useEffect(() => {
    // 修改文章，渲染文章数据到表单
    if (Object.keys(blogTypeDetail).length !== 0){
      blogForm.setFieldsValue(blogTypeDetail);
    }
  }, [blogTypeDetail])

  // 关闭对话框
  const closeOperateBlog = () => {
    blogForm.resetFields();
    dispatch(action.blog.updateData({isOperateBlogType: false, blogTypeDetail:{}}));
  }

  // 提交文章
  const submitBlog = async (values) => {
    let blogTypeData = {
      data:{
        ...values,
      }
    }
    let response = {};
    if (values.id === undefined){
      response = await api.blog.addBlogType(blogTypeData);
    }else{
      response = await api.blog.modifyBlogType({id: values.id}, blogTypeData);
    }
    if (response.data.status === 200) {
      message.success("提交成功！")
      closeOperateBlog();
      let pageIndex = Math.ceil(blogTypeTotalSize/blogPageSize)
      let getBlogTypeListParam = `pagination=${pageIndex},${blogPageSize}`;
      dispatch(action.blog.getBlogType(getBlogTypeListParam));
    }
    
  }

  return (
    <>
      <Modal 
        title={blogTypeDetail.id?"修改分类":"新增分类"}
        centered
        visible={isOperateBlogType}
        onCancel={closeOperateBlog}
        footer={null}
        width={900}
      >
        {/* <div style={{ height: '60vh', overflowY: 'auto' }}>
        </div> */}
        <Form
          form={blogForm}
          name="basic"
          // initialValues={blogDetail}
          onFinish={submitBlog}
          autoComplete="off"
        >
          <Form.Item name="id" hidden={true}><Input /></Form.Item>
          <Form.Item
            label="分类名称"
            name="bt_name"
            rules={[{ required: true, message: 'Please input your blog type!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 21, span: 3 }}>
            <Button type="primary" htmlType="submit">
              {blogTypeDetail.id?"修改分类":"新增分类"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
