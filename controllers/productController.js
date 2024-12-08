const Product = require("../models/Product");
const mongoose = require("mongoose");

// ---------------------------------- AGREGAR UN PRODUCTO
async function addProduct(req, res) {
  try {
    const { name, type, description } = req.body;

    const product = Product({
      name,
      type,
      description,
    });

    if (req.file) {
      const { filename } = req.file;
      product.setImgUrl(filename);
    }

    const productStored = await product.save();
    res.status(201).send({ productStored });
  } catch (e) {
    res.status(500).send({ msg: e.message });
  }
}

// -------------------------------------- OBTENER PRODUCTOS
async function getProducts(req, res) {
  const products = await Product.find();
  res.status(200).send(products);
}

// -------------------------------------- OBTENER UN SOLO PRODUCTO POR ID
async function getOneProduct(req, res) {
  try {
    const productId = req.params.productId;

    // Validar si es un ObjectId válido de mongoDB
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).send({ message: "ID de producto no válido." });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).send({ message: "El producto no existe." });
    }

    res.status(200).send( product );
  } catch (err) {
    res.status(500).send({ message: `Error al realizar la petición: ${err}` });
  }
}

// --------------------------------------- ELIMINAR UN PRODUCTO
async function deleteProduct(req, res) {
  try {
    const productId = req.params.productId;

    // Validar si es un ObjectId válido de mongoDB
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).send({ message: "ID de producto no válido." });
    }

    const product = await Product.findByIdAndDelete(productId);
    if (!product) {
      return res.status(404).send({ message: "El producto no existe." });
    }

    res.status(200).send({
      message: `El producto con el id ${productId} ha sido eliminado.`,
    });
  } catch (err) {
    res.status(500).send({ message: `Error al realizar la petición: ${err}` });
  }

}

// --------------------------------------- ACTIALIZAR UN PRODUCTO
async function updateProduct(req, res) {
   try {
    const productId = req.params.productId;
    const update = req.body;

    // Validar si es un ObjectId válido
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).send({ message: "ID de producto no válido." });
    }

    const productUpdated = await Product.findByIdAndUpdate(productId, update, {
      new: true,
    });

    res.status(200).send({ product: productUpdated });
  } catch (err) {
      res.status(500).send({ message: `Error al actualizar el producto: ${err}` });
  }
}

module.exports = {
  addProduct,
  getProducts,
  getOneProduct,
  deleteProduct,
  updateProduct,
};
