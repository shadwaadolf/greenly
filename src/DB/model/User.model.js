import mongoose, { model, Schema } from "mongoose";

const roleTypes = {
  User: "User",
  Admin: "Admin",
  HR: "hr",
};

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 50,
    },
    email: {
      type: String,
      unique: true,
      requird: true,
    },

    password: {
      type: String,
      required: true,
    },
    phone: String,

    gender: {
      type: String,
      enum: ["male", "female"],
      default: "male",
    },
    image: String,
    DOB: Date,
    confirmEmail: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: Object.values(roleTypes),
      default: "User",
    },
  },
  { timestamps: true }
);

const userModel = mongoose.models.User || model("user", userSchema);
export default userModel;
