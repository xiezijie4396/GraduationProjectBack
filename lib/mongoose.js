var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/ComputerMall', (err) => {
    if (err) {
        console.log('数据库链接错误', 'err')
    } else {
        console.log('数据库链接成功')
    }
})

exports.db = mongoose.connection

// MVC