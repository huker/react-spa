"use strict";
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const os = require('os');
const HappyPack = require('happypack');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
const GitRevisonPlugin = require('git-revision-webpack-plugin');
const gitRevison = new GitRevisonPlugin();
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
const LodashPlugin = require('lodash-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

function createHappyPlugin(id, loaders) {
    return new HappyPack({
        id: id,
        loaders: loaders,
        threadPool: happyThreadPool
    });
}

let envObj = {};
for ( let key in process.env ) {
    envObj['process.env.' + key] = JSON.stringify(process.env[key])
}

module.exports = {
    mode: "development",
    entry: path.join(__dirname, 'src/index.js'),
    output: {
        path: path.join(__dirname, './dist'),
        filename: "[name]-[hash].js"
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'happypack/loader?id=happy-css']
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['happypack/loader?id=happy-babel-js'],
            },
            {
                test: /\.(png|jpg|gif|svg|jpeg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                        name: 'images/[hash:8].[name].[ext]'
                    }
                }]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name][hash].css',
            chunkFilename: '[name][hash].css'
        }),
        new webpack.DefinePlugin({
            ...envObj,
            'process.VERSION': JSON.stringify(gitRevison.version()),
            'process.COMMITHASH': JSON.stringify(gitRevison.commithash()),
            'process.BRANCH': JSON.stringify(gitRevison.branch())
        }),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./build/lib-manifest.json')
        }),
        new FriendlyErrorsWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            title: 'react spa',
            hash: true
        }),
        createHappyPlugin('happy-babel-js', [{
            loader: 'babel-loader',
            query: {
                cacheDirectory: true
            }
        }]),
        createHappyPlugin('happy-css', [{
            loader: 'css-loader',
            query: {
                minimize: false, // 压缩css功能在postcss中启用
                importLoaders: 1
            }
        }, {
            loader: 'postcss-loader',
            query: {
                config: {
                    path: path.join(__dirname, './postcss.config.js')
                },
            }
        }]),
        new HtmlWebpackIncludeAssetsPlugin({
            files: '*.html',
            assets: [{
                path: './',
                glob: '*.dll.js'
            }],
            append: false
        }),
        new LodashPlugin()
    ],
    resolve: {
        modules: [
            path.resolve(__dirname, 'src'),
            path.resolve(__dirname, 'node_modules'),
        ],
        alias: {
            components: path.resolve(__dirname, './src/components'),
            assets: path.resolve(__dirname, './src/assets'),
            pages: path.resolve(__dirname, './src/pages'),
            reduxAlias: path.resolve(__dirname, './src/redux')
        }
    },
    externals: {}
};