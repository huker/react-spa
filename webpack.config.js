"use strict";
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const PurifycssWebpack = require('purifycss-webpack');
const glob = require('glob');
const os = require('os');
const HappyPack = require('happypack');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
const GitRevisonPlugin = require('git-revision-webpack-plugin');
const gitRevison = new GitRevisonPlugin();
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const isDev = (process.env.ENV === 'dev');

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
        filename: "bundle.js"
    },
    devServer: {
        contentBase: path.resolve('./dist'),
        host: '0.0.0.0',
        port: 3000,
        compress: true,
        open: false,
        hot: true
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextWebpackPlugin.extract({
                    fallback: 'style-loader',
                    use: ['happypack/loader?id=happy-css']
                })
            },
            {
                test: /\.less$/,
                use: ExtractTextWebpackPlugin.extract({
                    fallback: 'style-loader',
                    use: ['happypack/loader?id=happy-less']
                })
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
        new ExtractTextWebpackPlugin({
            filename: 'css/index.css'
        }),
        // new webpack.EnvironmentPlugin(Object.keys(process.env)),
        new webpack.DefinePlugin({
            ...envObj,
            'process.VERSION': JSON.stringify(gitRevison.version()),
            'process.COMMITHASH': JSON.stringify(gitRevison.commithash()),
            'process.BRANCH': JSON.stringify(gitRevison.branch())
        }),
        new webpack.HotModuleReplacementPlugin(),
        new CleanWebpackPlugin(['./dist']),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            title: 'react spa',
            hash: true
        }),
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
        new BundleAnalyzerPlugin()
    ],
    resolve: {},
    devtool: isDev && 'cheap-module-eval-source-map',
    externals: {
        lodash: '_'
    }
};