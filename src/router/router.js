/**
 * Created by huk on 2018/7/25.
 */

import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { Home, About } from "../pages/index";
import { Layout, Menu, Breadcrumb } from 'antd';
const { Header, Content, Footer } = Layout;

const getRouter = () => (
    <Router>
        <Layout className="layout">
            <Header>
                <div className="logo"/>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['1']}
                    style={{ lineHeight: '64px' }}
                >
                    <Menu.Item key="1">
                        <Link to="/">首页</Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Link to="/about">关于</Link>
                    </Menu.Item>
                </Menu>
            </Header>
            <Content style={{ padding: '50px' }}>
                <div style={{ background: '#fff', padding: 24, minHeight: 550 }}>
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route exact path="/about" component={About}/>
                    </Switch>
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
                ©2018 Created by huk
            </Footer>
        </Layout>
    </Router>
);

export default getRouter;