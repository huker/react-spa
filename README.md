## react项目搭建实践

![react](https://img.shields.io/badge/react-16-brightgreen.svg?style=plastic)![webpack](https://img.shields.io/badge/webpack-4-blue.svg?style=plastic)![redux](https://img.shields.io/badge/redux-red.svg?style=plastic)![antd](https://img.shields.io/badge/antd-yellow.svg?style=plastic)


### webpack配置

#### 基础配置
#### 1.entry

单页面单入口

```javascript
entry: path.join(__dirname, 'src/index.js')
```

#### 2.output

```javascript
output: {
        path: path.join(__dirname, './dist'),
        filename: "[name].js"
}
```

#### 3.module

css/less:

css和less分成两个test，less要用less-loader来解析。

style-loader 编译好的css模块插到style中，css-loader 打包css模块，use是从右往左写的，比是处理css的话，就先postcss-loader然后css-loader，use里就要先写css-loader然后写postcss-loader

js:

解析高级语法，使用babel-loader。在项目根目录下创建.babelrc文件，写babel的配置。

presets是预设，`babel-preset-env` 可以根据配置的目标浏览器或者运行环境来自动将ES2015+的代码转换为es5。现在已经不使用以前的stage之类的了。

plugins是使用的插件，需要用什么就装什么，要用到装饰器，就安装@babel/plugin-proposal-decorators，使用更高级语法就安装@babel/plugin-transform-runtime等等

```json
{
  "presets": [
    "@babel/preset-env",
    "@babel/preset-react"
  ],
  "plugins": [
    "react-hot-loader/babel",
    "lodash",
    [
      "@babel/plugin-proposal-decorators",
      {
        "legacy": true
      }
    ],
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-transform-runtime",
    [
      "import",
      {
        "style": true,
        "libraryName": "antd"
      }
    ]
  ]
}
```

#### 4.plugins

1.HtmlWebpackPlugin 将html打包到dist下可以自动引入打包的js,可以压缩、配置标题、添加hash等（不会缓存）
2.CleanWebpackPlugin 清除打包的文件
~~3.ExtractTextWebpackPlugin 讲css编译成一个文件来引入（style-loader是插入到style标签中），在生产的时候用，因为这样的话就没有hot更新了加上fallback是当ExtractTextWebpackPlugin disable的时候就会用~~
3.使用MiniCssExtractPlugin了 抽离css

#### 优化
1.HappyPack
发挥多核CPU的能力 多进程打包 js、css文件

2.DllPlugin+DllReferencePlugin
分离稳定的第三方包，避免重复构建，加快了构建速度

3.css模块化
写了篇记录 https://www.jianshu.com/p/8fdb241b3fa6

4.lodash按需引入
lodash-webpack-plugin + babel-plugin-lodash
main.js从 255k -> 187k

#### 工具
1.git-revision-webpack-plugin
获取当前git信息

2.webpack-bundle-analyzer (优化阶段使用)
分析插件，便于找到需要优化的部分

3.speed-measure-webpack-plugin (优化阶段使用)
打包完会分析出每个步骤花的时间


#### 一些尝试
> 没有加入进去 需要进一步调研下

- page-skeleton-webpack-plugin 骨架屏
  还在尝试中 之前试了下启动会有问题，需要手动下chrome内核，而且不支持hash路由？
- PurifycssWebpack
  没用的css可以不打包进去


