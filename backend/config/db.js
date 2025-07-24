import mongoose from "mongoose";

export const connectDB= async()=>{

  await mongoose.connect('mongodb+srv://deepikasingh:1318@cluster0.q4xej43.mongodb.net/food-del')
  .then(()=>console.log("DB connected"));
}