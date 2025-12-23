const productModel = require("../models/product.model");

async function createProduct(req, res) {
  const {
    image,
    name,
    description,
    price: { amount, currency },
  } = req.body;

  try {
    const product = await productModel.create({
      image,
      name,
      description,
      price: { amount, currency },
    });
    res.status(201).json({ message: "Product created successfully", product });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Internal Server Error", error: err.message });
  }
}

async function getItem(req, res) {
  try {
    const product = await productModel.findOne();
    res
      .status(200)
      .json({ message: "Product retrieved successfully", product });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Internal Server Error", error: err.message });
  }
}

module.exports = {
  createProduct,
  getItem,
};
