const express = require('express');
const router = express.Router();
const controller = require('../controller/adminController');

router.post('/', controller.createAdmin);
router.get('/:id', controller.getAdmin);

module.exports = router;
