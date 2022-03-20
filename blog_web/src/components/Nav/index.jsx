import React, { useEffect, useState } from 'react'
import { Menu, Row, Col, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { Link, matchRoutes, useLocation } from 'react-router-dom'
import router from '../../router';
import action from '../../redux/actions';
import logo from '../../assets/images/logo.png'
import './index.css'



export default function Nav() {

  const [defaultSelectedKeys, setDefaultSelectedKeys] = useState([]);
  const [isInit, setIsInit] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();

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

  const setIsShowLogin = () => {
    dispatch(action.login.updateIsShowLogin({isShowLogin: true}));
  }

  if (!isInit){
    return null;
  }

  return (
    <div className="nav">
      <Row>
        <Col span={4}>
          <div className="logo" >
            <img src={logo} alt="logo"/>
          </div>
        </Col>
        <Col span={16}>
          <Menu className='menu' mode="horizontal" defaultSelectedKeys={defaultSelectedKeys}>
            <Menu.Item key="/">
              <Link to='/'> 首  页 </Link>
            </Menu.Item>
            <Menu.Item key="blog">
              <Link to='/blog'> 文 章 </Link>
            </Menu.Item>
          </Menu>
        </Col>
        <Col span={4}>
          <Button className='login' type="primary" onClick={setIsShowLogin}>登录</Button>
        </Col>
      </Row>
    </div>
  )
}
