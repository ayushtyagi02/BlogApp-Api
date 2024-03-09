const Comment = require('../models/commentModel');
const Post = require('../models/postModel');
exports.createComment= async (req,res)=>{

    try{

        const {user, body, post}= req.body;
        //creating a new comment object
        const comment =new Comment({
            user,
            body,
            post
        })
        //saving that new object in database by save() function
        const savedComment = await comment.save();

        //update the post database with the new comment
        const updatedPost = await Post.findByIdAndUpdate(post, {$push: {comment: savedComment._id}},{new: true})
        .populate("comment")
        .exec();

        res.json({
            updatedPost,
        })

    }
    catch(err){
       return res.status(400).json({
       error: "Error while Creating Comment"
       })
    }

}