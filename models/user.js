const mongoose = require('mongoose');

//创建结构对象
let userShecma = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true   //字段值验证：唯一值
    },
    password: {
        type: String,
        required: true
    },
    displayName: {
        type: String
    }
});

//创建并导出模型对象
//集合是 user
// mogosh 里会展示为 users
module.exports = mongoose.model('user', userShecma);