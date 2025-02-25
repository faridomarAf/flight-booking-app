// v1 routes
const express = require('express');
const airplaneRoutes = require('./airplane-routes');
const cityRoutes = require('./city-routes');

const {infoController} = require('../../controllers')

const router = express.Router();

router.get('/info', infoController.info);

router.use('/airplanes', airplaneRoutes);
router.use('/cities', cityRoutes);

module.exports = router