const CompressionPlugin = require('compression-webpack-plugin');
const BrotliPlugin = require('brotli-webpack-plugin');
module.exports = {
  // 在vue配置中，去除并限制改写publicPath，而改用baseUrl
  // baseUrl可以设置成相对路径，默认为/
  // 也可以设置成cdn/oss的URI链接，但是必须以协议开头即http://或者https://
  // baseUrl:
  //   process.env.NODE_ENV === 'production' ? 'https://cdn.domain.com/' : '/',
  outputDir: process.env.OUTPUT_DIR,
  // 取消生产环境的sourceMap
  productionSourceMap: false,
  devServer: {
    open: true,
    proxy: process.env.VUE_APP_HTTP
  },
  configureWebpack: () => {
    const conf = {};
    // 添加外部引用
    conf.externals = {
      vue: 'Vue',
      'vue-router': 'VueRouter',
      axios: 'axios',
      vuex: 'Vuex',
      'element-ui': 'Element'
    };
    // 打包生产环境的时候添加gzip和brotli压缩
    if (process.env.NODE_ENV === 'production') {
      conf.plugins = [
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
      ];
    }
    return conf;
  }
};
