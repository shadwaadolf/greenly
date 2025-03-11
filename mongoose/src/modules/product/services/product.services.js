import category from "../../../DB/model/category.model.js";
import Product from "../../../DB/model/product.model.js";

export const createProduct = (req, res) => {
  try {
    const { name, description, price, categoryId, stock, image } = req.body;

    // Check if category exists
    const Category1 = category.findById(categoryId);
    if (!Category1)
      return res.status(404).json({ message: "Category not found" });
    const product1 = new Product({
      name,
      description,
      price,
      category: categoryId,
      stock,
      image,
    });

    return res.status(201).json({ message: "Product created successfully" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const getProduct = (req, res) => {
  try {
    const products = Product.find().populate("category", "shortdescription");
    res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const getProductById = (req, res) => {
  try {
    const product = Product.findById(req.params.id).populate(
      "category",
      "shortdescription"
    );
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateProduct = (req, res) => {
  try {
    const product = Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
