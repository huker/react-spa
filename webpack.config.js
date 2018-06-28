const path = require('path');

/**
 * 模式
 * 入口
 * 出口
 * 开发服务器
 * 模块配置
 * 插件的配置
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
        open: true
    },
    module: {},
    plugins: [],
    resolve: {}
};