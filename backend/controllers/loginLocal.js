// controllers/loginController.js
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const JWT_SECRET = process.env.JWT_SECRET || 'secreto_super_seguro';

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Correo y contraseña obligatorios' });
    }

    const user = await User.findOne({ email });
    if (!user || password !== user.password) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role || 'user' },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    // Establecer cookie httpOnly
    res.cookie('jwt_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // HTTPS en producción
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000 // 24 horas
    });

    res.status(200).json({
      message: 'Login exitoso',
      user: {
        id: user._id,
        firstName: user.firstName,
        email: user.email,
        photoUrl: user.photoUrl,
        role: user.role
      }
    });

  } catch (error) {
    console.error('Error en loginUser:', error);
    res.status(500).json({ message: 'Error del servidor al iniciar sesión' });
  }
};

// controllers/loginController.js
const logoutUser = (req, res) => {
  // Borrar cookie JWT
  res.clearCookie('jwt_token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });

  // Logout de Passport (con callback)
  if (req.logout) {
    req.logout(err => {
      if (err) {
        console.error('Error al hacer logout con Passport:', err);
        return res.status(500).json({ message: 'Error al cerrar sesión' });
      }

      // Destruir sesión (opcional si usas sesiones)
      req.session?.destroy?.();

      return res.status(200).json({ message: 'Logout exitoso' });
    });
  } else {
    // Si no estás usando Passport
    req.session?.destroy?.();
    res.status(200).json({ message: 'Logout exitoso' });
  }
};

module.exports = { loginUser, logoutUser, };