const {config}=require('dotenv');
const mongoose=require("mongoose");
config({path:"./env"})

mongoose.set('strictQuery', true);
//mongoose.connect(process.env.Pdb_conn);
mongoose.createConnection(process.env.Pdb_conn);

const ProductSchema=new mongoose.Schema({
    P_img:String,
    P_name:String,
    P_Dis:String,
    U_price:String,
    P_colore:String,
    P_Rating:String,
    P_start:String
    

})
module.exports=mongoose.model("PDB",ProductSchema);