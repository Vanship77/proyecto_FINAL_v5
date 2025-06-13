// middlewares/checkRole.js
const User = require('../models/userModel');

const checkRole = (requiredRole) => {
  return async (req, res, next) => {
    try {
      let user;

      // Si viene de OAuth
      if (req.session && req.session.user) {
        user = await User.findById(req.session.user._id);
      }
      // Si viene de JWT
      else if (req.user) {
        user = req.user;
      }

      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }

      if (user.role !== requiredRole) {
        return res.status(403).json({ message: 'Acceso denegado, permisos insuficientes' });
      }

      next();
    } catch (error) {
      console.error('Error en checkRole:', error);
      return res.status(500).json({ message: 'Error del servidor' });
    }
  };
};

module.exports = checkRole;