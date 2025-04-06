// import userModel from "../../../DB/model/User.model.js";

// import * as bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// //import cart from '../../../DB/model/cartShopping.model.js'

// const generateToken = (id, user) => {
//   const secret = process.env.JWT_SECRET;
//   if (!secret) {
//     throw new Error("JWT_SECRET is not configured in environment variables");
//   }
//   return jwt.sign({ _id: id,role: user.role }, process.env.JWT_SECRET, secret, {
//     expiresIn: "7d",
//   });
// };

// export const signup = async (req, res, next) => {
//   try {
//     const { userName, email, password, confirmPassword, role } = req.body;
//     //console.log({userName, email, password,confirmPassword})
//     if (password != confirmPassword) {
//       return res.status(400).json({ message: "password is not matching" });
//     }
//     if (await userModel.findOne({ email })) {
//       return res.status(409).json({ message: "This email already exists" });
//     }
//     const hashPassword = bcrypt.hashSync(password, 8);
//     const { _id } = await userModel.create({
//       userName,
//       email,
//       password: hashPassword,
//       role: role || "User",
//     });
//     const token = generateToken(_id, false);
//     return res.status(201).json({ message: "Done", user: _id, token });
//   } catch (error) {
//     if (
//       error.message === "JWT_SECRET is not configured in environment variables"
//     ) {
//       return res.status(500).json({
//         message: "Server configuration error",
//         error: "JWT secret is not configured",
//       });
//     }
//     return res.status(500).json({
//       message: "error",
//       error,
//       err: error.message,
//       stack: error.stack,
//     });
//   }
// };

// export const login = async (req, res, next) => {
//   try {
//     const { email, password } = req.body;
//     //console.log({userName, email, password,confirmPassword})
//     const user = await userModel.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ message: "Invalid email or password" });
//     }
//     const matchPass = bcrypt.compareSync(password, user.password);
//     if (!matchPass) {
//       return res.status(404).json({ message: "Invalid email or password" });
//     }
//     try {
//       const token = generateToken(user._id, user.role);
//       return res.status(200).json({ user, token });
//     } catch (tokenError) {
//       if (
//         tokenError.message ===
//         "JWT_SECRET is not configured in environment variables"
//       ) {
//         return res.status(500).json({
//           message: "Server configuration error",
//           error: "JWT secret is not configured",
//         });
//       }
//       throw tokenError;
//     }
//   } catch (error) {
//     return res.status(500).json({
//       message: "error",
//       error,
//       err: error.message,
//       stack: error.stack,
//     });
//   }
// };
import userModel from "../../../DB/model/User.model.js";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Generate JWT token function
const generateToken = (id, role) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not configured in environment variables");
  }
  return jwt.sign({ _id: id, role }, secret, {
    expiresIn: "7d",
  });
};

// Signup function
export const signup = async (req, res, next) => {
  try {
    const { userName, email, password, confirmPassword, role } = req.body;

    // Check password confirmation
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Password does not match" });
    }

    // Check if the email already exists
    if (await userModel.findOne({ email })) {
      return res.status(409).json({ message: "This email already exists" });
    }

    // Hash the password
    const hashPassword = bcrypt.hashSync(password, 8);

    // Create new user with role (default to "user" if not specified)
    const userRole = role?.toLowerCase() === "admin" ? "admin" : "user";

    const newUser = await userModel.create({
      userName,
      email,
      password: hashPassword,
      role: userRole,
    });

    // Generate token with role
    const token = generateToken(newUser._id, userRole);

    return res.status(201).json({
      message: "User created successfully",
      user: {
        _id: newUser._id,
        userName: newUser.userName,
        email: newUser.email,
        role: newUser.role,
      },
      token,
    });
  } catch (error) {
    if (
      error.message === "JWT_SECRET is not configured in environment variables"
    ) {
      return res.status(500).json({
        message: "Server configuration error",
        error: "JWT secret is not configured",
      });
    }
    return res.status(500).json({
      message: "Error",
      error: error.message,
      stack: error.stack,
    });
  }
};

// Login function
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Invalid email or password" });
    }

    // Check if password matches
    const matchPass = bcrypt.compareSync(password, user.password);
    if (!matchPass) {
      return res.status(404).json({ message: "Invalid email or password" });
    }

    // Generate token with user's role
    const token = generateToken(user._id, user.role);

    return res.status(200).json({
      user: {
        _id: user._id,
        userName: user.userName,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error",
      error: error.message,
      stack: error.stack,
    });
  }
};
