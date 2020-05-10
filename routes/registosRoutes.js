const express = require('express');

const router = express.Router();

const registoController = require('../controllers/registoController');

router.get('/', registoController.getAllRegistos);

router.post('/', registoController.createNewRegisto);

router.put('/:id', registoController.updateRegisto);

module.exports = router;
