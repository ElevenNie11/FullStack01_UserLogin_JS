//浏览器粘贴地址：http://127.0.0.1:3000
const express = require('express');
const path = require('path');
const session = require('express-session');
//新增两行引入：
require('./db');                        //引入数据库连接
const User = require('./models/user');  //引入用户模型

//创建服务对象
const app = express();
const PORT = process.env.PORT || 3000;  //2026.7.2 新增：设置 PORT 环境变量

//中间件设置：解析表单数据
app.use(express.urlencoded({ extended: true })); // express 内置的“解析器”，用来解析表单提交的数据

//新增：启用 express-session 服务，创建好 request.session
app.use(session({
    secret: 'login-demo-secret-key',
    resave: false,
    saveUninitialized: false
}));

//新增：自定义中间件
function requireLogin(request, response, next){
    if(request.session && request.session.user){
        return next();                              //已登录就放行，继续往下走到真正的路由处理函数
    }
    return response.redirect('/login.html');        //未登录，跳回（保持）登录页面
}

//新增：受保护的页面：先过 requireLogin 这道关卡，通过了才会执行后面这个发送文件的回调
app.get('/dashboard.html', requireLogin, (request, response) => {
    response.sendFile(path.join(__dirname, 'protected', 'dashboard.html'));
});

app.use(express.static(path.join(__dirname, 'public'))); //托管静态资源，让这些静态资源 HTML 和 CSS 能直接通过 URL 访问到

//创建路由规则
//1. 访问根路径时，跳转到登录页
app.get('/', (request, response) => {
    response.redirect('/login.html');
});

//2. 处理登录表单提交
app.post('/login', (request, response) => {
    //取出表单提交的用户名和密码
    const username = request.body.username;
    const password = request.body.password;
    console.log(`用户 ${username} 尝试登录...`);

    //修改：
    User.findOne({
        username: username,
        password: password
    }).then(user => {
        if(!user){
            console.log('登录失败');
            return response.redirect('./fail.html');
        }
        console.log('登陆成功');
        request.session.user = {
            username: user.username,
            displayName: user.displayName
        };
        return response.redirect('./dashboard.html');
    }).catch(err => {
        console.log('数据库查询出错', err);
        response.redirect('./fail.html');
    });
});

//新增：用户注册逻辑 + 注册页面
app.post('/register', (request, response) => {
    const {username, password, displayName} = request.body;
    console.log(`用户${username}尝试注册`); 

    User.findOne({username: username}).then(existing => {
        //检查用户名是否已存在
        if(existing){
            console.log('用户名已存在！');
            return response.redirect('./register.html?error=exists');
        }
        //创建新用户，存入 MongoDB
        const newUser = new User({username, password, displayName});
        return newUser.save();
    }).then(result => {
        if(!result){
            return ;   //当用户名已经存在时 save() 未执行，result 是 undefined，直接跳过
        }
        console.log('注册成功');
        response.redirect('./login.html');
    }).catch(err => {
        console.log('注册出错', err);
        response.redirect('./register.html');
    });
});

//启动服务器，监听端口
/*
app.listen(PORT, () => {
    console.log('服务启动，端口 PORT3000 正在监听中...');
});
*/

app.listen(PORT, () => {
    console.log(`服务启动，端口 ${PORT} 正在监听中...`);
});