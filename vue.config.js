const CompressionPlugin = require('compression-webpack-plugin');
const BrotliPlugin = require('brotli-webpack-plugin');
module.exports = {
  // 在vue配置中，去除并限制改写publicPath，而改用baseUrl
  // baseUrl可以设置成相对路径，默认为/
  // 也可以设置成cdn/oss的URI链接，但是必须以协议开头即http://或者https://
  // baseUrl:
  //   process.env.NODE_ENV === 'production' ? 'https://cdn.domain.com/' : '/',
  outputDir: `dist/${process.env.OUTPUT_DIR}`,
  // 取消生产环境的sourceMap
  productionSourceMap: false,
  devServer: {
    open: true,
    proxy: process.env.VUE_APP_HTTP
  },
  chainWebpack: config => {
    config.plugins.delete('prefetch');
  },
  configureWebpack: config => {
    // 去除打包单包过大的提示
    config.performance = {
      hints: false
    };
    // 添加外部引用，如去掉当前外部引用配置，需手动删除`public/index.html`的脚本引入，同时需要手动安装依赖
    config.externals = {
      vue: 'Vue',
      'vue-router': 'VueRouter',
      axios: 'axios',
      vuex: 'Vuex',
      'element-ui': 'Element'
    };
    // 只在打包的时候启用gz和br插件
    if (process.env.NODE_ENV === 'production') {
      config.plugins.push(
        ...[
          new CompressionPlugin({
            test: /\.(js|css|html)$/,
            threshold: 10240,
            deleteOriginalAssets: false,
            minRatio: 0.6
          }),
          new BrotliPlugin({
            test: /\.(js|css|html)$/,
            threshold: 10240,
            deleteOriginalAssets: false,
            minRatio: 0.6
          })
        ]
      );
    }
  }
};
