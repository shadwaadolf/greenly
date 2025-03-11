import mongoose from "mongoose";
import { Schema } from "mongoose";
const subCategorySchema = new Schema(
    {
        name: { type: String, required: true, unique: true },
        description: { type: String },
        categoryid: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true }
} , { timestamps: true }
);

const subCategory = mongoose.model("subCategory", subCategorySchema);

export default subCategory;