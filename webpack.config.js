const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const PurifycssWebpack = require('purifycss-webpack');
const glob = require('glob');

/**
 * 模式
 * 入口
 * 出口
 * 开发服务器 webpack-dev-server
 * 模块配置
 *     1.style-loader 编译好的css模块插到style中
 *     2.css-loader 打包css模块
 *     3.less less-loader 要使用less就带上less-loader 同理sass和stylus等
 *     rules是个数组，配置所有的规则。use是从右往左写，先css-loader打好，在style-loader塞进去
 *     4.babel 安装 babel-core babel-loader babel-preset-env babel-preset-react
 *     5.postcss-loader要在css-loader之前做 配置了postcss.config.js 自动加前缀（预处理器）
 * 插件的配置
 *     1.HtmlWebpackPlugin 将html打包到dist下可以自动引入打包的js,可以压缩、配置标题、添加hash等（不会缓存）
 *     2.CleanWebpackPlugin 清除打包的文件
 *     3.ExtractTextWebpackPlugin 讲css编译成一个文件来引入（style-loader是插入到style标签中），在生产的时候用，因为这样的话就没有hot更新了
 *     加上fallback是当ExtractTextWebpackPlugin disable的时候就会用
 *     4.PurifycssWebpack 没用的css可以不打包进去
 * 配置解析
 */

module.exports = {
    mode: 'development',
    entry: path.join(__dirname, 'src/index.js'),
    output: {
        path: path.join(__dirname, './dist'),
        filename: "bundle.js"
    },
    devServer: {
        contentBase: path.resolve('./dist'),
        host: 'localhost',
        port: 3000,
        compress: true,
        open: true,
        hot: true
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextWebpackPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        { loader: "css-loader" },
                        { loader: "postcss-loader" }
                    ]
                })
            },
            {
                test: /\.less$/,
                use: ExtractTextWebpackPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        { loader: "css-loader" },
                        { loader: "postcss-loader" },
                        { loader: "less-loader" },
                    ]
                })
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            }
        ]
    },
    plugins: [
        new ExtractTextWebpackPlugin({
            filename: 'css/index.css'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new CleanWebpackPlugin(['./dist']),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            title: 'react spa',
            hash: true
        }),
        new PurifycssWebpack({
            paths: glob.sync(path.resolve('src/*.html'))
        })
    ],
    resolve: {}
};