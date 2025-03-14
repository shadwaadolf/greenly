import { Router } from "express";

import * as subCategoryServices from "./services/subCategories.services.js";
const router = Router();

router.get("/allsubcategories", subCategoryServices.getSubCategory);
router.get("/subCategory/:id", subCategoryServices.getSubCategoryById);
router.post("/addsubCategory", subCategoryServices.createSubCategory);

export default router;
