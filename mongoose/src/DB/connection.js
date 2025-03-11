import mongoose from "mongoose";

export const connectDB = async() => {
  await mongoose
    .connect("mongodb://localhost:27017/greenly", { serverSelectionTimeoutMS: 5000 })
    .then((res) => {
      console.log("db connected");
    })
    .catch((err) => {
      console.log("fail", err);
    });
};
