## react项目基础搭建

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
3.ExtractTextWebpackPlugin 讲css编译成一个文件来引入（style-loader是插入到style标签中），在生产的时候用，因为这样的话就没有hot更新了加上fallback是当ExtractTextWebpackPlugin disable的时候就会用
4.PurifycssWebpack 没用的css可以不打包进去

#### 优化
1.happyPack
发挥多核CPU的能力 多进程打包 js、css文件

效果：
以上基础配置时 RUN Time: 32341ms
加入happyPack(多进程取cpu最大 我电脑是4) Time: 14048ms

#### 工具类
1.git-revision-webpack-plugin
获取当前git信息

