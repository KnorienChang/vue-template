# vue-template

## Project setup
```
yarn install        # 安装依赖
yarn run serve      # 启动开发环境
yarn run build      # 打包生产环境
yarn run lint       # 检查和修复错误的格式
yarn run preview    # 预览生产环境的应用
```
## 去除element-ui
注释掉或者删除`index.html`的 
`<link rel="stylesheet" href="https://unpkg.com/element-ui@2.4.11/lib/theme-chalk/index.css">` 和 
`<script src="https://unpkg.com/element-ui@2.4.11/lib/index.js"></script>` 代码
## 去除或者修改px转rem
`postcss.config.js`配置文件的`postcss-px2rem`为px自动计算转换rem的配置，标准为设计图的`设计尺寸/10`，即`750的设计图`应该设置为`remUnit: 75`。

去除自动转换的话，注释或者删除`postcss.config.js`的`postcss-px2rem`配置即可。

## 生产环境请求源设置
`fetch.js`下的`baseURL`设置，默认设置为固定请求源，可以调整为`baseURL: process.env.BASE_URL`设置为请求本地源，用于nginx做proxy配置。

## 添加多个打包环境
>有关于环境变量和模式的文档可以查阅[官方网文档](https://cli.vuejs.org/zh/guide/mode-and-env.html)。

新建换将变量文件`.env.xxx`，添加环境变量`NODE_ENV=production`启用打包，指定`OUTPUT_DIR`输出打包目录，其余环境变量可自行增删。
>注：在项目中使用的环境变量设置要以`VUE_APP_`开头，而在`node`环境下，即`webpack`打包的配置所需要的环境变量，可以不需要前缀。