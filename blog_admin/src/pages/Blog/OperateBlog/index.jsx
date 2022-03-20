import React, { useEffect, useState } from 'react'
import { Modal, Form, Input, Select, Button, Row, Col, message } from 'antd';
import MyMarkdown from '../../../components/MyMarkdown';
import { useSelector, useDispatch } from 'react-redux';
import { blogPageSize } from '../../../utils/config';
import action from '../../../redux/actions';
import api from '../../../api';

export default function OperateBlog(props) {

  const [blogForm] = Form.useForm();

  const dispatch = useDispatch();
  const { isOperateBlog, blogTotalSize, blogDetail, blogType } = useSelector((state) => state.blog)
  const { blogTag } = useSelector((state) => state.sys)

  useEffect(() => {
    // 修改文章，渲染文章数据到表单
    if (Object.keys(blogDetail).length !== 0){
      let formValue = {
        ...blogDetail,
        b_type: blogDetail.b_type[0].id + "",
        b_tag: blogDetail.b_tag?blogDetail.b_tag.map((tag) => tag.id + ""):[],
      }
      blogForm.setFieldsValue(formValue);
    }
  }, [blogDetail])

  // 关闭对话框
  const closeOperateBlog = () => {
    blogForm.resetFields();
    dispatch(action.blog.updateIsOperateBlog({isOperateBlog: false}));
  }

  // 提交文章
  const submitBlog = async (values) => {
    console.log("all",values);
    let blogData = {
      data:{
        ...values,
        b_tag: values.b_tag.map((tag) => ({bt_tagid: tag}))
      }
    }
    let response = {};
    if (values.id === undefined){
      response = await api.blog.addBlog(blogData);
    }else{
      response = await api.blog.modifyBlog({id: values.id}, blogData);
    }
    if (response.data.status === 200) {
      message.success("提交成功！")
      closeOperateBlog();
      let pageIndex = Math.ceil(blogTotalSize/blogPageSize)
      let getBlogListParam = `pagination=${pageIndex},${blogPageSize}`;
      dispatch(action.blog.getBlogList(getBlogListParam));
    }
    
  }

  return (
    <>
      <Modal 
        title={blogDetail.id?"修改文章":"创建文章"}
        centered
        visible={isOperateBlog}
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
          <Row gutter={20}>
            <Col span={12}>
              <Form.Item
                label="文章标题"
                name="b_title"
                rules={[{ required: true, message: 'Please input your blog title!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="文章分类"
                name="b_type"
                rules={[{ required: true, message: 'Please input your blog type!' }]}
              >
                <Select placeholder="选择文章" >
                  {blogType && 
                    blogType.map(typeItem => <Select.Option key={typeItem.id}>{typeItem.bt_name}</Select.Option>)
                  }
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label="文章标签"
            name="b_tag"
            rules={[{ required: true, message: 'Please input your blog type!' }]}
          >
            <Select mode="multiple" placeholder="选择Tag">
              {blogTag && 
                blogTag.map(tag => <Select.Option key={tag.id}>{tag.bt_tagname}</Select.Option>)
              }
            </Select>
          </Form.Item>

          <Form.Item
            label="文章描述"
            name="b_brief"
            rules={[{ required: true, message: 'Please input your blog type!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="b_content"
          >
            <MyMarkdown />
          </Form.Item>
          

          <Form.Item wrapperCol={{ offset: 21, span: 3 }}>
            <Button type="primary" htmlType="submit">
              {blogDetail.id?"修改文章":"创建文章"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
