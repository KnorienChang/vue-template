# vue-template

## Project setup
```
yarn install
```

### 启动开发环境
```
yarn run serve
```

### 打包生产环境
```
yarn run build
```

### 检查和修复错误的格式
```
yarn run lint
```

### 预览生产环境的应用
```
yarn run preview
```
## 去除element-ui
注释掉或者删除`index.html`的 
`<link rel="stylesheet" href="https://unpkg.com/element-ui@2.4.11/lib/theme-chalk/index.css">` 和 
`<script src="https://unpkg.com/element-ui@2.4.11/lib/index.js"></script>` 代码
## 去除或者修改px转rem
`postcss.config.js`配置文件的`postcss-px2rem`为px自动计算转换rem的配置，标准为设计图的`设计尺寸/10`，即`750的设计图`应该设置为`remUnit: 75`。

去除自动转换的话，注释或者删除`postcss.config.js`的`postcss-px2rem`配置即可。