const express = require('express');
const router = express.Router();
const controller = require('../controller/salaController');

router.post('/', controller.createSala);
router.get('/', controller.listSalas);
router.get('/:id', controller.getSala);
router.put('/:id', controller.updateSala);
router.delete('/:id', controller.deleteSala);

module.exports = router;
