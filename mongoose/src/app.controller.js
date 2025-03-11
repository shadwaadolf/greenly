import { connectDB } from "../src/DB/connection.js";
import product from "./modules/product/product.controller.js";
import category from "./modules/category/category.controller.js";
import subCategory from "./modules/subCategories/subCategories.controller.js";
const bootstrap = (app, express) => {
  app.use(express.json());
  app.get("/", (req, res) => {
    return res.status(200).json({ message: "success" });
  });

  app.use("/product", product);
  app.use("/category", category);
  app.use("/subCategory", subCategory);
  app.all("*", (req, res) => {
    return res.status(404).json({ message: "Not found" });
  });
  connectDB();
};
export default bootstrap;
