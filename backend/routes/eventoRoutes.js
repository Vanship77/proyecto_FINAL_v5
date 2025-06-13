const express = require('express');
const router = express.Router();
const eventoCtrl = require('../controllers/eventoControllers');
const validators = require('../middlewares/eventosValidators');
const { hybridAuth } = require('../oauth/authenticate');
const checkRole = require('../middlewares/checkRole');
const role='admin';
const upload=require('../middlewares/uploads');

router.get('/' ,eventoCtrl.getAllEventos);
router.get('/:id',validators.validateEventoID, eventoCtrl.getEventoById);
router.post('/',hybridAuth,checkRole(role),upload.single('imagen'), eventoCtrl.createEvento);
router.put('/:id',hybridAuth,checkRole(role),upload.single('imagen'), eventoCtrl.updateEventoById);
router.delete('/:id',hybridAuth,checkRole(role),validators.validateEventoID, eventoCtrl.deleteEventoById);

module.exports = router;

