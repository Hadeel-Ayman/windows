const express = require('express');
const { PostMullion, GetAllMullion, getOneMullion, UpdateMullion, DeleteMullion } = require('../services/MullionService');
const { getCompanyValidator, updateUserValidator, deleteUserValidator, createUserValidator } = require('../utils/validators/UserValidator');
const router = express.Router()

router.route('/')
    .post(createUserValidator, PostMullion)
    .get(GetAllMullion)

router.route('/:id')
    .get(getUserValidator, getOneMullion)
    .put(updateUserValidator, UpdateMullion)
    .delete(deleteUserValidator, DeleteMullion)

module.exports = router