const express = require("express");
const router = express.Router();

const Post = require("../models/Post");
const verifyToken = require("../middleware/auth");

// @router GET api/posts
// @desc GET posts
// @access Private
router.get("/", verifyToken, async (req, res) => {
  try {
    const posts = await Post.find({ user: req.userId }).populate("user", [
      "username",
    ]);
    res.json({
      success: true,
      posts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server" });
  }
});

// @router POST api/posts
// @desc POST posts
// @access Private
router.post("/", verifyToken, async (req, res) => {
  const { title, description, url, status } = req.body;

  // Simple Validation
  if (!title)
    return res.status(400).json({
      success: false,
      message: "Title id require",
    });

  try {
    const newPost = new Post({
      title,
      description,
      url: url.startsWith("https://") ? url : `https://${url}`,
      status: status || "TO LEARN",
      user: req.userId,
    });

    await newPost.save();

    res.json({
      success: true,
      message: "Create Post successfully",
      Post: newPost,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server" });
  }
});

// @router PUT /api/posts/:id
// @desc PUT posts
// @access Private
router.put("/:id", verifyToken, async (req, res) => {
  const { title, description, url, status } = req.body;
  // Simple validation

  if (!title)
    return res.status(400).json({
      success: false,
      message: "Title not found",
    });

  try {
    let updatePost = {
      title: title,
      description: description,
      url: url.startsWith("https://") ? url : "https://%s",
      url,
      status: status || "TO LEARN",
    };

    const checkPostUser = { _id: req.params.id, user: req.userId };
    updatePost = await Post.findOneAndUpdate(checkPostUser, updatePost, {
      new: true,
    });

    // User not authorised to update Post
    if (!updatePost)
      return res.status(401).json({
        success: false,
        message: "Post not found or user not authorised",
      });

    res.json({
      success: true,
      message: "Update successfully",
      Post: updatePost,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server" });
  }
});

// @router DELETE /api/posts/:id
// @desc DELETE posts
// @access Private
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const checkPostUser = { _id: req.params.id, user: req.userId };
    const detelePost = await Post.findOneAndDelete(checkPostUser);

    if (!detelePost)
      return res.status(400).json({
        success: false,
        message: "Post not found or user not authorised",
      });

    res.json({
      success: true,
      message: "Delete successfully",
      Post: detelePost,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server" });
  }
});

// @router GET api/posts/find
// @desc GET posts
// @access Private
// router.get('/find' , verifyToken , async(req , res) => {
//     const { title , status } = req.body
//     try {
//         console.log(title)
//         // Check require
//         if(!title && !status)
//             return res
//                 .status(400)
//                 .json({
//                     success: false,
//                     message: 'Title not found and status not found'
//                 })

//             // Find title
//             if(title) {
//                 const checkPostTitle = {title: title ,user: req.userId}
//                 const findTitle = await Post.find(checkPostTitle)

//                 if(findTitle == "")
//                 return res
//                     .status(401)
//                     .json({
//                         success: false,
//                         message: 'Not found'
//                     })

//                     res.json({
//                         success: true,
//                         message: 'Find successfully',
//                         Post : findTitle
//                     })
//             }

//             // Find status
//             const checkPostStatus = {status: status , user: req.userId}
//             const findStatus = await Post.find(checkPostStatus)

//             if(findStatus == "")
//                 return res
//                     .status(401)
//                     .json({
//                         success: false,
//                         message: 'Not found!'
//                     })

//                 res.json({
//                     success: true,
//                     message: 'Find successfully',
//                     Post : findStatus
//                 })

//     } catch (error) {
//         console.log(error)
//         res.status(500).json({ success: false, message: 'Internal server'})
//     }
// })

module.exports = router;
