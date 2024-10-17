import React from 'react'
import { Layout, BackTop } from 'antd';
import './layout.css'
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Login from '../components/Login';
import { Outlet } from 'react-router-dom';

const { Content } = Layout;

// min-height: calc(100vh - 152px);

export default function LayoutBlog() {
  return (
    <>
      <BackTop />
      <Layout>
        <Nav />
          <Content >
            <Outlet />
            <Login />
          </Content>
        <Footer />
      </Layout>
    </>
  )
}
