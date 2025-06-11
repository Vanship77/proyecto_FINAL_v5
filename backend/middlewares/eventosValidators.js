const { body, param, validationResult } = require('express-validator');

// Validar ID de Mongo
const validateEventoID = [
  param('id').isMongoId().withMessage('ID inválido'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
    console.log('ID de evento válido:', req.params.id);
    console.log('Validación de ID de evento completada');
  },
];

// Validar cuerpo para crear un evento
const validateCreateEventoBody = [
  body().notEmpty().withMessage('El cuerpo no puede estar vacío'),

  body('titulo')
    .isString().withMessage('El título debe ser un texto')
    .isLength({ min: 3, max: 100 }).withMessage('El título debe tener entre 3 y 100 caracteres'),

  body('descripcion')
    .optional()
    .isString().withMessage('La descripción debe ser un texto')
    .isLength({ max: 100 }).withMessage('La descripción no puede tener más de 100 caracteres'),

  body('fecha')
    .isISO8601().withMessage('La fecha debe tener formato válido')
    .custom((value) => {
      const hoy = new Date();
      hoy.setHours(0, 0, 0, 0);
      return new Date(value) > hoy;
    }).withMessage('La fecha debe ser posterior al día de hoy'),

  body('lugar')
    .isString().withMessage('El lugar debe ser un texto')
    .isLength({ min: 3, max: 100 }).withMessage('El lugar debe tener entre 3 y 100 caracteres'),

  body('precio')
    .isNumeric().withMessage('El precio debe ser un número')
    .custom((value) => value >= 0).withMessage('El precio no puede ser negativo'),

  // Ya no se valida 'imagen' en el body porque será generado desde req.file
  (req, res, next) => {
    if (!req.file) {
      return res.status(400).json({ errors: [{ msg: 'La imagen es obligatoria y debe ser un archivo válido' }] });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error('Errores de validación:', errors.array());
      return res.status(400).json({ errorsValidacion: errors.array() });
    }

    console.log('Evento creado correctamente');
    console.log('datos del evento:', req.body);
    next();
  },
];

// Validar cuerpo para actualizar un evento
const validateUpdateEventoBody = [
  param('id').isMongoId().withMessage('ID inválido'),
  body().notEmpty().withMessage('El cuerpo no puede estar vacío'),
  body('titulo')
    .optional()
    .isString().withMessage('El título debe ser un texto')
    .isLength({ min: 3, max: 100 }).withMessage('El título debe tener entre 3 y 100 caracteres'),
  body('descripcion')
    .optional()
    .isString().withMessage('La descripción debe ser un texto')
    .isLength({ min: 1, max: 100 }).withMessage('La descripción debe tener entre 10 y 100 caracteres'),
  body('fecha')
    .optional()
    .isISO8601().withMessage('La fecha debe tener formato válido')
    .custom((value) => new Date(value) > new Date()).withMessage('La fecha debe ser en el futuro'),
  body('lugar')
    .optional()
    .isString().withMessage('El lugar debe ser un texto')
    .isLength({ min: 3, max: 100 }).withMessage('El lugar debe tener entre 3 y 100 caracteres'),
  body('precio')
    .optional()
    .isNumeric().withMessage('El precio debe ser un número')
    .custom((value) => value >= 0).withMessage('El precio no puede ser negativo'),
  body('imagen')
    .optional()
    .matches(/^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/).withMessage('Debe ser una URL válida de imagen'),

  (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ errors: [{ msg: 'El cuerpo está vacío' }] });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
    console.log('Evento actualizado correctamente');
    console.log('datos actualizados:', req.body);
  },
];

module.exports = {
  validateEventoID,
  validateCreateEventoBody,
  validateUpdateEventoBody,
};
