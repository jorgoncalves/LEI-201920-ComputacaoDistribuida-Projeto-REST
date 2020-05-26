const express = require('express');

const router = express.Router();

const clienteController = require('../controllers/clienteController');

router.get('/', clienteController.getAllClients);

router.get('/find', clienteController.findClient);

router.get('/:id', clienteController.getClient);

router.get('/history/:id', clienteController.clientHistory);

router.post('/', clienteController.createNewClient);

router.put('/:id', clienteController.updateClient);

module.exports = router;
