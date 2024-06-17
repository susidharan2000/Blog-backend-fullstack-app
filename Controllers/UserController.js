import { errorHandler } from "../Utils/Error.js";
import User from "../Models/UserSchema.js";
import bcrypt from 'bcryptjs';

export  const updateUser = async(req,res,next)=>{
if(req.user.id !== req.params.id){
    return next(errorHandler(401,"Unauthorized to Access Update the User"));
}
if(req.body.password){
    if(req.body.password.length < 6){
        return next(errorHandler(400,"Password should be atleast 6 characters"));
    }
}
if(req.body.username){
    if(req.body.username.length < 7 || req.body.username.length > 16){
        return next(errorHandler(400,"Username should be atleast 7 characters"));
    }
    if(req.body.username.includes(" ")){
        return next(errorHandler(400,"Username should not contain spaces"));
    }
    if(req.body.username !== req.body.username.toLowerCase()){
            return next(errorHandler(400,"Username should not in Captial format"));
   }
   if(!req.body.username.match(/^[A-Za-z0-9 ]+$/)){
    return next(errorHandler(400,"Username should not contain special characters"));
   }
}
try{
    const hashedpassword = bcrypt.hashSync(req.body.password, 10);
     await User.findByIdAndUpdate(req.params.id,{
        $set:{
            username:req.body.username,
            email:req.body.email,
            password:hashedpassword,
            profilePic:req.body.profilePic
        },
        new:true,
    })
    const updatedUser = await User.findById(req.params.id);
    const {password , ...rest} = updatedUser._doc;
    res.status(200).json({message:"User Updated Successfully",rest});
}
catch(err){
    return next(errorHandler(500,err.message));
}
}

//Delete User
export const deleteUser = async(req,res,next)=>{
    if(req.user.id !== req.params.id){
        return next(errorHandler(401,"Unauthorized to Access Delete the User"));
    }
    try{
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({message:"User Deleted Successfully"});
    }
    catch(err){
        return next(errorHandler(500,err.message));
    }
}