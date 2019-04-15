## react项目搭建实践

- react16
- webpack4
- redux
- redux-thunk
- axios
- ant design
- less


### webpack配置

#### 基础配置
开发服务器 webpack-dev-server

模块：
1.style-loader 编译好的css模块插到style中
2.css-loader 打包css模块
3.less less-loader 要使用less就带上less-loader 同理sass和stylus等 rules是个数组，配置所有的规则。use是从右往左写，先css-loader打好，在style-loader塞进去
4.babel 安装 babel-core babel-loader babel-preset-env babel-preset-react
5.postcss-loader要在css-loader之前做 配置了postcss.config.js 自动加前缀（预处理器）

插件：
1.HtmlWebpackPlugin 将html打包到dist下可以自动引入打包的js,可以压缩、配置标题、添加hash等（不会缓存）
2.CleanWebpackPlugin 清除打包的文件
~~3.ExtractTextWebpackPlugin 讲css编译成一个文件来引入（style-loader是插入到style标签中），在生产的时候用，因为这样的话就没有hot更新了加上fallback是当ExtractTextWebpackPlugin disable的时候就会用~~
3.使用MiniCssExtractPlugin了 抽离css

#### 优化
1.happyPack
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


