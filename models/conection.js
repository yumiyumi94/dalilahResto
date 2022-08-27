const Sequelize = require('sequelize');
const {
  DB_HOST, DB_PASSWORD, DB_PORT,
  DB_USER, DB_NAME
} = require('../config');

const path = `mysql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;

const sequelize = new Sequelize(path, { operatorsAliases: false });

sequelize.authenticate()
  .then(() => console.log('Conectado a MYSQL'))
  .catch((error) => console.error('Error: ', error));

module.exports = sequelize;