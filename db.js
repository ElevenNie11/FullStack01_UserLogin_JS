//2026.7.2 新增：
require('dotenv').config();
//导入 mongoose
const mongoose = require('mongoose');

//连接 mongodb 服务：数据库名称叫做userLogin
//mongoose.connect('mongodb://127.0.0.1:27017/userLogin');
//2026.7.2 修改：
mongoose.connect(process.env.MONGODB_URI);


//设置回调
mongoose.connection.once('open', () => {
    console.log('连接成功');
});

mongoose.connection.on('error', () => {
    console.log('连接失败');
});

mongoose.connection.once('close', () => {
    console.log('连接关闭');
});

//导出 mongoose 实例，实现代码复用
module.exports = mongoose;