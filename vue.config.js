const CompressionPlugin = require('compression-webpack-plugin');
const BrotliPlugin = require('brotli-webpack-plugin');
module.exports = {
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
