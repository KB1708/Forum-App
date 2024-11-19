const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  likes: { type: Number, default: 0 },
  likedBy: { type: [mongoose.Schema.Types.ObjectId], ref: "User" },
});

module.exports = mongoose.model("Post", PostSchema);
