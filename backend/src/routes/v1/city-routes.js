const express = require('express');
const {CityController} = require('../../controllers');
const {CityMiddlewares} = require('../../middlewares');

const router = express.Router();

router.post('/', CityMiddlewares.validateCreateRequest,CityController.createCity);
router.patch('/:id', CityController.updateCity);
router.get('/', CityController.getCities);
router.get('/:id', CityController.getCity);
router.delete('/:id', CityController.deleteCity);

module.exports = router;