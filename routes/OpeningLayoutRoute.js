const express = require('express');
const { PostOpeningLayout, GetAllOpeningLayout, getOneOpeningLayout, UpdateOpeningLayout, DeleteOpeningLayout } = require('../services/OpeningLayoutService');
const { getCompanyValidator, updateUserValidator, deleteUserValidator, createUserValidator } = require('../utils/validators/UserValidator');
const router = express.Router()

router.route('/')
    .post(createUserValidator, PostOpeningLayout)
    .get(GetAllOpeningLayout)

router.route('/:id')
    .get(getUserValidator, getOneOpeningLayout)
    .put(updateUserValidator, UpdateOpeningLayout)
    .delete(deleteUserValidator, DeleteOpeningLayout)

module.exports = router