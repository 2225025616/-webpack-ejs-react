# 保全网2.0 前端
为保全网前端服务，前端采用react做页面渲染，数据层采用react-redux，采用ejs用做页面模板。
前端采用nodejs构建，在发布时通过webpack打包js,css后，发布到nginx服务器。

## 安装开发环境
nodejs 在开发环境时使用， 在生产环境下不使用nodejs

首先安装最新版本的nodejs

## 安装node-sass

由于node-sass安装时需要编译代码,可以下载最新版本的node-sass两进制包安装
从https://github.com/sass/node-sass/releases下载最新的版本

```shell
#export SASS_BINARY_PATH=[local directory]
#npm i node-sass
```

将platform-x64-48_binding.node文件拷贝成node_moudles/node-sass/vendor/platform-x64-48/binding.node
 
##前期准备
```shell
npm install -g gulp

npm install

set NODE_ENV=production|development 设置生产或者开发模式,生产模式时会压缩代码
```

## 运行开发环境
```shell
npm start 
```

本地http://localhost:3000/site/desktop/home.html 可以查看页面

## server render
```shell
生产环境文件打包
npm run build-all

生产环境运行
npm run server

可设置端口port (默认端口3000)

server render 开发调试
npm run dev
```
##文件命名规则
.es 为ES6,ES7语法的javascript文件，采用babel-loader翻译，需要babel-runtime支持
.js ES5的javascript文件
.ejs html模板文件，静态页面，使用glup html生成实际页面


