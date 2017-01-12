## install
```bash
$ git clone https://github.com/superNever/website.git
$ cd website&& npm install

```

## start
```
npm start
```

## 编译源文件
```bash
npm run web

```

## 目录结构
```bash

├── README.md
├── bin
│   ├── run
│   └── www
├── config
│   └── webpack.config.js     //webpack 配置
├── node_modules
|
├── package.json
├── public
│   ├── javascripts           //编译后的前端js
│   └── stylesheets			  //编译后的前端css
├── public-dev				  //前端源文件
│   ├── images
│   ├── javascripts
│   └── stylesheets
├── routes					 //路由
│   ├── index.js
│   └── users.js
├── server					 //server
│   └── app.js
└── views			
    ├── entry				//后端模板源文件
    ├── index.ejs			//编译产出的后端模板文件
    └── user.ejs		    //编译产出的后端模板文件
```
