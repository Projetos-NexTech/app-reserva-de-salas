const express = require('express');
const router = express.Router();
const controller = require('../controller/usuarioController');

router.post('/login', controller.loginUsuario);
router.post('/reset-password', controller.requestPasswordReset);
router.post('/sync-auth', controller.syncUsuariosToAuth);

router.post('/', controller.createUsuario);
router.get('/', controller.listUsuarios);

router.get('/:id', controller.getUsuario);
router.put('/:id', controller.updateUsuario);
router.delete('/:id', controller.deleteUsuario);

module.exports = router;
