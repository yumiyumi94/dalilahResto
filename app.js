
const express = require('express');
const logger = require('morgan');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
require('dotenv').config();

// routers
const authUserRouter = require('./routes/authUsers');
const productRouter = require('./routes/products');
const orderRouter = require('./routes/orders');
const userRouter = require('./routes/users');
const validAuthentication = require('./middleware/auth');

// inicio de api
var app = express();

// middlewares
app.use(logger('dev')); // logeo de request a modo dev con libreria morgan
app.use(express.json()); // configura un header para que leer y returar jsons
app.use(express.urlencoded({ extended: false })); // encodear la url que recibe el endpoint

// documentation
const swaggerDocument = YAML.load('./spec.yml');
// const swaggerDocumentPets = YAML.load('./pet-docs.yml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// router publicos
app.use('/authUsers', authUserRouter);

// middleware de autenticacion
app.use(validAuthentication);

// router privados, con autenticacion
app.use('/products', productRouter);
app.use('/orders', orderRouter);
app.use('/users', userRouter);



module.exports = app;