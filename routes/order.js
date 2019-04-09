var express = require('express');
var router = express.Router();
var Order = require('../models/Order').Order;
var Goods = require('../models/Goods').Goods;
var User = require('../models/User').User;
// 用于表示对请求返回的信息
var resultMsg = {
    status: 0,
    msg: ''
}

router.post('/create', function(req, res){
    var items = JSON.parse(req.body.items)
    items.forEach(e => {
        Order.create({
            name: e.name,
            num: e.num,
            price: e.price,
            buyerName: e.buyerName,
            salerName: e.salerName,
            address: e.address,
            phone: e.phone,
            goodsId: e.goodsId,
            totalNum: e.totalNum
        }).then(result => {
            // 根据订单中商品的数量对库存进行修改
            Goods.update({
                name: e.name
            },{
                $inc:{num: -e.num}     // num 相比原来减少订单中商品的数量
            }).then(result1 => {})
        })
    });
    res.send('订单添加成功')
});

// 获取所有订单
router.post('/get', function(req, res){
    Goods.find({}).then(result => {
        result.forEach(e => {
            // 更新可选择的最大数量
            Order.update({
                goodsId: e._id
            }, {
                $set: {
                    totalNum: e.num
                }
            },{multi:true}).then(result => {})
        })
        setTimeout(function(){
            Order.find({}).then(result3 => {
                res.send(result3)
            })
        }, 0)
    })
});

// 更改订单状态
router.post('/changeStatus', function(req, res){
    var id = req.body.id;
    var status = req.body.status;
    var kind = req.body.kind
    // 执行管理员才能有的操作 删除订单 / 执行只有在顾客还未确认购买情况下的 取消订单 操作
    if(kind == 'admin'){
        Order.remove({
            _id: id
        }).then(function(err, result){
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
                msg: '数据删除成功'
            }
            res.send(resultMsg)
            return;
        })
    }
    Order.update({
        _id: id
    }, {
        $set: {
            status: status,
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
        // 顾客更改状态 店家、管理员自动将该订单置为"未读"状态
        if(kind == 'buyer'){
            Order.update({
                _id: id
            }, {
                $set: {
                    salerRead: false,
                    adminRead: false,
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
                    msg: '数据更改成功'
                }
                res.send(resultMsg)
            })
        }
        // 店家更改状态 顾客、管理员自动将该订单置为"未读"状态
        else if(kind == 'saler'){
            Order.update({
                _id: id
            }, {
                $set: {
                    buyerRead: false,
                    adminRead: false,
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
                    msg: '数据更改成功'
                }
                res.send(resultMsg)
            })
        }
    })
    
});

// 更改订单商品数量
router.post('/changeNum', function(req, res){
    var id = req.body.id;
    var order = JSON.parse(req.body.order);
    Order.find({
        _id: id
    }).then(result1 => {
        Goods.update({
            _id: result1[0].goodsId
        },{
            $inc:{num: result1[0].num - order.num}       // 原来的仓库量 - 现在的需要量 = 现在的仓库量
        }).then(result2 => {
            Order.update({
                _id: id
            },{
                $set: {num: order.num}
            }).then(result3 => {
                res.send('订单修改成功')
            })
        })   
    })
});

// 更改订单阅读状态
router.post('/changeRead', function(req, res){
    var id = req.body.id;
    var type = req.body.type;
    var username = req.body.username;
    if(type == 'true'){
        type = true
    }else{
        type = false
    }
    Order.find({
        _id: id
    }, function(err, data){
        if(err){
            resultMsg = {
                status: -1,
                msg: '数据库查询错误'
            }
            res.send(resultMsg)
            return;
        }
        if(data[0].buyerName == username){
            Order.update({
                _id: id
            }, {
                $set: {
                    buyerRead: type
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
                    msg: '数据更改成功'
                }
                res.send(resultMsg)
            })
        }
        else if(data[0].salerName == username){
            Order.update({
                _id: id
            }, {
                $set: {
                    salerRead: type
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
                    msg: '数据更改成功'
                }
                res.send(resultMsg)
            })
        }
        else if(data[0].adminName == username){
            Order.update({
                _id: id
            }, {
                $set: {
                    adminRead: type
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
                    msg: '数据更改成功'
                }
                res.send(resultMsg)
            })
        }
    })      
});


module.exports = router