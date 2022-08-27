require('dotenv').config();
const { QueryTypes } = require('sequelize');
const sequelize = require('../models/conection');

const CREATE_PRODUCT_TABLE = `
  CREATE TABLE productos (
    id INT NOT NULL AUTO_INCREMENT ,
    nombre VARCHAR(255) NOT NULL ,
    precio VARCHAR(255) NOT NULL ,
    descripcion VARCHAR (255) NOT NULL,
    PRIMARY KEY (id)
  ) ENGINE = InnoDB;`;

const CREATE_USER_TABLE = `
  CREATE TABLE usuarios (
    id INT NOT NULL AUTO_INCREMENT,
    contrasena VARCHAR(255) NOT NULL,
    mail VARCHAR(45) NOT NULL,
    usuario VARCHAR(45) NOT NULL,
    direccion VARCHAR(255) NOT NULL DEFAULT 0,
    telefono INT NOT NULL DEFAULT 0,
    admin TINYINT NOT NULL DEFAULT 0,
    PRIMARY KEY (id));
`;

const CREATE_ORDER_TABLE = `
  CREATE TABLE orders (
    id INT NOT NULL AUTO_INCREMENT,
    idUsuario INT NULL,
    total VARCHAR(45) NULL,
    PRIMARY KEY (id),
    INDEX idUsuario_idx (idUsuario ASC) VISIBLE,
    CONSTRAINT idUsuario
      FOREIGN KEY (idUsuario)
      REFERENCES usuarios (id)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION);
`;

const CREATE_ORDER_PRODUCT_TABLE = `
  CREATE TABLE order_product (
    id INT NOT NULL AUTO_INCREMENT,
    order_id INT NOT NULL,
    idProducto INT NOT NULL,
    quantity INT NULL,
    PRIMARY KEY (id),
    INDEX order_id_idx (order_id ASC) VISIBLE,
    INDEX idProducto_idx (idProducto ASC) VISIBLE,
    CONSTRAINT order_id
      FOREIGN KEY (order_id)
      REFERENCES orders (id)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION,
    CONSTRAINT idProducto
      FOREIGN KEY (idProducto)
      REFERENCES productos (id)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION);
`;

const INSERT_PRODUCT_1 = `
  INSERT INTO productos
  (nombre, precio, descripcion)
  VALUES
  ('hamburguesa', '100', 'Pan, carne, queso, lechuga, tomate y salsas');
`;

const INSERT_PRODUCT_2 = `
  INSERT INTO productos
  (nombre, precio, descripcion)
  VALUES
  ('papas fritas', '80', 'papas fritas con sal');
`;

const INSERT_USER_1 = `
INSERT INTO usuarios
(contrasena, mail, usuario, direccion, telefono)
VALUES
('$2b$10$sRQmBqExMXxoXbSFVB.9BuHC7efpmKram9l1E4l7cnvOjQ5lc2w3u', 'user@mail.com', 'user', 'casa usuario 1', '3215432');
`;

const INSERT_USER_2 = `
INSERT INTO usuarios
(contrasena, mail, usuario, direccion, telefono, admin)
VALUES
('$2b$10$/HJ9SfJ3HgsTEcqBnwBm2OdGXsTplyFxIE34QO2jRhRQR4x0BSkzi', 'admin@mail.com', 'admin', 'casa administrado', '4321578', 1);
`;

const DROP_USER_TABLE = `DROP TABLE IF EXISTS usuarios;`
const DROP_PRODUCT_TABLE = `DROP TABLE IF EXISTS productos;`
const DROP_ORDER_TABLE = `DROP TABLE IF EXISTS orders;`
const DROP_ORDER_PRODUCT_TABLE = `DROP TABLE IF EXISTS order_product;`

const createTables = async () => {
  try {
    await sequelize.query(CREATE_PRODUCT_TABLE);
    await sequelize.query(CREATE_USER_TABLE);
    await sequelize.query(CREATE_ORDER_TABLE);
    await sequelize.query(CREATE_ORDER_PRODUCT_TABLE);
    console.log('tables products, users, orders and order_product created successfuly');
  } catch (error) {
    console.error('Error: ', error);
  }
};

const insertData = async () => {
  try {
    await sequelize.query(INSERT_PRODUCT_1, { type: QueryTypes.INSERT });
    await sequelize.query(INSERT_PRODUCT_2, { type: QueryTypes.INSERT });
    await sequelize.query(INSERT_USER_1, { type: QueryTypes.INSERT });
    await sequelize.query(INSERT_USER_2, { type: QueryTypes.INSERT });
    console.log('Products and userts inserted successfuly');
  } catch (error) {
    console.error('Error: ', error);
  }
};

const deleteTables = async () => {
    try {
      await sequelize.query(DROP_ORDER_PRODUCT_TABLE);
      await sequelize.query(DROP_ORDER_TABLE);
      await sequelize.query(DROP_USER_TABLE);
      await sequelize.query(DROP_PRODUCT_TABLE);
      console.log('tables products, users, orders and order_product deleted successfuly');
    } catch (error) {
      console.error('Error: ', error);
    }
  };
  
  const main = async () => {
    await deleteTables();
    await createTables();
    await insertData();
  };
  
  main();