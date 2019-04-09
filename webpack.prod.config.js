"use strict";
const merge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');
const baseConfig = require('./webpack.common.config');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


module.exports = merge(baseConfig, {
    mode: "production",
    devtool: false,
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [MiniCssExtractPlugin.loader, {
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
            }
        ]
    },
    // optimization: {
    //     splitChunks: {
    //         chunks: 'all',
    //         minChunks: 1,
    //         maxAsyncRequests: 5,
    //         maxInitialRequests: 3,
    //         automaticNameDelimiter: '~',
    //         name: true,
    //         cacheGroups: {
    //             vendors: {
    //                 test: /[\\/]node_modules[\\/]/,
    //                 priority: -10
    //             },
    //             default: {
    //                 minChunks: 2,
    //                 priority: -20,
    //                 reuseExistingChunk: true
    //             }
    //         }
    //     }
    // },
    plugins: [
        // new BundleAnalyzerPlugin(),
    ]
});