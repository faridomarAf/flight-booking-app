const express = require('express');
const {CityController} = require('../../controllers');

const router = express.Router();

router.post('/', CityController.createCity);
router.patch('/:id', CityController.updateCity);
router.get('/', CityController.getCities);

module.exports = router;