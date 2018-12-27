# vue-template

## Project setup
```
yarn install          # 安装依赖
yarn run serve        # 启动开发环境
yarn run build        # 打包生产环境
yarn run lint         # 检查和修复错误的格式
yarn run preview:prod # 预览生产环境的应用
yarn run preview:pre  # 预览其他打包环境的应用
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

## 在封装函数中使用组件，依然需要执行按需引入
>策略可以自己调整，也可以全部引入或者只采用按需引入的方式。这里以`element-ui`为例。
在`.babel.config.js`中配置插件(以`element-ui`的`message`组件为例)
```js
plugins: [
  [
    'component',
    {
      libraryName: 'element-ui',
      styleLibraryName: 'theme-chalk'
    }
  ]
]
```
然后在封装的函数中引入(项目中以封装`axios`的`fetch.js`为例)
```js
import { Message } from 'element-ui';
import './../assets/style/toast.scss';
```
>因样式加载顺序会覆盖的问题，需要单独对引入的组件做样式处理。

## router和store的处理
router几乎没有做处理，这块的操作因项目而异。

store进行了文件读取操作，按照模块功能划分的处理进行改造。
当新增加module的时候，可以直接在`modules`文件夹下创建`xxx.js`，所有的状态都被vuex读取并管理。
>注：因为读取文件的数据，state会多一层对象，所以直接通过读取state会读取不到。假如我要读取`xxx.js`文件下的状态`count`，我们可以通过读取`$store.getters.count`或者`$store.state.xxx.count`，否则就不能够正确的读取到state，具体的可以查阅[vuex官方文档](https://vuex.vuejs.org/zh/installation.html)。
