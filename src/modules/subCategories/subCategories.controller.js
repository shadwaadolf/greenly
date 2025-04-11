import { Router } from "express";
import { protect, isAdmin } from "../../middleware/authmiddleware.js";
import * as subCategoryServices from "./services/subCategories.services.js";
const router = Router();

router.get("/allsubcategories", subCategoryServices.getSubCategory);
router.get("/subCategory/:id", subCategoryServices.getSubCategoryById);
router.post("/addsubCategory",protect,isAdmin,subCategoryServices.createSubCategory);

export default router;
