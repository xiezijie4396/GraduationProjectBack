var express = require('express');
var router = express.Router();
var Goods = require('../models/Goods').Goods;
var resultMsg = {
    status: 0,
    msg: ''
}

router.post('/get',function(req, res){
    Goods.find({}, function(err, result){
        if(err){
            resultMsg = {
                status: -1,
                msg: '数据库查询错误'
            }
            res.send(resultMsg)
            return;
        }
        res.send(result)
    })
});

router.post('/getOne', function(req, res){
    var uid = req.body.uid
    Goods.find({
        _id: uid
    },function(err, data){
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

router.post('/add',function(req, res){
    var params = JSON.parse(req.body.params)
    var storage = JSON.parse(req.body.storage)
    var show = JSON.parse(req.body.show)
    var detail = req.body.detail
    var upLoadImg = JSON.parse(req.body.upLoadImg)
    var name = req.body.name
    var price = req.body.price
    var num = req.body.num
    var packList = JSON.parse(req.body.packList)
    var saler = req.body.saler
    var salerId = req.body.salerId
        
    Goods.create({
        params: params,
        storage: storage,
        show: show,
        detail: detail,
        upLoadImg: upLoadImg,
        name: name,
        price: price,
        num: num,
        packList: packList,
        saler: saler,
        salerId: salerId
    },function(err, data){
        if(err){
            resultMsg = {
                status: -1,
                msg: '数据库写入错误'
            }
            res.send(resultMsg)
            return;
        } 
        resultMsg = {
            status: 1,
            msg: '商品添加成功'
        }
        res.send(resultMsg)    
    })
});

router.post('/delete', function(req, res){
    var uid = req.body.uid
    Goods.remove({
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
            msg: '商品删除成功'
        }
        res.send(resultMsg)
    })     
});

router.post('/modifly', function(req, res){
    var uid = req.body.uid
    var params = JSON.parse(req.body.params)
    var storage = JSON.parse(req.body.storage)
    var show = JSON.parse(req.body.show)
    var detail = req.body.detail
    var upLoadImg = JSON.parse(req.body.upLoadImg)
    var name = req.body.name
    var price = req.body.price
    var num = req.body.num
    var packList = JSON.parse(req.body.packList)
    Goods.update({
        _id: uid
    }, {
        $set: {
            params: params,
            storage: storage,
            show: show,
            detail: detail,
            upLoadImg: upLoadImg,
            name: name,
            price: price,
            num: num,
            packList: packList
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
        res.send(data)
    })     
});

module.exports = router