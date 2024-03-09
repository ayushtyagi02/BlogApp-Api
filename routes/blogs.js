const express = require('express');
const router = express.Router();

const {createComment}= require('../controllers/commentController')
const {createPost,getAllPosts}= require('../controllers/postController')
const {likePost,unlikePost}= require('../controllers/likeController')

const postController= require('../controllers/postController')

router.post('/comments/create',createComment)
router.post('/posts/create',createPost)
router.post('/likes/like',likePost)
router.get('/posts',getAllPosts)
router.post('/likes/unlike',unlikePost)
module.exports = router