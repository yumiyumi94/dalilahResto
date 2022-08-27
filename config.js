const SECRET = 'acamica_secret';
const DB_USER = process.env.DB_USER;
const DB_PASSWORD  = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;
const PORT = process.env.PORT;
const DB_NAME = process.env.DB_NAME;

console.log( {
  SECRET,
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  DB_NAME,
  PORT
});

module.exports = {
  SECRET,
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  DB_NAME,
  PORT
};