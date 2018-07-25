/**
 * Created by huk on 2018/7/25.
 */

import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { Home, About } from "../pages/index";

const getRouter = () => (
    <Router>
        <div>
            <ul>
                <li><Link to="/">首页</Link></li>
                <li><Link to="/about">关于</Link></li>
            </ul>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/about" component={About}/>
            </Switch>
        </div>
    </Router>
);

export default getRouter;