const express = require('express');
const {AirportController} = require('../../controllers');
const {AirportMiddlewares} = require('../../middlewares');

const router = express.Router();

router.post('/', AirportMiddlewares.validateCreateRequest,AirportController.createAirport);

module.exports = router;