/* eslint-disable no-unused-vars */
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
// const User = require('../models/user');
const authController = require('../controllers/authController');

router.post('/login', authController.login);

module.exports = router;
