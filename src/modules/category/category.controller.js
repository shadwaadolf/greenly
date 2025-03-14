import * as categoryServices from "./services/category.services.js";
import { Router } from "express";

const router = Router();

router.get("/allcategories", categoryServices.getCategory);
router.get("/category/:id", categoryServices.getCategoryById);
router.post("/addcategory", categoryServices.createCategory);

export default router;
