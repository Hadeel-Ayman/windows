const express = require('express');
const { PostFloatingMullion, GetAllFloatingMullion, getOneFloatingMullion, UpdateFloatingMullion, DeleteFloatingMullion } = require('../services/FloatingMullionService');
const { getCompanyValidator, updateUserValidator, deleteUserValidator, createUserValidator } = require('../utils/validators/UserValidator');
const router = express.Router()

router.route('/')
    .post(createUserValidator, PostFloatingMullion)
    .get(GetAllFloatingMullion)

router.route('/:id')
    .get(getUserValidator, getOneFloatingMullion)
    .put(updateUserValidator, UpdateFloatingMullion)
    .delete(deleteUserValidator, DeleteFloatingMullion)

module.exports = router