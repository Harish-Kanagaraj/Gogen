const mongoose=require("mongoose");
mongoose.connect("mongodb://127.0.0.1/user",{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
   console.log("Database connected");
}).catch((error)=>{
   console.log("Database not connected:",error);
})
module.exports=mongoose.connection;