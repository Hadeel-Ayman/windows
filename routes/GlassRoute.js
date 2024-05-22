const express = require('express');
const { PostGlass, GetAllGlass, getOneGlass, UpdateGlass, DeleteGlass } = require('../services/GlassService');
const { getCompanyValidator, updateUserValidator, deleteUserValidator, createUserValidator } = require('../utils/validators/UserValidator');
const router = express.Router()

router.route('/')
    .post(createUserValidator, PostGlass)
    .get(GetAllGlass)

router.route('/:id')
    .get(getUserValidator, getOneGlass)
    .put(updateUserValidator, UpdateGlass)
    .delete(deleteUserValidator, DeleteGlass)

module.exports = router