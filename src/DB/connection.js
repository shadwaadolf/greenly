import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb://localhost:27017/greenlasstt"
      // { serverSelectionTimeoutMS: 5000 }
    );

    console.log("db connected");
  } catch (err) {
    console.log("fail", err);
  }
};
