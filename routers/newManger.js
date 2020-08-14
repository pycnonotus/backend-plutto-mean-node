const express = require('express');
const router = express.Router();
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');
// const User = require('../models/user');
const newsMangerController = require('../controllers/newsManger');

router.post('', newsMangerController.addNew);
router.get('', newsMangerController.getNews);
router.get('/:id', newsMangerController.getNew);

module.exports = router;
