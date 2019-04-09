"use strict";
const merge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');
const baseConfig = require('./webpack.common.config');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
//监测打包进度
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasurePlugin();

module.exports = merge(baseConfig, {
    mode: "development",
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        contentBase: path.resolve('./dist'),
        host: '0.0.0.0',
        port: 3000,
        compress: true,
        open: true,
        hot: true
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                exclude: /node_modules/,
                use: ['style-loader', {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 2,
                        localIdentName: '[name]--[local]--[hash:base64:5]',
                        modules: 'global'
                    }
                }, {
                    loader: 'postcss-loader',
                    options: {
                        config: {
                            path: path.join(__dirname, './postcss.config.js')
                        },
                    }
                }, {
                    loader: 'less-loader',
                    options: {
                        sourceMap: true,
                        javascriptEnabled: true,
                        modifyVars: {
                            'primary-color': '#00a6f4'
                        }
                    }
                }]
            },
            {
                test: /\.less$/,
                include: /node_modules/,
                use: ['style-loader', {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 3
                    }
                }, {
                    loader: 'postcss-loader',
                    options: {
                        config: {
                            path: path.join(__dirname, './postcss.config.js')
                        },
                    }
                }, {
                    loader: 'less-loader',
                    options: {
                        sourceMap: true,
                        javascriptEnabled: true,
                        modifyVars: {
                            'primary-color': '#00a6f4'
                        }
                    }
                }]
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        // new BundleAnalyzerPlugin(),
    ]
});