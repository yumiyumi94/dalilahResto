const express = require('express');
const jwt = require('jsonwebtoken');

const { SECRET } = require('../config');
const { getUser, createUser } = require('../models/users');

const authUserRouter = express.Router();

authUserRouter.post('/login', async (request, response, next) => {
  const user = await getUser(request.body.mail, request.body.contrasena);
  const body = console.log(request.body);

  // si el usuario existe
  if(user) {
    const token = jwt.sign(user, SECRET);

    response.send({ message: 'login success and token', token });
  } else {
    response.status(403).send({ message: 'user or password wrong', body});
  }
});

authUserRouter.post('/sign-up', async (request, response, next) => {
  console.log(request.body);
  const newUser = request.body;
  const userSaved = await createUser(newUser);

  if (userSaved) {
    response.send({ message: 'sign up success', data: userSaved });
  } else {
    response.status(404).json({ message: 'sign up wrongt'});
  }
});


module.exports = authUserRouter;