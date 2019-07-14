/* jshint esversion: 6  */

/* #along特别注意：修改 webpack.config.js 文件后，一定要重启 webpack */

// 由于 webpack 是基于 Node 进行构建的，所以，webpack 的配置文件中，任何合法的 Node 代码都是支持的
const path = require('path');
// 在内存中，根据指定的模板页面，生成一份内存中的首页，同时自动把打包好的 bundle 注入到页面底部
// 如果要陪值插件，需要在导出的对象中，挂载一个 plugins 节点
const htmlWebpackPlugin = require('html-webpack-plugin');

const vueLoaderPlugin = require('vue-loader/lib/plugin');

// 当以命令行形式运行 webpack 或 webpack-dev-server 的时候，工具会发现，我们并没有提供要打包的文件的入口和出口文件，此时，它会检查项目根目录中的配置文件，并读取这个文件，就拿到了导出的这个 配置对象，然后根据这个对象进行打包构建
module.exports = {
  entry: path.join(__dirname, './src/main.js'), // 入口文件
  output: { // 指定输出选项
    path: path.join(__dirname, './dist'),  // 输出路径
    filename: 'bundle.js' // 指定输出文件的名称
  },
  plugins: [ // 所有 webpack 插件的配置节点
    new htmlWebpackPlugin({
      template: path.join(__dirname, './src/index.html'), // 指定模板文件路径
      filename: 'index.html'  // 设置生成的内存页面的名称
    }),
    new vueLoaderPlugin()
  ],
  module: { // 配置所有第三方 loader 模块的
    rules: [ // 第三方模块的匹配规则
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },
      { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] }, // 处理scss 的配置
      { test: /\.(jpg|png|gif|bmp|jpeg)$/, use: 'url-loader?limit=34270&name=[hash:8]-[name].[ext]' }, // 处理图片 url 的配置
      // limit 给定的值是图片的大小，单位是 byte，如果我们引用的图片 大于 给定的 limit 值，则不会被转为 base64 格式的字符串，如果图片 小于或等于 给定的 limit 的值，则会被转为 base64 的字符串
      { test: /\.(ttf|eot|svg|woff|woff2)$/, use: 'url-loader' }, // 处理字体文件的 loader
      { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ },  // 配置 babel 来转换高级的 ES 语法
      { test: /\.vue$/, use: 'vue-loader' }  // 处理 .vue 文件的第三方 loader
    ]
  },
  resolve: {
    alias: { // 修改 Vue 被导入时候的包的路径
      // 'vue$': 'vue/dist/vue.js'
    }
  }
};