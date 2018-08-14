/**
 * Created by huk on 2018/8/14.
 */
import React, { Component } from "react";
import { Layout, Menu, Icon } from 'antd';
import "./Base.less";
const { Header, Sider, Content } = Layout;

export default class BaseLayout extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        collapsed: false,
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    render() {
        return (
            <Layout>
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={this.state.collapsed}
                >
                    <div className="logo">
                        logo
                    </div>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        <Menu.Item key="">
                            <Icon type="user"/>
                            <span>首页</span>
                        </Menu.Item>
                        <Menu.Item key="about">
                            <Icon type="video-camera"/>
                            <span>关于</span>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }}>
                        <Icon
                            className="trigger"
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.toggle}
                        />
                    </Header>
                    <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
                        <div style={{ background: '#fff' }}>
                            {this.props.children}
                        </div>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}