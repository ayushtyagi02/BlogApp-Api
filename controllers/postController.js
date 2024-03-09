const Comment = require('../models/commentModel');
const Post = require('../models/postModel');
exports.createPost= async (req,res)=>{

    try{

        const {body, title}= req.body;
        //creating a new comment object
        const post =new Post({
            
           body,
           title
        })
        //saving that new object in database by save() function
        const savedPost = await post.save();


        res.json({
            post: savedPost,
        })

    }
    catch(err){
       return res.status(400).json({
       error: "Error while Creating Comment"
       })
    }

};

exports.getAllPosts =async (req,res)=>{
    try{
        // const updatedPost = await Post.findByIdAndUpdate(post, {$push: {like: liked._id}},{new: true})
        const posts = await Post.find({}).populate("comment").populate("like").exec();
        res.json({
            posts
        })

    }
    catch(err){

    }
}