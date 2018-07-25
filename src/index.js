import './styles/main.less';
import React from 'react';
import ReactDom from 'react-dom';
import getRouter from './router/router';

ReactDom.render(
    getRouter(), document.getElementById('app'));


if (module.hot) {
    module.hot.accept();
}