const express=require("express");
const app=express();

require("dotenv").config();
var bodyParser = require("body-parser");

const Port=process.env.Port ||4000
const U_DB=require('./Db/dbConfig');
const P_DB=require('./Db/ProDbconfig');


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

app.listen(Port,()=>{
    console.log(`Your Api Is Runing On ${Port}`)

})
