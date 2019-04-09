var mongoose = require("mongoose");
// Schema
var goodsSchema = mongoose.Schema({
  params: {
    type: Object,
  },
  storage: {
    type: Object,
  },
  show: {
    type: Object,
  },
  upLoadImg: {
    type: Array,
  },
  detail: {
    type: String,
  },
  name: {
    type: String,
  },
  price: {
    type: Number,
  },
  createTime: {
    type: Date,
    default: Date.now
  },
  packList: {
    type: Array,
  },
  saler: {                                           // 店家
    type: String,
  },
  salerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  num: {                                             // 总数量
    type: Number,
  },
  comments: {                                        // 评论数量
    type: Number,
    default: 0
  },  
  originalNum: {                                     // 原始数量
    type: Number, 
    default: 0
  }
});

exports.Goods = mongoose.model("Goods", goodsSchema);
