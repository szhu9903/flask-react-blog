import React, { useEffect, useState } from 'react'
import { Modal, Form, Input, Select, Button, Row, Col, message } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { blogPageSize } from '../../../utils/config';
import action from '../../../redux/actions';
import api from '../../../api';

export default function OperateBlogTag(props) {

  const [blogTagForm] = Form.useForm();

  const dispatch = useDispatch();
  const { isOperateBlogTag, blogTagTotalSize, blogTagDetail } = useSelector((state) => state.sys)

  useEffect(() => {
    // 修改文章，渲染文章数据到表单
    if (Object.keys(blogTagDetail).length !== 0){
      blogTagForm.setFieldsValue(blogTagDetail);
    }
  }, [blogTagDetail])

  // 关闭对话框
  const closeOperateBlogTag = () => {
    blogTagForm.resetFields();
    dispatch(action.sys.updateData({isOperateBlogTag: false, blogTagDetail:{}}));
  }

  // 提交文章
  const submitBlog = async (values) => {
    let blogTagData = {
      data:{
        ...values,
      }
    }
    let response = {};
    if (values.id === undefined){
      response = await api.sys.addBlogTag(blogTagData);
    }else{
      response = await api.sys.modifyBlogTag({id: values.id}, blogTagData);
    }
    if (response.data.status === 200) {
      message.success("提交成功！")
      closeOperateBlogTag();
      let pageIndex = Math.ceil(blogTagTotalSize/blogPageSize)
      let getBlogTagListParam = `pagination=${pageIndex},${blogPageSize}`;
      dispatch(action.sys.getBlogTag(getBlogTagListParam));
    }
    
  }

  return (
    <>
      <Modal 
        title={blogTagDetail.id?"修改标签":"新增标签"}
        centered
        visible={isOperateBlogTag}
        onCancel={closeOperateBlogTag}
        footer={null}
        width={900}
      >
        {/* <div style={{ height: '60vh', overflowY: 'auto' }}>
        </div> */}
        <Form
          form={blogTagForm}
          name="basic"
          // initialValues={blogDetail}
          onFinish={submitBlog}
          autoComplete="off"
        >
          <Form.Item name="id" hidden={true}><Input /></Form.Item>
          <Form.Item
            label="标签名称"
            name="bt_tagname"
            rules={[{ required: true, message: 'Please input your blog type!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 21, span: 3 }}>
            <Button type="primary" htmlType="submit">
              {blogTagDetail.id?"修改标签":"新增标签"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
