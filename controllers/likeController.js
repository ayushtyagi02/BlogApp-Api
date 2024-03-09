const { response } = require('express');
const Like = require('../models/likeModel');
const Post = require('../models/postModel');
exports.likePost= async (req,res)=>{

    try{

        const {user, post}= req.body;
        //creating a new like object
        const like =new Like({
            user,
            post
        })
        //saving that new object in database by save() function
        const liked = await like.save();

        //update the post database with the new like
        const updatedPost = await Post.findByIdAndUpdate(post, {$push: {like: liked._id}},{new: true})
        .populate("like").populate("comment")
        .exec();

        res.json({
            message: "Liked Successfully",
            updatedPost,
        })

    }
    catch(err){
       return res.status(400).json({
       error: "Error while Liking"
       })
    }

};

exports.unlikePost =async (req,res) =>{
    try{
        
        const { post, like}= req.body
        // console.log(like)
        const deletedLike=await Like.findOneAndDelete({post: post, _id: like});
        // console.log("deleted",deletedLike._id)
        const updatedPost = await Post.findByIdAndUpdate(post, {$pull: {like: deletedLike._id}},{new: true});
        res.json({
            message: "Unliked Successfully",
            post:updatedPost
        })

    }
    catch(err){
        return res.status(400).json({
        error: "Error while Liking"
        })
     }
}