const express = require('express');
const checkAdmin = require('../middleware/checkAdmin');

const {
  getAllProducts, createProduct, updateProduct,
  deleteProduct, getProduct
} = require('../models/products');

const productRouter = express.Router();

productRouter.get('/', async (req, res, next) => {
  const products = await getAllProducts();
  res.send({ message: 'success', data: products });
});

productRouter.get('/:id', async (req, res, next) => {
  const id = parseInt(req.params.id);
  const product = await getProduct(id);

  if (product) {
    res.send({ message: 'success', data: product });
  } else {
    res
      .status(404)
      .json({ message: 'product not found'});
  }
});

productRouter.post('/', checkAdmin, async (req, res, next) => {
  const newProduct = req.body;
  const productSaved = await createProduct(newProduct);

  if (productSaved) {
    res.send({
      message: 'product created successfuly',
      data: productSaved
    });
  } else {
    res
      .status(404)
      .json({ message: 'product creation wrongt'});
  }
});

productRouter.put('/:id', checkAdmin, async (req, res, next) => {
  const productUpdate = req.body;
  const productId = parseInt(req.params.id);

  const productSaved = await updateProduct(productId, productUpdate, true);
  
  if(productSaved) {
    res.send({
      message: 'product updated successfuly',
      data: productSaved
    });
  } else {
    res
      .status(404)
      .json({ message: 'product update wrongt'});
  }
});

productRouter.delete('/:id', checkAdmin, async (req, res, next) => {
  const id = parseInt(req.params.id);

  const productIdDeleted = await deleteProduct(id);

  if (productIdDeleted) {
    res.send({
      message: 'product delete successfuly',
      data: {
        id: productIdDeleted
      }
    });
  } else {
    res
      .status(404)
      .json({ message: 'product delete wrongt'});
  }
});

module.exports = productRouter;