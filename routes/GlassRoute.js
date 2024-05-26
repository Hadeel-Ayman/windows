const express = require('express');
const { PostGlass, GetAllGlass, getOneGlass, UpdateGlass, DeleteGlass } = require('../services/GlassService');
const { createGlassValidator, getGlassValidator, updateGlassValidator, deleteGlassValidator } = require('../utils/validators/GlassValidator');
const { auth } = require('../middlewares/auth');
const router = express.Router()

router.route('/')
    .post(createGlassValidator, auth, PostGlass)
    .get(auth, GetAllGlass)

router.route('/:id')
    .get(getGlassValidator, auth, getOneGlass)
    .put(updateGlassValidator, auth, UpdateGlass)
    .delete(deleteGlassValidator, auth, DeleteGlass)

module.exports = router