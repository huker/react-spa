import React from 'react';
import ReactDom from 'react-dom';
import getRouter from './router/router';
import './styles/main.less';

ReactDom.render(
    getRouter(), document.querySelector('#app'));


if (module.hot) {
    module.hot.accept();
}