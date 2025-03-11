import mongoose from "mongoose";
import { Schema } from "mongoose";
const categorySchema = new Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    description: { type: String, trim: true },
    image: { type: String },
  },
  { timestamps: true }
);

const category = mongoose.model("Category", categorySchema);

export default category;
