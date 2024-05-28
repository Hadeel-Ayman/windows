const express = require('express');
const { SignupValidator, loginValidator, loginAdminValidator } = require('../utils/validators/AuthValidator');
const { Regestier, login } = require('../services/AuthService');
const router = express.Router()

router.route('/signup').post(SignupValidator, Regestier)
router.route('/login').post(loginValidator, login)
router.route('/loginAdmin').post(loginAdminValidator, login)

module.exports = router;