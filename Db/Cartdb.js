const {config}=require('dotenv');
const mongoose=require("mongoose");
config({path:"./env"})

mongoose.set('strictQuery', true);
//mongoose.connect(process.env.Pdb_conn);
mongoose.createConnection(process.env.Pdb_conn);

const CartSchema=new mongoose.Schema({
    U_id:String,
    U_qantity:Number,
    pro_data:{},
    

})
module.exports=mongoose.model("CartDB",CartSchema);