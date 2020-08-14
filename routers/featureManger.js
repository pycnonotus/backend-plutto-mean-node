const express = require('express');
const router = express.Router();
const featureMangerController = require('../controllers/featureManger');

router.post('', featureMangerController.addSurvivalInfo);
router.get('', featureMangerController.getAllSurvivalInfo);

module.exports = router;
