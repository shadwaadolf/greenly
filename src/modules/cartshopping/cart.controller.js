import { Router } from "express";
import * as cartServices from "./services/cart.services.js";
import { protect } from "../../middleware/authmiddleware.js";
const router = Router();

router.post("/addtocart", protect, cartServices.addToCart);
router.get("/getcart", protect, cartServices.getCart);
router.put("/updatecart", protect, cartServices.updateCart);
router.delete("/deletecart/productId", protect, cartServices.deleteCart);

export default router;
