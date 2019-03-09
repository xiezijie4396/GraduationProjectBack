var mongoose = require("mongoose");
// Schema
var advSchema = mongoose.Schema({
  advs: {
    type: Object
  },
  createTime: {
    type: Date,
    default: Date.now
  }
});


exports.Advs = mongoose.model("Advs", advSchema);
