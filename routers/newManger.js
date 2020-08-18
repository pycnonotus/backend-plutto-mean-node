const express = require('express');
const router = express.Router();
    // const jwt = require('jsonwebtoken');
    // const bcrypt = require('bcrypt');
    // const User = require('../models/user');
const newsMangerController = require('../controllers/newsManger');
const checkAuth = require('./middleware/check-auth');

router.post('', checkAuth, newsMangerController.addNew);
router.get('', newsMangerController.getNews);
router.get('/:id', newsMangerController.getNew);

module.exports = router;
