const User = require("../models/user");
const bcrypt=require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv=require("dotenv");
const path=require("path");
const nodemailer=require("nodemailer");
const fs=require("fs");
const Joi=require("joi")
dotenv.config();
const verify = async(session) => {
    try {
        const decodedToken = jwt.verify(session, process.env.SECRET_KEY);
        console.log(decodedToken);
        const user=await User.findOne({_id:decodedToken.userId})
        return user;
    } catch (err) {
        console.log(err);
        return null;
    }
};
const sendEmailWithAttachment = async (to, subject, html) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'sskmrsurya@gmail.com',
            pass: process.env.PASS_KEY
        }
    });
console.log(to)
    const mailOptions = {
        from: 'sskmrsurya@gmail.com',
        to: to,
        subject: subject,
        html:html,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
}
exports.signin = async (req, res) => {
    
    try {
        const existingUser = await User.findOne({ Email: req.body.Email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({
            Username: req.body.Username,
            Email: req.body.Email,
            password:hashedPassword
        });
        await newUser.save();
        const htmlTemplatePath = path.join(__dirname, '..', 'template', 'new.html');
        const htmlTemplate = fs.readFileSync(htmlTemplatePath, 'utf-8');

        // Replace placeholders with actual data
        const html = htmlTemplate
            .replace('{{ username }}', req.body.Username)
            .replace('{{ email }}', req.body.Email);

        // Send email to the user
        await sendEmailWithAttachment(req.body.Email, 'Welcome to Our Application', html, []);

        res.status(201).json({ message: "User created successfully", data: newUser });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal error", error: err.message });
    }
};
exports.login=async(req,res)=>{
    try{
        const user = await User.findOne({ Email: req.body.email });
        if (!user) {
            return res.status(404).json({ message: "User not found, register new user" });
        }
        const passwordMatch = await bcrypt.compare(req.body.password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ Message: "Incorrect password" });
        }
        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });   
        res.status(200).json({ message: "Login successful", token: token });
    }catch(err){
        console.log(err);
        res.status(500).json({ message: "Internal error", error: err });
    }
}
exports.findAll = async (req, res) => {
    try {
        const session = req.headers['session'];
        const user = await verify(session);

        if (!user) {
            return res.status(401).json({ message: "Please login before placing an order." });
        }

        const users = await User.find();
        console.log(users);
        res.status(200).json({ data: users });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal error", error: err });
    }
}
exports.deleteUser = async (req, res) => {
    try {
        const session = req.headers['session'];
        const user = await verify(session);
        
        if (!user) {
            return res.status(401).json({ message: "Please login before deleting the user." });
        }

        // Ensure you're deleting the correct user using user._id
        await User.deleteOne({ _id: user.userId});

        res.status(200).json({ message: "User removed successfully" });
    } catch (err) {
        console.error('Error deleting user:', err);
        res.status(500).json({ message: "Something went wrong", error: err.message });
    }
};

 exports.updateUser = async (req, res) => {

    try {
                const session = req.headers['session'];
                const user = await verify(session);
                console.log("users:",user)
                if (!user) {
                    return res.status(401).json({ message: "Please log in before updating the user details." });
                }
        
                if (req.body.password) {
                    const hashedPassword = await bcrypt.hash(req.body.password, 10);
                    req.body.password = hashedPassword;
                }
        
                const updatedUser = await User.findOneAndUpdate(
                    { _id: user._id },
                    {
                        Username: req.body.Username,
                        Email: req.body.Email,
                        password: req.body.password,
                    },
                    { new: true }
                );
        
                if (!updatedUser) {
                    return res.status(404).json({ message: "User not found" });
                }
        
                res.status(200).json({ status: true, message: "User updated successfully", data: updatedUser });
            }catch (err) {
        console.error('Error updating user:', err);
        res.status(500).json({ message: "Something went wrong", error: err.message });
    }
}

exports.getUserById=async(req,res)=>{
    try{
        const user=await User.findOne({_id:req.params.id});
        if(!user){
         res.status(404).json({status:false,Message:'user not found'})
        }
        res.status(200).json({data:user})
        
   }catch(err){
       console.log(err);
       res.status(500).json({status:false,Message:"something went wrong"});
   }
}