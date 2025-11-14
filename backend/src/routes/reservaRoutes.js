const express = require('express');
const router = express.Router();
const controller = require('../controller/reservaController');

router.post('/', controller.createReserva);
router.get('/', controller.listReservas);
router.get('/:id', controller.getReserva);
router.put('/:id', controller.updateReserva);
router.delete('/:id', controller.deleteReserva);

module.exports = router;
