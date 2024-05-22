const express = require('express');
const { PostLayout, GetAllLayout, getOneLayout, UpdateLayout, DeleteLayout } = require('../services/LayoutService');
const { getCompanyValidator, updateUserValidator, deleteUserValidator, createUserValidator } = require('../utils/validators/UserValidator');
const router = express.Router()

router.route('/')
    .post(createUserValidator, PostLayout)
    .get(GetAllLayout)

router.route('/:id')
    .get(getUserValidator, getOneLayout)
    .put(updateUserValidator, UpdateLayout)
    .delete(deleteUserValidator, DeleteLayout)

module.exports = router