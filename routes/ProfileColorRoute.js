const express = require('express');
const { PostProfileColor, GetAllProfileColor, getOneProfileColor, UpdateProfileColor, DeleteProfileColor } = require('../services/ProfileColorService');
const { getCompanyValidator, updateUserValidator, deleteUserValidator, createUserValidator } = require('../utils/validators/UserValidator');
const router = express.Router()

router.route('/')
    .post(createUserValidator, PostProfileColor)
    .get(GetAllProfileColor)

router.route('/:id')
    .get(getUserValidator, getOneProfileColor)
    .put(updateUserValidator, UpdateProfileColor)
    .delete(deleteUserValidator, DeleteProfileColor)

module.exports = router