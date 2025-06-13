const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');

const JWT_SECRET = process.env.JWT_SECRET || 'secreto_super_seguro';

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Correo y contraseña obligatorios' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // Aquí comparación directa sin bcrypt porque no está hasheada
    if (password !== user.password) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // Generar JWT como antes
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role || 'user' },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      message: 'Login exitoso',
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        email: user.email,
        photoUrl: user.photoUrl,
        role:user.role
      }
    });

  } catch (error) {
    console.error('Error en loginUser:', error);
    res.status(500).json({ message: 'Error del servidor al iniciar sesión' });
  }
};

module.exports = { loginUser };
