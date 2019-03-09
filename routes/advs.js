var express = require('express');
var router = express.Router();
var Advs = require('../models/Advs').Advs;
var resultMsg = {
    status: 0,
    msg: ''
}

router.get('/', (req, res) => {
    // res.send('register GET');
    res.render('register');
});

router.post('/get',function(req, res){
    Advs.find({}, function(err, data){
        if(err){
            resultMsg = {
                status: -1,
                msg: '数据库查询错误'
            }
            res.send(resultMsg)
            return;
        }
        res.send(data)    
    })
});

router.post('/set',function(req, res){
    var imgs = JSON.parse(req.body.advs)
    var advs = []
    for(var i in imgs){
        advs.push(imgs[i])
    }
    Advs.remove({}, function(err, data){
        if(err){
            resultMsg = {
                status: -1,
                msg: '数据库查询错误'
            }
            res.send(resultMsg)
            return;
        }
        advs.forEach((e)=>{
            Advs.create({
                advs: e
            }, function(err, result){
                if(err){
                    resultMsg = {
                        status: -1,
                        msg: '数据库查询错误'
                    }
                    res.send(resultMsg)
                    return;
                }
            })
        })
        resultMsg = {
            status: 1,
            msg: '广告修改成功'
        }
        res.send(resultMsg)    
    })
});

module.exports = router