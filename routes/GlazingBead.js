const express = require('express');
const { PostGlazingBead, GetAllGlazingBead, getOneGlazingBead, UpdateGlazingBead, DeleteGlazingBead } = require('../services/GlazingBeadService');
const { getCompanyValidator, updateUserValidator, deleteUserValidator, createUserValidator } = require('../utils/validators/UserValidator');
const router = express.Router()

router.route('/')
    .post(createUserValidator, PostGlazingBead)
    .get(GetAllGlazingBead)

router.route('/:id')
    .get(getUserValidator, getOneGlazingBead)
    .put(updateUserValidator, UpdateGlazingBead)
    .delete(deleteUserValidator, DeleteGlazingBead)

module.exports = router