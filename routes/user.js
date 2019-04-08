var express = require('express');
var router = express.Router();
var User = require('../models/User').User;
// 用于表示对请求返回的信息
var resultMsg = {
    status: 0,
    msg: ''
}

router.post('/register', function(req, res){
    var username = req.body.username
    var password = req.body.password
    User.find({
        username: username
    }).exec(function(err, data){
        if(err){
            resultMsg = {
                status: -1,
                msg: '数据库查询错误'
            }
            res.send(resultMsg)
            return;
        }
        if(data.length !== 0){
            resultMsg = {
                status: -2,
                msg: '用户名重复了'
            }
            res.send(resultMsg)
            return;
        }
        User.create({
            username: username,
            password: password
        },function(err, data){
            if(err){
                resultMsg = {
                    status: -3,
                    msg: '数据库写入错误'
                }
                res.send(resultMsg)
                return;
            } 
            resultMsg = {
                status: 1,
                msg: '用户注册成功'
            }
            res.send(resultMsg)    
        })
    })
});

router.post('/login', function(req, res){
    var username = req.body.username
    var password = req.body.password
    User.find({
        username: username,
        password: password
    }, function(err, data){
        if(err){
            resultMsg = {
                status: -1,
                msg: '数据库查询错误'
            }
            res.send(resultMsg)
            return;
        }
        if(data.length === 0){
            resultMsg = {
                status: -2,
                msg: '用户名或密码错误,请重新输入',
            }
            res.send(resultMsg)
            return;
        }else{
            resultMsg = {
                status: 1,
                msg: '登陆成功',
                userId: data[0]._id
            }
            res.send(resultMsg)
            User.update({username: username}, {loginTime: new Date()}, function(err, res){
                if (err) {
                    console.log("Error:" + err);
                }
                else {
                    console.log("Res:" + res);
                }
            })
        }
    })
});

router.post('/getdetail', function(req, res){
    var id = req.body.id
    User.find({
        _id: id
    }).exec(function(err, data){
        if(err){
            resultMsg = {
                status: -1,
                msg: '数据库查询错误'
            }
            res.send(resultMsg)
            return;
        }
        res.send(data[0])
    })
});

router.post('/setdetail', function(req, res){
    var id = req.body.id
    var username = req.body.username
    var password = req.body.password
    var name = req.body.name
    var phone = req.body.phone
    var address = req.body.address
    var profile = req.body.profile
    var headImg = JSON.parse(req.body.headImg)
    User.find({                         // 先查看用户名有没有重复
        username: username,             // 用户名相同
        _id: {$ne:id}                   // id不同
    }).exec(function(err, data){
        if(err){
            resultMsg = {
                status: -1,
                msg: '数据库查询错误'
            }
            res.send(resultMsg)
            return;
        }
        if(data.length !== 0){
            resultMsg = {
                status: -2,
                msg: '用户名重复'
            }
            res.send(resultMsg)
            return;
        }
        User.update({
            _id: id
        }, {
            $set: {
                username: username,
                password: password,
                name: name,
                phone: phone,
                address: address,
                profile: profile,
                headImg: headImg
            }
        }, function(err, data){
            if(err){
                resultMsg = {
                    status: -1,
                    msg: '数据库查询错误'
                }
                res.send(resultMsg)
                return;
            }
            resultMsg = {
                status: 1,
                msg: '用户修改成功'
            }
            res.send(data)
        })     
    })
});

router.post('/delete', function(req, res){
    var uid = req.body.uid
    User.remove({
        _id: uid
    }, function(err, data){
        if(err){
            resultMsg = {
                status: -1,
                msg: '数据库查询错误'
            }
            res.send(resultMsg)
            return;
        }
        resultMsg = {
            status: 1,
            msg: '用户删除成功'
        }
        res.send(resultMsg)
    })     
});

router.post('/get', function(req, res){
    User.find({})
        .exec(function(err, data){
            if(err){
                resultMsg = {
                    status: -1,
                    msg: '数据库查询错误'
                }
                res.send(resultMsg)
                return;
            }
            if(data.length === 0){
                resultMsg = {
                    status: 0,
                    msg: '暂无数据'
                }
                res.send(resultMsg)
                return;
            }
            res.send(data)
    })
});

router.post('/register/getdetail', function(req, res){
    var id = req.body.id
    User.find({
        _id: id
    }).exec(function(err, data){
        if(err){
            resultMsg = {
                status: -1,
                msg: '数据库查询错误'
            }
            res.send(resultMsg)
            return;
        }
        res.send(data[0])
    })
});

router.post('/register/setdetail', function(req, res){
    var id = req.body.id
    var username = req.body.username
    var password = req.body.password
    var name = req.body.name
    var phone = req.body.phone
    var address = req.body.address
    var profile = req.body.profile
    var headImg = JSON.parse(req.body.headImg)
    
    User.find({                         // 先查看用户名有没有重复
        username: username,             // 用户名相同
        _id: {$ne:id}                   // id不同
    }).exec(function(err, data){
        if(err){
            resultMsg = {
                status: -1,
                msg: '数据库查询错误'
            }
            res.send(resultMsg)
            return;
        }
        if(data.length !== 0){
            resultMsg = {
                status: -2,
                msg: '用户名重复'
            }
            res.send(resultMsg)
            return;
        }
        User.update({
            _id: id
        }, {
            $set: {
                username: username,
                password: password,
                name: name,
                phone: phone,
                address: address,
                profile: profile,
                headImg: headImg
            }
        }, function(err, data){
            if(err){
                resultMsg = {
                    status: -1,
                    msg: '数据库查询错误'
                }
                res.send(resultMsg)
                return;
            }
            resultMsg = {
                status: 1,
                msg: '用户修改成功'
            }
            res.send(data)
        })     
    })
});

module.exports = router