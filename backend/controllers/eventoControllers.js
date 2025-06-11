const eventoModel = require('../models/eventoModel');

const getAllEventos = async (req, res) => {
    try {
        const eventos = await eventoModel.find();
        res.status(200).json(eventos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const getEventoById = async (req, res) => {
    try {
        const evento = await eventoModel.findById(req.params.id);
        if (!evento) {
            return res.status(404).json({ message: 'Evento not found' });
        }
        res.status(200).json(evento);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const createEvento = async (req, res) => {
  try {
    const { titulo, descripcion, fecha, lugar, precio } = req.body;

    // Validar campos requeridos
    if (!titulo || !fecha || !lugar || !precio) {
      return res.status(400).json({ message: 'Faltan campos obligatorios' });
    }

    // Verificar imagen subida
    if (!req.file) {
      return res.status(400).json({ message: 'La imagen es obligatoria' });
    }

    // Construir URL pública de la imagen
    const imagenUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

    // Crear el evento
    const nuevoEvento = new eventoModel({
      titulo,
      descripcion,
      fecha,
      lugar,
      precio,
      imagen: imagenUrl
    });

    const eventoGuardado = await nuevoEvento.save();

    res.status(201).json({
      message: 'Evento creado con éxito',
      evento: eventoGuardado
    });

  } catch (error) {
    console.error('Error al crear el evento:', error);
    res.status(500).json({ message: 'Error del servidor al crear evento' });
  }
};
const updateEventoById = async (req, res) => {
    try {
        const updatedEvento = await eventoModel.findByIdAndUpdate(
            req.params.id,
            req.body, { new: true });

        if (!updatedEvento) {
            return res.status(404).json({ message: 'Evento not found' });
        }
        res.status(200).json(updatedEvento);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
const deleteEventoById = async (req, res) => {
    try {
        const deletedEvento = await eventoModel.findByIdAndDelete(req.params.id);
        if (!deletedEvento) {
            return res.status(404).json({ message: 'Evento not found' });
        }
        res.status(200).json({ message: 'Evento deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getAllEventos,
    getEventoById,
    createEvento,
    updateEventoById,
    deleteEventoById
};
//just for changes