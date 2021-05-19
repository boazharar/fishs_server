const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
  title: { type: String, require: true },
  sub: { type: String, require: true },
});

module.exports = mongoose.model("Posts", PostSchema);
