import Post from "../Models/PostSchema.js";
import { errorHandler } from "../Utils/Error.js";

//createn Post
export const  createPost = async(req,res,next)=>{
    if(!req.user.isAdmin){
        return next(errorHandler(401,"Your are not allowed to crete a post"));
    }
    if(!req.body.title || !req.body.content){
        return next(errorHandler(400,"All the fields are required"));
    }
    const {title,content,image,category} = req.body;
    const newPost = new Post({title,content,image,category})
    //console.log(newPost);
    try{
        const savedPost = await newPost.save();
        res.status(201).json({message:"Post Created successfully",result:savedPost});
    }
    catch(error){
        return next(errorHandler(500,"Internal Server in  create post Error"));
    }
}

//get All posts

export const getAllPosts = async(req,res,next)=>{
    try{
        const allpost = await Post.find();
        res.status(200).json({result:allpost});
    }
    catch(error){
        return next(error);
    }

}