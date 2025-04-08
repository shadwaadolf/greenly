import userModel from "../../../DB/model/User.model.js";

export const userList = async (req, res, next) => {
  try {
    const user = await userModel.find({});
    return res.status(200).json({ message: "done", user });
  } catch (error) {
    return res
      .status(500)
      .json({
        message: "server error",
        error,
        msg: error.message,
        stack: error.stack,
      });
  }
};
