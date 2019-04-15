/**
 * Created by huk on 2018/12/18.
 */

'use strict';

const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');

//TODO antd单独提取用到的组件放进lib

const lib = [
    'react',
    'react-dom',
    'react-router',
    'react-router-dom',
    'redux',
    'react-redux',
    'react-router-redux',
    'redux-localstorage',
    'redux-thunk',
    'history',
    'axios',
    'qs'
];

module.exports = {
    mode: 'production',
    entry: {
        lib: lib
    },
    output: {
        filename: '[name]_[hash].dll.js',
        library: '[name]_[hash]',
        path: path.join(__dirname, './dist')
    },
    plugins: [
        new CleanWebpackPlugin(['./dist']),
        new webpack.DllPlugin({
            context: __dirname,
            path: path.join(__dirname, './build/[name]-manifest.json'),
            name: '[name]_[hash]'
        })
    ]
};