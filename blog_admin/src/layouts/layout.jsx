import React, { useState, useEffect } from 'react'
import { Layout, Menu, Dropdown, Avatar } from 'antd';
import { Link, Outlet, matchRoutes, useLocation, useNavigate } from 'react-router-dom';
import { PieChartOutlined } from '@ant-design/icons';
import { getUserInfo } from '../utils/user';
import router from '../router';
import logo from '../assets/images/logo.png'
import './layout.css'

const { Header, Content, Footer, Sider } = Layout;
// min-height: calc(100vh - 152px);

export default function LayoutAdmin() {

  const [defaultSelectedKeys, setDefaultSelectedKeys] = useState([]);
  const [isInit, setIsInit] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const userInfo = getUserInfo();
  console.log(userInfo);

  useEffect(() => {
    if (userInfo.id === null){
      navigate('/login');
    }
    const routes = matchRoutes(router, location.pathname)
    if (routes !== null){
      for (let route of routes){
        let path = route.route.path;
        if (path){
          setDefaultSelectedKeys([path]);
        }
      }
    }
    setIsInit(true);
  }, [location.pathname])

  const clearLocalUser = () => () =>{
    localStorage.clear();
    navigate(0);
  }

  const downMenu = (
    <Menu>
      <Menu.Item key="0">
        <a onClick={clearLocalUser()}>
          退出登录
        </a>
      </Menu.Item>
    </Menu>
  );

  if (!isInit){
    return null;
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider>
        <div className="logo">
          <img src={logo} alt="logo"/>
        </div>
        <Menu theme="dark" defaultSelectedKeys={defaultSelectedKeys} mode="inline">
          <Menu.Item key="/" icon={<PieChartOutlined />}>
            <Link to='/home'>首页</Link>
          </Menu.Item>
          <Menu.Item key="blog" icon={<PieChartOutlined />}>
            <Link to='/blog'>博客管理</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background">
          <Dropdown overlay={downMenu}  trigger={['click']} placement="bottom"  arrow={{ pointAtCenter: true }} >
            <a>
              <Avatar src={userInfo.bu_userphoto} /> {userInfo.bu_username}
            </a>
          </Dropdown>
        </Header>
        <Content className="layout-content">
          <Outlet />
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  )
}
