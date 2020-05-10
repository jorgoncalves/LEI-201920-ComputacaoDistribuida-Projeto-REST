const express = require('express');

const router = express.Router();

const parquesController = require('../controllers/parquesController');

router.get('/', parquesController.getAllParques);

router.post('/', parquesController.createNewParque);

router.put('/:id', parquesController.updateParque);

module.exports = router;
