const express = require('express');
const router = express.Router();
const Mensaje = require('../models/Mensaje'); // <-- asegúrate que la ruta sea correcta

router.post('/mensajes', async (req, res) => {
  try {
    const nuevoMensaje = new Mensaje(req.body);
    await nuevoMensaje.save();
    res.status(201).json({ message: 'Mensaje guardado con éxito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al guardar el mensaje' });
  }
});

module.exports = router;
