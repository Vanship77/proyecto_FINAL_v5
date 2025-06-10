const User = require('../models/userModel');

// Registro de usuario con imagen
const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, confirmPassword } = req.body;

    // Validaciones básicas
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Las contraseñas no coinciden' });
    }

    // Verificar si ya existe un usuario con ese correo
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'El correo ya está registrado' });
    }

    // Construir la URL pública de la imagen si fue subida
    let photoUrl = null;
    if (req.file) {
      photoUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    }

    // Crear nuevo usuario
    const newUser = new User({
      firstName,
      lastName,
      email,
      password, // ⚠️ Recomiendo hashear con bcrypt en producción
      photoUrl,
      provider: 'local',
    });

    await newUser.save();

    return res.status(201).json({
      message: 'Usuario registrado con éxito',
      user: {
        id: newUser._id,
        firstName: newUser.firstName,
        email: newUser.email,
        photoUrl: newUser.photoUrl,
      }
    });

  } catch (error) {
    console.error('Error en registerUser:', error);
    return res.status(500).json({ message: 'Error del servidor al registrar usuario' });
  }
};

module.exports = {
  registerUser,
};
