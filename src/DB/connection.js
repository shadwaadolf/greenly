// <<<<<<< HEAD
import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    console.log("x11");
    await mongoose.connect(
      "mongodb://localhost:27017"
      // { serverSelectionTimeoutMS: 5000 }
    );
    console.log("x1");

    console.log("db connected");
  } catch (err) {
    console.log("x2");
    console.log("fail", err);
  }
  console.log("x3");
};
// >>>>>>> 791278a4638196eebb9ec290a9926db209cd791c
