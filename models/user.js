const mongoose=require("mongoose");
const bcrypt=require("bcrypt");
const loginSchema=mongoose.Schema({
    Username:{
        type:String,
    
    },
    Email:{
       type:String,
       required:true,
    },
    password:{
       type:String,
       required:true
    }
})
loginSchema.pre("save",  function (next) {
    if (!this.isModified("password")) return next();
    try {
        const hashedPassword =  bcrypt.hash(this.password, 10);
        this.password = hashedPassword;
        next();
    } catch (error) {
        return next(error);
    }
});
const Login=mongoose.model("user",loginSchema);
module.exports=Login;