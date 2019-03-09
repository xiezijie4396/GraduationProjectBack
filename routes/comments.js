var express = require('express');
var router = express.Router();
var User = require('../models/User').User;
var Goods = require('../models/Goods').Goods;
var Comments = require('../models/Comments').Comments;
var resultMsg = {
    status: 0,
    msg: ''
}

router.post('/get', (req, res) => {
    var salerId = req.body.salerId
    Comments.find({
        salerId: salerId
    }).populate('salerId userId goodsId').exec(function(err, result){
        if(err){
            resultMsg = {
                status: -1,
                msg: '数据库查询错误'
            }
            return
        }
        resultMsg = {
            status: 1,
            msg: '数据库查询成功'
        }
        res.send(result)
    })
});


// 发表留言
router.post('/set', (req, res) => {
    var content = req.body.content
    var goodsId = req.body.goodsId
    var userId = req.body.userId
    var salerId = req.body.salerId
    Comments.create({
        goodsId: goodsId,
        content: content,
        userId: userId,
        salerId: salerId
    }, function(err, result){
        if(err){
            resultMsg = {
                status: -1,
                msg: '评论发表错误'
            }
            return
        }
        resultMsg = {
            status: 1,
            msg: '评论发表成功'
        }
        Goods.update({
            _id: goodsId
        }, {
            $inc: {
                comments: 1,
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
            res.send(resultMsg)
        })     
    })
});

module.exports = router