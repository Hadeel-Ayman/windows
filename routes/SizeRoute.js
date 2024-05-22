const express = require('express');
const { PostSize, GetAllSize, getOneSize, UpdateSize, DeleteSize } = require('../services/SizeService');
const { getCompanyValidator, updateUserValidator, deleteUserValidator, createUserValidator } = require('../utils/validators/UserValidator');
const { auth } = require('../middlewares/auth');
const router = express.Router()

router.route('/')
    .post(createUserValidator,auth, PostSize)
    .get(GetAllSize)

router.route('/:id')
    .get(getUserValidator, getOneSize)
    .put(updateUserValidator, UpdateSize)
    .delete(deleteUserValidator, DeleteSize)

module.exports = router