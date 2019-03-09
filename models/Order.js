var mongoose = require("mongoose");
// Schema
var orderSchema = mongoose.Schema({
  status: {
    type: String,
    default: '待顾客确认'
  },
  name: String,
  num: Number,
  price: Number,
  wantNum: Number,
  createTime: {
    type: Date,
    default: Date.now
  },
  buyerName: String,
  buyerRead: {
    type: Boolean,
    default: false
  },
  salerName: String,
  salerRead: {
    type: Boolean,
    default: false
  },
  adminName: {
    type: String,
    default: 'admin'
  },
  adminRead: {
    type: Boolean,
    default: false
  },
  address: String,
  phone: String
});


exports.Order = mongoose.model("Order", orderSchema);
