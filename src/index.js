import React from 'react';
import { render } from "react-dom";
import App from './router/router';
import './styles/main.less';
import store from './redux/store';
import { AppContainer } from "react-hot-loader";

const _store = store();
render(<AppContainer><App store={_store}/></AppContainer>, document.querySelector("#app"));

if (module.hot) {
    module.hot.accept()
}