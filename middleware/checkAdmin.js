const checkAdmin = (req, res, next) => {
    // si no es administrador
    if (req.user.admin === 0) {
      res
        .status(401)
        .json({ message: 'unauthorized' });
  
    } else {
      // si es admin podes seguir siguiente endpoint o middleware
      next();
    }
  };
  
  module.exports = checkAdmin;