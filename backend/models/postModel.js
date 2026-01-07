import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    _id:String,
    title:String,
    category:String,
    text:String,
    username:String,
    uid:String,
    date:String,
    comment:String,
    likes:[],
    dislike:[],
    status:{type:String, default:"Pending"}
})

const postModel = mongoose.model("post", postSchema)

export default postModel;
