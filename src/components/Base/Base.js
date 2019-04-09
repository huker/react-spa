/**
 * Created by huk on 2018/8/14.
 */
import React, { Component } from "react";
import { Layout, Menu, Icon } from 'antd';
import styles from "./Base.less";
const { Header, Sider, Content, Footer } = Layout;
import { connect } from "react-redux";
import { changeTab } from "../../redux/actions/tabAction";
import { push } from 'react-router-redux';

@connect(
    (state) => ({
        active: state.tab.active
    }),
    { changeTab, push }
)

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
    };

    handleClick = (item) => {
        const { key } = item;
        this.props.push(key);
        this.props.changeTab(key)
    };

    render() {
        const { active } = this.props;
        return (
            <Layout>
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={this.state.collapsed}
                >
                    <div className={styles.logo}>
                        步履不停
                    </div>
                    <Menu theme="dark" mode="inline" selectedKeys={[active]} onClick={this.handleClick}>
                        <Menu.Item key="/">
                            <Icon type="user"/>
                            <span>首页</span>
                        </Menu.Item>
                        <Menu.Item key="/about">
                            <Icon type="video-camera"/>
                            <span>关于</span>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }}>
                        <Icon
                            className={styles.trigger}
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.toggle}
                        />
                    </Header>
                    <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
                        <div style={{ background: '#fff' }}>
                            {this.props.children}
                        </div>
                    </Content>
                    <Footer>
                        <p>Version:{process.VERSION}</p>
                        <p>Commit:{process.COMMITHASH}</p>
                        <p>Branch:{process.BRANCH}</p>
                    </Footer>
                </Layout>
            </Layout>
        );
    }
}