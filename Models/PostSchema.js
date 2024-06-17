import  mongoose from "mongoose";

const post_Schema = mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true,
        unique:true
    },
    image:{
        type:String,
        default:""
    },
    category:{
        type:String,
        default:"unCategorized"
    } 
},{timestamps:true});
const Post = mongoose.model("Post",post_Schema);

export default Post;