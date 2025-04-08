import * as categoryServices from "./services/category.services.js";
import { Router } from "express";
import { protect, isAdmin } from "../../middleware/authmiddleware.js";

const router = Router();

router.get("/allcategories", categoryServices.getCategory);
router.get("/category/:id", categoryServices.getCategoryById);
router.post("/addcategory", protect, isAdmin, categoryServices.createCategory);

export default router;
