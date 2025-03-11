import Subcategory from "../../../DB/model/subCategory.model.js";
import category from "../../../DB/model/category.model.js";

export const createSubCategory = (req, res) => {
  try {
    const { name, description, categoryId } = req.body;
    const Category = category.findById(categoryId);
    if (!Category)
      return res.status(404).json({ message: "Category not found" });
    const subCategory = new Subcategory({
      name,
      description,
      category: categoryId,
    });
    res.status(201).json(subCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const getSubCategory = (req, res) => {
  try {
    const subCategories = Subcategory.find().populate("category", "name");
    res.status(200).json(subCategories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSubCategoryById = (req, res) => {
  try {
    const subCategory = Subcategory.findById(req.params.id).populate(
      "category",
      "name"
    );
    if (!subCategory)
      return res.status(404).json({ message: "SubCategory not found" });
    res.status(200).json(subCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
