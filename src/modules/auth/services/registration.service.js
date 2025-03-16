import userModel from '../../../DB/model/User.model.js'
import Users from "../../../DB/model/User.model.js"
import * as bcrypt from "bcrypt"


export const signup = async (req,res,next)=>{
    try{
        const{userName, email, password,confirmPassword}=req.body
        //console.log({userName, email, password,confirmPassword})
        if(password!=confirmPassword){
            return res.status(400).json({message:"password is not matching"})
        }
        if(await userModel.findOne({email})){
            return res.status(409).json({message:"This email already exists"})
        } 
        const hashPassword = bcrypt.hashSync(password, 8)
        const {_id}=await userModel.create({userName,email,password:hashPassword})
        return res.status(201).json({message:"Done",user:_id})
    }catch(error){
        return res.status(500).json({message:'error',error, err:error.message, stack:error.stack})
    }
}


export const login = async (req,res,next)=>{
    try{
        const{email, password}=req.body
        //console.log({userName, email, password,confirmPassword})
        const user=await userModel.findOne({email})
        if(!user){
            return res.status(404).json({message:"Invalid email or password"})
        } 
        const matchPass = bcrypt.compareSync(password, user.password)
        if(!matchPass){
            return res.status(404).json({message:"invalid email or password"})
        }
        return res.status(200).json({message:"Success",user})
    }catch(error){
        return res.status(500).json({message:'error',error, err:error.message, stack:error.stack})
    }
}