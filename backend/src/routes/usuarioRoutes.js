const express = require('express');
const router = express.Router();
const controller = require('../controller/usuarioController');

router.post('/', controller.createUsuario);
router.get('/', controller.listUsuarios);
router.get('/:id', controller.getUsuario);
router.delete('/:id', controller.deleteUsuario);

module.exports = router;
