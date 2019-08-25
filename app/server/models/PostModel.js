var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var PostSchema = new Schema({
  text: String,
  title: String,
  author: {
    id: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    name: String
  }
});

module.exports = mongoose.model("Post", PostSchema);
