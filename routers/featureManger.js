const express = require('express');
const router = express.Router();
const featureMangerController = require('../controllers/featureManger');
const checkAuth = require('./middleware/check-auth');

router.post('', checkAuth, featureMangerController.addSurvivalInfo);
router.get('', featureMangerController.getAllSurvivalInfo);

module.exports = router;
