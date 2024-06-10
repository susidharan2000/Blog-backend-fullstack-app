import  mongoose from "mongoose";

const user_Schema = mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    profilePic:{
        type:String,
        default:"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.business2community.com%2Fwp-content%2Fuploads%2F2017%2F08%2Fblank-profile-picture-973460_640.png&f=1&nofb=1&ipt=2f55ecd867074ebe13aaa0e742eae11f57b7b3c9ee459e307c2e482af4e0b81c&ipo=images"
    }
},{timestamps:true});
const User = mongoose.model("User",user_Schema);

export default User;