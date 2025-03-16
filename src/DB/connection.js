import mongoose from 'mongoose'

export const connectDB= async ()=>{
    await mongoose.connect('mongodb://localhost:27017/saturdaySaraha0').then(res => {
        console.log("db connected" , res)
    }).catch(err=>{
        console.error('fail to connect to DB',err)
    })
}