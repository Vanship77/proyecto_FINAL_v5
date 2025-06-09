const User = require('../models/userModel');
const bcrypt = require('bcrypt');

exports.registerLocal = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email, provider: 'local' });
    if (existingUser) return res.status(400).json({ message: 'Ya existe el usuario' });

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      provider: 'local',
    });

    await user.save();
    res.status(201).json({ message: 'Usuario creado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
};
