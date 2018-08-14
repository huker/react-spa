// /**
//  * Created by huk on 2018/7/25.
//  */
//
// import React from 'react';
// import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
// import { Home, About, CodeApi } from "../pages/index";
// import { Layout, Menu, Breadcrumb } from 'antd';
// const { Header, Content, Footer } = Layout;
//
// const getRouter = () => (
//     <Router>
//         <Layout className="layout">
//             <Header>
//                 <div className="logo"/>
//                 <Menu
//                     theme="dark"
//                     mode="horizontal"
//                     defaultSelectedKeys={['1']}
//                     style={{ lineHeight: '64px' }}
//                 >
//                     <Menu.Item key="1">
//                         <Link to="/">首页</Link>
//                     </Menu.Item>
//                     <Menu.Item key="2">
//                         <Link to="/codeApi">CNode API调用</Link>
//                     </Menu.Item>
//                     <Menu.Item key="3">
//                         <Link to="/about">关于</Link>
//                     </Menu.Item>
//                 </Menu>
//             </Header>
//             <Content style={{ padding: '50px' }}>
//                 <div style={{ background: '#fff', padding: 24, minHeight: 550 }}>
//                     <Switch>
//                         <Route exact path="/" component={Home}/>
//                         <Route exact path="/codeApi" component={CodeApi}/>
//                         <Route exact path="/about" component={About}/>
//                     </Switch>
//                 </div>
//             </Content>
//             <Footer style={{ textAlign: 'center' }}>
//                 ©2018 Created by huk
//             </Footer>
//         </Layout>
//     </Router>
// );
//
// export default getRouter;


import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router';
import { createHashHistory } from 'history';
import { connect, Provider } from 'react-redux';
import { ConnectedRouter, push } from 'react-router-redux';
import { Home, About } from "../pages/index";

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const history = createHashHistory();
        return (
            <Provider {...this.props}>
                {
                    <div>
                        <ConnectedRouter history={history}>
                            <div>

                                <Switch>
                                    <Route exact path="/" component={Home}/>
                                    <Route exact path="/about" component={About}/>
                                </Switch>

                            </div>
                        </ConnectedRouter>
                    </div>
                }
            </Provider>
        )
    }
}