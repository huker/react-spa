import { hot } from 'react-hot-loader/root'
import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import { createHashHistory } from 'history';
import { connect, Provider } from 'react-redux';
import { ConnectedRouter, push } from 'react-router-redux';
import Home  from "pages/Home/Home";
import About  from "pages/About/About";

class App extends Component {

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

export default hot(App)