var mongoose = require("mongoose");
// Schema
var userSchema = mongoose.Schema({
  username: {             // 用户名
    type: String,
    unique: true
  },
  password: String,       // 密码
  name: String,           // 姓名
  phone: String,          // 手机
  address: String,        // 住址
  profile: String,        // 简介
  headImg: Object,        // 头像
  createTime: {
    type: Date,
    default: Date.now
  },
  loginTime: {             // 最近登陆时间
    type: Date,
    default: Date.now
  },
});


exports.User = mongoose.model("User", userSchema);
