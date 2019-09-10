const CompressionPlugin = require('compression-webpack-plugin');
const BrotliPlugin = require('brotli-webpack-plugin');
const HappyPack = require('happypack');
const os = require('os');
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
  configureWebpack: {
    // 添加外部引用
    externals: {
      vue: 'Vue',
      'vue-router': 'VueRouter',
      axios: 'axios',
      vuex: 'Vuex',
      'element-ui': 'Element'
    },
    plugins: [
      new HappyPack({
        id: 'happy-babel-js',
        // 3) re-add the loaders you replaced above in #1:
        loaders: ['babel-loader?presets[]=preset-env'],
        // loaders: [ 'babel-loader?cacheDirectory=true' ],
        threadPool: HappyPack.ThreadPool({ size: os.cpus().length })
      }),
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
  }
};
