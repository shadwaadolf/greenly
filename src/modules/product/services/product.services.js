import Product from "../../../DB/model/product.model.js";
import Category1 from "../../../DB/model/category.model.js";
import SubCategory1 from "../../../DB/model/subCategories.model.js";

export const createProduct = async (req, res) => {
  try {
    const {
      name,
      longdescription,
      shortdescription,
      price,
      categoryid, // This is coming from the request body
      subcategoryid,
      stock,
      image,
    } = req.body;

    const existofcategory = await Category1.findById(categoryid);
    console.log(existofcategory);
    if (!existofcategory)
      return res.status(404).json({ message: "Category not found" });
    const existingSubcategory = await SubCategory1.findById(subcategoryid);
    if (!existingSubcategory)
      return res.status(400).json({ message: "Invalid Subcategory ID" });

    const existingProduct = await Product.findOne({ name });
    if (existingProduct) {
      return res.status(400).json({ message: "Product already exists" });
    }

    const product = new Product({
      name,
      longdescription,
      shortdescription,
      price,
      category: categoryid,
      subCategory: subcategoryid,
      stock,
      image,
    });

    await product.save();

    return res.status(201).json({ message: "Product created successfully" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const getProduct = async (req, res) => {
  try {
    const products = await Product.find().populate(
      "category",
      "shortdescription"
    );

    res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "category",
      "shortdescription"
    );

    if (!product) return res.status(404).json({ message: "Product not found" });

    res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!product) return res.status(404).json({ message: "Product not found" });

    res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
