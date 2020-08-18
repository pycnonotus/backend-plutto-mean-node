const express = require('express');
const router = express.Router();
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');
// const User = require('../models/user');
const payController = require('../controllers/payController');
//const checkAuth = require('./middleware/check-auth');

router.get('/:username', payController.checkIfThereUser);

module.exports = router;
