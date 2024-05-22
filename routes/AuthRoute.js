const express = require('express');
const { SignupValidator, loginValidator } = require('../utils/validators/AuthValidator');
const { Regestier, login } = require('../services/AuthService');
const router = express.Router()

router.route('/signup').post(SignupValidator, Regestier)
router.route('/login').post(loginValidator, login)

module.exports = router;