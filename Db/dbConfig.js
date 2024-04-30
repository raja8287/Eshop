const {config}=require('dotenv');
const mongoose=require("mongoose");
config({path:"./env"})
const url=process.env.db_conn;
mongoose.set('strictQuery', true);
mongoose.connect(url);
const UserSchema=new mongoose.Schema({
    U_img:String,
    U_name:String,
    U_Email:String,
    U_contact:Number,
    U_pass:String,

})



module.exports=mongoose.model("UserDB",UserSchema);