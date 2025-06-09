// middlewares/checkRole.js
const User = require('../models/userModel');


const checkRole = (requiredRole) => {
  return async (req, res, next) => {
    if (!req.isAuthenticated() || !req.session.user) {
      return res.status(401).json({ message: 'No autenticado' });
    }

    try {
      const user = await User.findById(req.session.user._id);
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }

      if (user.role !== requiredRole) {
        return res.status(403).json({ message: 'Acceso denegado' });
      }

      next();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error del servidor' });
    }
  };
};

module.exports = checkRole;
