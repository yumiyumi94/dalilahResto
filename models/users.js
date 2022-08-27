const bcrypt = require('bcryptjs');
const { QueryTypes } = require('sequelize');

const sequelize = require('./conection');
const saltRounds = 10;

const getUser = async (mail, password) => {
  try {
    const [userEncontrado] = await sequelize.query(
      `SELECT * FROM usuarios WHERE mail = '${mail}';`,
      {type: QueryTypes.SELECT}
    );
    if(!userEncontrado){
      return null;
    }

    const isPassCorrect = await bcrypt.compare(password, userEncontrado.contrasena);

    if(!isPassCorrect){
      return null; 
    }

    delete userEncontrado.password;

    return userEncontrado;
  } catch (error) {
    console.error('ERROR: ', error);
    return null; 
  }
};

const getAllUsers = async () => {
  try {
    const users = await sequelize.query(`SELECT * FROM usuarios;`, {type: QueryTypes.SELECT});
    return users;
  } catch (error) {
    console.error('ERROR: ', error);
    return [];
  }
};

const createUser = async (user) => {
  if (!(user.mail || user.usuario || user.contrasena)) {
    return null;
  }

  try {
    const [yaExisteElUsuario] = await sequelize.query(
      `SELECT * FROM usuarios WHERE mail = '${user.mail}';`,
      {type: QueryTypes.SELECT}
    );

    if(yaExisteElUsuario){
      return null;
    }

    const password = user.contrasena;
    const hash = await bcrypt.hash(password, saltRounds);

    const [userId] = await sequelize.query(
      `INSERT INTO usuarios
      (usuario, mail, contrasena)
      VALUES
      ('${user.usuario}', '${user.mail}', '${hash}');`,
      {type: QueryTypes.INSERT}
    );

    const userSaved = {
      id: userId,
      user: user.usuario,
      mail: user.mail
    };

    return userSaved;
  } catch (error) {
    console.error('ERROR: ', error);
  }
};

const getUserById = async (id) => {
  try {
    const [userEncontrado] = await sequelize.query(
      `SELECT id, usuario, mail, admin FROM usuarios WHERE id = ${id};`,
      { type: QueryTypes.SELECT }
    );
    return userEncontrado || null;
  } catch (error) {
    console.error('ERROR', error);
    return null;
  }
};

const updateUser = async (id, user) => {
  // si no hay user o no password no hay nada que actualizar
  if (!user.user || !user.password) {
    return null;
  }

  try {
    const hash = await bcrypt.hash(user.password, saltRounds);

    await sequelize.query(
      `UPDATE usuarios
      SET usuario = '${user.user}', contrasena = '${hash}'
      WHERE (id = ${id});`,
      { type: QueryTypes.UPDATE }
    );

    const userSaved = {
      id,
      user: user.user
    };
    return userSaved;
  } catch (error) {
    console.error('ERROR: ', error);
    return null;
  }
};

const deleteUser = async (id) => {
  try {
    await sequelize.query(
      `DELETE FROM usuarios WHERE id = ${id};`,
      { type: QueryTypes.DELETE }
    );
    return id;
  } catch (error) {
    console.error('ERROR', error);
    return null;
  }
};
// const modulos = {
//   getUser: getUser,
//   getAllUsers: getAllUsers
// };

// module.exports = modulos;

// es igual a
module.exports = {
  getUser, getAllUsers, createUser,
  getUserById, updateUser, deleteUser
};