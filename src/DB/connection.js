// <<<<<<< HEAD
import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb://localhost:27017"
      // { serverSelectionTimeoutMS: 5000 }
    );
    console.log("db connected");
  } catch (err) {
    console.log("fail", err);
  }
};
// >>>>>>> 791278a4638196eebb9ec290a9926db209cd791c
