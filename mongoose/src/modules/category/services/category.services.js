import category from "../../../DB/model/category.model.js";

export const createCategory=(req, res) => {
    try {
      const { name, description, image } = req.body;
      const Category = new category({ name, description, image });
     
      res.status(201).json(Category);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
};
  
export const getCategory = (req, res) => {
    try {
      const categories = category.find();
      res.status(200).json(categories);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};
  
export const getCategoryById = (req, res) => {
    try {
      const Category = category.findById(req.params.id);
      if (!Category) return res.status(404).json({ message: "Category not found" });
      res.status(200).json(Category);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
}