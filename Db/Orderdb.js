const {config}=require('dotenv');
const mongoose=require("mongoose");
config({path:"./env"})

mongoose.set('strictQuery', true);
//mongoose.connect(process.env.Pdb_conn);
mongoose.createConnection(process.env.Pdb_conn);

const orderSchema=new mongoose.Schema({
    U_id:String,
    Order_qantity:Number,
    Order_status:String,
    Order_orderDate:{},
    Order_data:{},
    

})
module.exports=mongoose.model("OrderDB",orderSchema);