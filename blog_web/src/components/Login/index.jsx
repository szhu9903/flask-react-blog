import React, { useState } from 'react'
import { Modal, Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined, GithubOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import action from '../../redux/actions'
import './index.css'
import { useNavigate } from 'react-router-dom';


export default function Login() {

  const { isShowLogin } = useSelector(state => state.login);
  const dispatch = useDispatch();
  
  const navigate = useNavigate();
  // 关闭窗口
  const setIsShowLogin = () => {
    dispatch(action.login.updateIsShowLogin({isShowLogin: false}));
  }

  // const onFinish = (values) => {
  //   console.log('Received values of form: ', values);
  // };

  // 处理GitHub登录窗口处理结果
  const getIsLogin = (e) => {
    const {isLogin} = e.data;
    if (isLogin === 1){
      console.log("登录成功！");
      dispatch(action.login.updateIsShowLogin({isShowLogin: false}));
      navigate(0);
    }
    window.removeEventListener('message', getIsLogin);
  }

  // github验证登录
  const openOauth = () => {
    const oauthUrl = "http://127.0.0.1:8005/v2/github/login";
    window.open(oauthUrl, 'github oauth', 'height=600, width=500, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=n o, status=no');
    window.addEventListener('message', getIsLogin);
  }

  return (
    <>
      <Modal 
        title="登录" 
        centered
        visible={isShowLogin} 
        footer={null}
        onCancel={setIsShowLogin}
        width={350}
      >
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          // onFinish={onFinish}
          size="large"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码!' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
            {/* <a className="login-form-forgot" href="">
              忘记密码？
            </a> */}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              登 录
            </Button>
          </Form.Item>
          <Form.Item>
            <div className="oauth">
              <GithubOutlined style={{fontSize:30}} onClick={openOauth}/>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
