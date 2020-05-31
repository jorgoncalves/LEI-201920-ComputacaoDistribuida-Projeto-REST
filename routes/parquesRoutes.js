const express = require('express');

const isAuth = require('../middleware/is-auth');

const router = express.Router();

const parquesController = require('../controllers/parquesController');

router.get('/', isAuth, parquesController.getAllParques);

router.get('/find', parquesController.findPark);

router.post('/', parquesController.createNewParque);

router.put('/:id', parquesController.updateParque);

module.exports = router;
