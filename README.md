## react项目搭建实践

![react](https://img.shields.io/badge/react-16-brightgreen.svg?style=plastic)![webpack](https://img.shields.io/badge/webpack-4-blue.svg?style=plastic)![redux](https://img.shields.io/badge/redux-red.svg?style=plastic)![antd](https://img.shields.io/badge/antd-yellow.svg?style=plastic)


### webpack配置

#### 1. entry/output

单页面单入口，输出filename的hash可以选择 *hash*、*contenthash*、*chunkhash* 三种

```javascript
entry: path.join(__dirname, 'src/index.js'),
output: {
        path: path.join(__dirname, './dist'),
        filename: "[name]-[hash].js"
}
```

#### 2. loader

**css相关**

css和less、sass分成两个rule来处理，less要用less-loader来解析，use里的loader是从右往左写的（从下往上）

style-loader 编译好的css模块插到style中

css-loader 打包css模块

比如处理css的话，就先postcss-loader然后css-loader，use里就要先写css-loader然后写postcss-loader

**js - babel**

*记得exclude:node_modules 依赖不需要去编译它

使用babel-loader解析es6语法，可以在项目根目录下创建.babelrc文件配置babel（配置可以有几种形式，文档https://www.babeljs.cn/docs/configuration）

presets是预设，`babel-preset-env` 可以根据配置的目标浏览器或者运行环境来自动将ES2015+的代码转换为es5，现在已经不使用以前的stage012啥啥的了。

plugins是使用的各种插件，需要用什么就装什么，要用到装饰器，就安装@babel/plugin-proposal-decorators，使用高级语法、新的API等就安装@babel/plugin-transform-runtime（使用这个插件即可达到runtime+polyfill的效果）

```json
{
  "presets": [
    "@babel/preset-env",
    "@babel/preset-react"
  ],
  "plugins": [
    ["@babel/plugin-proposal-decorators",{"legacy": true}],
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-transform-runtime"
  ]
}
```

**图片 - url-loader**

#### 3. 基本插件 - html、css

1.HtmlWebpackPlugin 将html打包到dist下可以自动引入打包的js,可以压缩、配置标题

2.使用MiniCssExtractPlugin了 抽离css

3.CleanWebpackPlugin 删除文件插件，可以把之前打包的dist内容删除

#### 4. 优化
1.HappyPack
发挥多核CPU的能力 多进程打包 js、css文件

2.DllPlugin+DllReferencePlugin
分离稳定的第三方包，避免重复构建，加快了构建速度

3.css模块化
写了篇记录 https://www.jianshu.com/p/8fdb241b3fa6

4.lodash按需引入
lodash-webpack-plugin + babel-plugin-lodash
main.js从 255k -> 187k

5.使用TerserPlugin进行js压缩
原本使用的压缩插件uglifyjs不支持es6，官方在v4.26.0以后生产默认使用了TerserPlugin做js压缩，所以webpack版本高的就不用自己手动加了，可以开启多进程压缩和缓存。

6.热更新
webpack-dev-server在3.2.0以后配置hot时自动加入hmr 不用手动加入HotModuleReplacementPlugin
所以只要

```javascript
devServer:{
    ...,
    hot:true //只要配置这个就ok了
}
```
保持state状态和局部更新使用react-hot-loader实现
v4的使用是在babel中添加"react-hot-loader/babel"，然后在要更新的部分外面用hot包起来

#### 工具
1.git-revision-webpack-plugin
获取当前git信息

2.webpack-bundle-analyzer (优化阶段使用)
分析插件，便于找到需要优化的部分

3.speed-measure-webpack-plugin (优化阶段使用)
打包完会分析出每个步骤花的时间

4.friendly-errors-webpack-plugin
让错误提示变得友好


#### 一些尝试
> 没有加入进去 需要进一步调研下

- page-skeleton-webpack-plugin 骨架屏
  还在尝试中 之前试了下启动会有问题，需要手动下chrome内核，而且不支持hash路由？
  
- PurifycssWebpack
  没用的css可以不打包进去
  
- ignorePlugin 
  
  可以忽略一些模块不打包


