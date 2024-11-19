const express = require("express");
const Post = require("D:\\Web App Projects\\PyWebDev_MiniProject\\forum-app\\backend\\models\\Post.js");
const authenticate = require("D:\\Web App Projects\\PyWebDev_MiniProject\\forum-app\\backend\\middleware\\authenticate.js");

const router = express.Router();

// Create a Post
router.post("/", authenticate, async (req, res) => {
  const { title, content } = req.body;

  try {
    const post = new Post({ title, content });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;

// Like a Post
router.post("/like/:id", authenticate, async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
  
      if (post.likedBy.includes(req.user.id)) {
        return res.status(400).json({ message: "Already liked!" });
      }
  
      post.likedBy.push(req.user.id);
      post.likes += 1;
      await post.save();
  
      res.status(200).json({ message: "Post liked!" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
