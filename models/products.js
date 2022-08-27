const { QueryTypes } = require('sequelize');
const sequelize = require('./conection');

const getProduct = async (id) => {
  try {
    const [productEncontrado] = await sequelize.query(
      `SELECT * FROM productos WHERE id = ${id};`,
      { type: QueryTypes.SELECT }
    );
    return productEncontrado || null;
  } catch (error) {
    console.error('ERROR');
    return null;
  }
};

const getAllProducts = async () => {
  try {
    const products = await sequelize.query(`SELECT * FROM productos;`, { type: QueryTypes.SELECT });
    return products;
  } catch (error) {
    console.error('ERROR');
    return [];
  }
};

const createProduct = async (product) => {
  // si el producto tiene name y price
  if(product.name && product.price) {
    try {
      const [productId] = await sequelize.query(
        `INSERT INTO productos
        (name, price)
        VALUES
        ('${product.name}', '${product.price}');`,
        { type: QueryTypes.INSERT }
      );
      const productSaved = {
        id: productId,
        ...product
      };
      return productSaved;
    } catch (error) {
      console.error('ERROR: ', error);
      return null;
    }
  } else {
    return null;
  }
};

// UPDATE `resto`.`products` SET `price` = '120' WHERE (`id` = '1');

const updateProduct = async (id, product) => {
  // si no hay name o no price no hay nada que actualizar
  if (!product.name || !product.price) {
    return null;
  }

  try {
    await sequelize.query(
      `UPDATE productos
      SET price = '${product.price}', name = '${product.name}'
      WHERE (id = ${id});`,
      { type: QueryTypes.UPDATE }
    );

    const productSaved = {
      id,
      ...product
    };
    return productSaved;
  } catch (error) {
    console.error('ERROR: ', error);
    return null;
  }
};

const deleteProduct = async (id) => {
  try {
    await sequelize.query(
      `DELETE FROM productos WHERE id = ${id};`,
      { type: QueryTypes.DELETE }
    );
    return id;
  } catch (error) {
    console.error('ERROR');
    return null;
  }
};

module.exports = {
  createProduct,
  deleteProduct,
  getProduct,
  getAllProducts,
  updateProduct
};