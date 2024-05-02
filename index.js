const express=require("express");
const app=express();

require("dotenv").config();
var bodyParser = require("body-parser");

const Port=process.env.Port ||4000
const U_DB=require('./Db/dbConfig');
const P_DB=require('./Db/ProDbconfig');
const CartDB=require('./Db/Cartdb');
const OrderDB=require('./Db/Orderdb')

const cors=require('cors');
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json({limit:'500mb'}));
app.use(express.urlencoded({limit:'500mb'}));
app.use(bodyParser.json());


//user apis
app.get('/',async(req,resp)=>{
    let data=await U_DB.find();

    console.log("Api Hit",data);

    resp.send(data);

})

app.get('/userDb',async(req,resp)=>{
    let data=await U_DB.find();

    console.log("Api Hit",data);

    resp.send("Done!");

})
//crateing new profile
app.post('/userDb',async(req,resp)=>{
    let d=await U_DB.findOne({
        U_Email:req.body.u_email,
        
    })
    if(d==null){
    let data=await U_DB.create({
        U_name:req.body.u_Name,
        U_Email:req.body.u_email,
        U_contact:req.body.u_con,
        U_pass:req.body.u_Pass,
        U_img:req.body.u_img,
      
    })
    resp.send({msg:"Profile Created"});
    console.log('profile creteed',data)
}
else{
    resp.send({msg:"User Already Exist"});
    console.log('user already exist')
}
})

//user validation
app.post('/uservalidation',async(req,resp)=>{
    let d=await U_DB.findOne({
        U_Email:req.body.u_Email,
    }).catch(error => {
        console.error('Error:', error);
      })
    if(d==null){
    resp.send({msg:"User Not Exist"});
    }
    else{
        if(d.U_pass===req.body.u_Pass){
            resp.send({msg:`Welcome ${d.U_name}`,
        userdata:[d._id,d.U_Email]
        });

        }
        else{
            resp.send({msg:"Password Not Matching"})
        }
    }
   
})

app.post('/getUser',async(req,resp)=>{
    console.log(req.body);
    let data=await U_DB.findOne({
        U_Email:req.body.u_Email,

    })
    if(data!==null){
        resp.send({img:data.U_img,name:data.U_name,Email:data.U_Email,contact:data.U_contact});

    }
    else{
        resp.send("No Data Avalable");
    }

})


//Product Api
//creating product
app.post('/createPro',async(req,resp)=>{
    console.log(req.body);
  if(req.body){
    let data=await P_DB.create({
        P_img:req.body.P_img,
        P_name:req.body.P_Name,
        P_Dis:req.body.P_dis,
        U_price:req.body.P_price,
        P_colore:req.body.P_colore,
        P_Rating:0,
        P_start:0
      
    })
    resp.send({msg:"Prodctu is Add to Db"});
    console.log('Prodctu is Add to Db',data)
}
else{
    resp.send({msg:"somthing is wrong"});
    console.log('Somting is wrong',data)
}
   

})
app.get('/getpro',async(req,resp)=>{

    let data=await P_DB.find()

    resp.send(data);
})
app.post('/getpro/pro',async(req,resp)=>{
    console.log(req.body);
    let data=await P_DB.findOne({
        _id:req.body.produc
    })
    console.log(data);
    resp.send(data)
})



//Add to cart
app.post("/cart",async(req,resp)=>{
    console.log("Cart_item",req.body);
    let data=await CartDB.find({
        U_id:req.body.mail
    })
    console.log("data:",data);
    resp.send(data)
})
//adding a product to cart
app.post("/AddToCart",async(req,resp)=>{
    let data=await CartDB.create({
        U_id:req.body.u_Email,
        U_qantity:1,
        pro_data:req.body.maindata
    })
    if(data){
        resp.send({msg:"Item Is Added To Cart"});
        console.log("Item Is Added To Cart");

    }
    else{
        resp.send({msg:"Somthing Is Wrong"});
        console.log("Somthing is Wrong in Addto Cart Api");
    }
})
//deleting a cart item
app.delete("/deleteProduct",async(req,resp)=>{
    let data=await CartDB.deleteOne({
        _id:req.body.Prodict_id
    })
    console.log(data);
    resp.send({msg:"Done"});
})
//quantity increasing
app.put("/increaseQuantitty",async(req,resp)=>{
    let data=await CartDB.findOne({
        _id:req.body.Prodict_id
    })
    if(data.U_qantity>0){
        if(req.body.mode=='dec'){
            let dat=await CartDB.updateOne({
                _id:req.body.Prodict_id,
            },{
                $set:{U_qantity:data.U_qantity-1}
            })
            console.log("Quantity decreasing");
            resp.send({msg:"Quantity decreasing"});

        
         }
         else if(req.body.mode=='inc'){
            let dat=await CartDB.updateOne({
                _id:req.body.Prodict_id,
            },{
                $set:{U_qantity:data.U_qantity+1}
            })
            console.log("Quantity increasing");
            resp.send({msg:"Quantity increasing"});

        }
    }

    else{
        resp.send({msg:"Quantity Should Be Greater Than 0"});
    }
 
    

})

//Order Api
app.post("/Orders",async(req,resp)=>{
    let data=await OrderDB.find({
        U_id:req.body.u_Email,

    })
    console.log("Order Api");
    resp.send(data)
})

app.post('/PlaceOrder',async(req,resp)=>{
    var someDate = new Date();
    var numberOfDaysToAdd = 14;
    var result = someDate.setDate(someDate.getDate() + numberOfDaysToAdd);
    let data=await OrderDB.create({
        U_id:req.body.U_Id,
        Order_qantity:req.body.U_Q,
        Order_status:'placed',
        Order_orderDate:[req.body.Order_date,new Date(result)],
        Order_data:req.body.Order_data,
    })
    console.log("PlaceOrder");
    resp.send({msg:"Done"})
})


app.listen(Port,()=>{
    console.log(`Your Api Is Runing On ${Port}`)

})
