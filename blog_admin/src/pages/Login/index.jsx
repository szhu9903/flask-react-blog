import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import api from '../../api';
import './index.css'

export default function Login() {

  const navigate = useNavigate();

  const onFinish = async (values) => {
    let loginData = {
      data: {
        user_name: values.username,
        user_pwd: values.password,
      }
    }
    let response = await api.user.blogLogin(loginData);
    if(response && response.data.status === 200){
      let { access_token, token_time, refresh_token, user_info } = response.data.data;
      localStorage.setItem('access_token', access_token);
      localStorage.setItem('token_time', token_time);
      localStorage.setItem('refresh_token', refresh_token);
      localStorage.setItem('user_info', JSON.stringify(user_info));
      navigate('/home');
    }
  };

  return (
    <div className='login'>
      <div className='login-title'>
        <h2>文章管理登录</h2>
      </div>
      <div className='login-form'>
        <Form
          name="login"
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="密码"
            />
          </Form.Item>

          <Form.Item>
            <Button htmlType="submit" className="login-form-button">
              登 录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>

  )
}
