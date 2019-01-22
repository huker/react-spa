"use strict";
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const PurifycssWebpack = require('purifycss-webpack');
const glob = require('glob');
const os = require('os');
const HappyPack = require('happypack');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
const GitRevisonPlugin = require('git-revision-webpack-plugin');
const gitRevison = new GitRevisonPlugin();
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
const { SkeletonPlugin } = require('page-skeleton-webpack-plugin');

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

// module.exports = smp.wrap({
module.exports = {
    mode: "development",
    entry: path.join(__dirname, 'src/index.js'),
    output: {
        path: path.join(__dirname, './dist'),
        filename: "[name].js"
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', MiniCssExtractPlugin.loader, 'happypack/loader?id=happy-css']
            },
            {
                test: /\.less$/,
                use: ['style-loader', MiniCssExtractPlugin.loader, 'happypack/loader?id=happy-less']
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
            filename: 'css/[name].css',
            chunkFilename: '[name].css'
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
        new HtmlWebpackPlugin({
            template: './src/index.html',
            title: 'react spa',
            hash: true
        }),
        // new SkeletonPlugin({
        //     pathname: path.resolve(__dirname, './shell'), // 用来存储 shell 文件的地址
        //     staticDir: path.resolve(__dirname, './dist'), // 最好和 `output.path` 相同
        //     routes: ['/'], // 将需要生成骨架屏的路由添加到数组中
        // }),
        // new PurifycssWebpack({
        //     paths: glob.sync(path.resolve('src/*.html'))
        // })，
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
        createHappyPlugin('happy-less', [{
            loader: 'css-loader',
            query: {
                minimize: false,
                importLoaders: 2
            }
        }, {
            loader: 'postcss-loader',
            query: {
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
        }]),
        new HtmlWebpackIncludeAssetsPlugin({
            files: '*.html',
            assets: [{
                path: './',
                glob: '*.dll.js'
            }],
            append: false
        })
    ],
    resolve: {},
    externals: {}
};