var mongoose = require('mongoose')

// Schema
var commentsSchema = mongoose.Schema({
    content: String,
    goodsId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Goods'
    },
    userId: {                                            // 发表评论的人的id
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    salerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    createTime: {
        type: Date,
        default: Date.now
    },
})

exports.Comments = mongoose.model('Comments', commentsSchema)