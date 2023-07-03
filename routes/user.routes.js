const { Router} = require("express");
const { Usermodel }=require("../models/User.model");
const jwt= require("jsonwebtoken");
const bcrypt= require("bcrypt");
require("dotenv").config()


const userController= Router();

userController.post("/signup",(req,res)=>{
    const {email,password,age}= req.body;
    // const hashed=bcrypt.hash(password,8);
    bcrypt.hash(password,8,async (err,hash)=>{
        if(err){
            res.send("Somethig went wrong. Please try")
        }
        const newuser= new Usermodel({
            email,
            password: hash,
            age
        })
        await newuser.save();
        res.json({message:"Signup Successfull"});
    })
   
})


userController.post("/login",async(req,res)=>{
    const {email,password}= req.body;
    const user= await Usermodel.findOne({email});
    const hash= user.password;
    // const hashed=bcrypt.hash(password,8);
    bcrypt.compare(password,hash,async (err,result)=>{
        if(err){
            res.send("Somethig went wrong. Please try")
        }
       if(result){
        const token= jwt.sign({userId: user._id},process.env.JWT_SECRET);
        res.status(200).json({message:"Login successful",token})
       }
       else{
        res.status(404).json({message:"Invalid Credentials try with proper credentials"})
       }
    })
   
})

module.exports ={
    userController
}