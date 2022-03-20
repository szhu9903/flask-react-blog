import React, { useState, useEffect } from 'react'
import { Layout, Menu } from 'antd';
import { Link, Outlet, matchRoutes, useLocation } from 'react-router-dom';
import { PieChartOutlined } from '@ant-design/icons';
import router from '../router';
import logo from '../assets/images/logo.png'
import './layout.css'

const { Header, Content, Footer, Sider } = Layout;
// min-height: calc(100vh - 152px);

export default function LayoutAdmin() {

  const [defaultSelectedKeys, setDefaultSelectedKeys] = useState([]);
  const [isInit, setIsInit] = useState(false);
  const location = useLocation();

  useEffect(() => {
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
            <Link to='/'>首页</Link>
          </Menu.Item>
          <Menu.Item key="blog" icon={<PieChartOutlined />}>
            <Link to='/blog'>博客管理</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content className="layout-content">
          <Outlet />
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  )
}
