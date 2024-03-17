const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");
const SECERT_KEY="NOTE_API";

const signup = async (req,res)=>{

    const {username, email, password} = req.body;//input
    try{
        // Existing User check
        const existingUser= await userModel.findOne({email:email});
        if(existingUser){
            return res.status(500).json({
                message : "User already exists!!"
            })
        }

        //Hashed Password
        const hashedPassword = await bcrypt.hash(password,10);

        //User Creation
        const result = await userModel.create({
            email: email,
            password : hashedPassword,
            username : username
        });

        //Token Generation

        const token = jwt.sign({email:result.email, id: result._id},SECERT_KEY);
        res.status(201).json({user: result, token: token});


    }catch(error) {
        console.log(error);
        res.status(500).json({message: "Something went Wrong!!"})
    }






}

const signin = async (req,res)=>{

    const {email,password}= req.body;
    try{

        const existingUser =  await userModel.findOne({email:email});

        if(!existingUser){
           return res.status(404).json({message: "User not found!!"});
        }

        const matchPassword =  await bcrypt.compare(password,existingUser.password);

        if(!matchPassword){
            return res.status(400).json({message: "Invalid Credentials!!"});
        }

        const token = jwt.sign({email:existingUser.email,id:existingUser._id},SECERT_KEY);
        res.status(200).json({user: existingUser, token: token});

    }catch(error){

        console.log(error);
        res.status(500).json({message: "Something went Wrong!!"})
    }
    
}


module.exports={signin,signup}