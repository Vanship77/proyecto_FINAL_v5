// middlewares/hybridAuth.js
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const JWT_SECRET = process.env.JWT_SECRET || 'secreto_super_seguro';

const hybridAuth = async (req, res, next) => {
  try {
    // Verificar OAuth primero
    if (req.isAuthenticated && req.isAuthenticated() && req.session.user) {
      console.log('Usuario autenticado via OAuth');
      return next();
    }

    // Si no hay OAuth, verificar JWT desde cookie
    const token = req.cookies.jwt_token;

    if (!token) {
      return res.status(401).json({ message: 'Token de acceso requerido' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId);
    
    if (!user) {
      return res.status(401).json({ message: 'Usuario no encontrado' });
    }

    req.user = user;
    req.session = req.session || {};
    req.session.user = user;
    
    console.log('Usuario autenticado via JWT Cookie');
    next();

  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expirado' });
    }
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Token inválido' });
    }
    
    console.error('Error en hybridAuth:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

module.exports = { hybridAuth };