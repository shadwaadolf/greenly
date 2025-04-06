import { Router } from "express";
import { protect,isAdmin } from "../../middleware/authmiddleware.js";

import * as productServices from "./services/product.services.js";
const router = Router();

router.get("/allproducts",protect,isAdmin, productServices.getProduct);
router.post("/addproduct", productServices.createProduct);
router.get("/product/:id", productServices.getProductById);
router.put("/product/:id", productServices.updateProduct);
export default router;
