import { Router } from "express";
import { protect, isAdmin } from "../../middleware/authmiddleware.js";

import * as productServices from "./services/product.services.js";
const router = Router();

router.get("/allproducts",  productServices.getProduct);
router.post("/addproduct",protect,isAdmin, productServices.createProduct);
router.get("/product/:id", productServices.getProductById);
router.put("/product/:id",protect,isAdmin, productServices.updateProduct);
export default router;
