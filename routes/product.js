const express = require("express");
const upload = require("../libs/storage");
const {
  addProduct,
  getProducts,
  getOneProduct,
  updateProduct,
  deleteProduct
} = require("../controllers/productController");
const api = express.Router();

api.post("/products", upload.single("image"), addProduct);
api.get("/products", getProducts);
api.get("/products/:productId", getOneProduct);
api.put("/products/:productId", updateProduct);
api.delete("/products/:productId", deleteProduct);

module.exports = api;
