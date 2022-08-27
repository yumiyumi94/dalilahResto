const jwt = require('jsonwebtoken');

const { SECRET } = require('../config');

const validAuthentication = (req, res, next) => {
  const bearerToken = req.headers.authorization; // agarramos el token 

  if (!bearerToken) {
    res.status(401).json({ message: 'token is required' });
  } else {
    const token = bearerToken.split(' ')[1];
  
    if (token) {
      try {
        const decoded = jwt.verify(token, SECRET); // desarmamos el token
        req.user = decoded; // guardamos el user en request
        next(); // seguimos al siguiente middleware o endpoint
      } catch (error) {
        console.error(error);
        res.status(401).json({ message: 'invalid token' });
      }
    }else {
      res.status(401).json({ message: 'token is required' });
    }
  }
};

module.exports = validAuthentication;