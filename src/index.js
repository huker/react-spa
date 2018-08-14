import React from 'react';
import { render } from "react-dom";
import App from './router/router';
import './styles/main.less';
import store from './redux/store';

const _store = store();
render(<App store={_store}/>, document.querySelector("#app"));
