const express = require('express');

const router = express.Router();

const clienteController = require('../controllers/clienteController');

router.get('/', clienteController.getAllClients);

router.post('/', clienteController.createNewClient);

router.put('/:id', clienteController.updateClient);

module.exports = router;
