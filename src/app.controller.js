import dotenv from "dotenv";
import { connectDB } from "../src/DB/connection.js";
import productRouter from "./modules/product/product.controller.js";
import categoryRouter from "./modules/category/category.controller.js";
import subCategoryRouter from "./modules/subCategories/subCategories.controller.js";
import authController from "./modules/auth/auth.controller.js";
import userController from "./modules/user/user.controller.js";
import cartRouter from "./modules/cartshopping/cart.controller.js";
const bootstrap = (app, express) => {
  app.use(express.json());
  app.get("/", (req, res) => {
    dotenv.config();
    return res.status(200).json({ message: "success" });
  });
  //salma

  app.use("/product", productRouter);
  app.use("/category", categoryRouter);
  app.use("/subCategory", subCategoryRouter);
  app.use("/auth", authController);
  app.use("/user", userController);
  app.use("/cart", cartRouter);
  app.all("*", (req, res) => {
    return res.status(404).json({ message: "Not found" });
  });
  connectDB();
};

export default bootstrap;
