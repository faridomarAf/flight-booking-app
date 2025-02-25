const express = require('express');
const {CityController} = require('../../controllers');

const router = express.Router();

router.post('/', CityController.createCity);
router.patch('/:id', CityController.updateCity);
router.get('/', CityController.getCities);
router.get('/:id', CityController.getCity);
router.delete('/:id', CityController.deleteCity);

module.exports = router;