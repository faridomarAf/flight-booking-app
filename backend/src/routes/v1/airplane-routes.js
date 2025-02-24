const express = require('express');
const {AirplaneController} = require('../../controllers');
const {AirpalneMiddlewares} = require('../../middlewares');

const router = express.Router();

router.post('/', AirpalneMiddlewares.validateCreateRequest,AirplaneController.createAirplane);
router.get('/',AirplaneController.getAirplanes);
router.get('/:id',AirplaneController.getAirplane);
router.delete('/:id',AirplaneController.destroyAirplane);
router.patch('/:id',AirplaneController.updateAirplane);

module.exports = router;