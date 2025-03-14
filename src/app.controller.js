import { connectDB } from "../src/DB/connection.js";
import productRouter from "./modules/product/product.controller.js";
import categoryRouter from "./modules/category/category.controller.js";
import subCategoryRouter from "./modules/subCategories/subCategories.controller.js";

const bootstrap = (app, express) => {
  app.use(express.json());
  app.get("/", (req, res) => {
    return res.status(200).json({ message: "success" });
  });

  app.use("/product", productRouter);
  app.use("/category", categoryRouter);
  app.use("/subCategory", subCategoryRouter);
  app.all("*", (req, res) => {
    return res.status(404).json({ message: "Not found" });
  });
  connectDB();
};

export default bootstrap;
