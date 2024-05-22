const express = require('express');
const { PostGlassColor, GetAllGlassColor, getOneGlassColor, UpdateGlassColor, DeleteGlassColor } = require('../services/GlassColorService');
const { getCompanyValidator, updateUserValidator, deleteUserValidator, createUserValidator } = require('../utils/validators/UserValidator');
const router = express.Router()

router.route('/')
    .post(createUserValidator, PostGlassColor)
    .get(GetAllGlassColor)

router.route('/:id')
    .get(getUserValidator, getOneGlassColor)
    .put(updateUserValidator, UpdateGlassColor)
    .delete(deleteUserValidator, DeleteGlassColor)

module.exports = router