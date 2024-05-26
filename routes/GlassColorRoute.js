const express = require('express');
const { PostGlassColor, GetAllGlassColor, getOneGlassColor, UpdateGlassColor, DeleteGlassColor } = require('../services/GlassColorService');
const { createGlassColorValidator, getGlassColorValidator, updateGlassColorValidator, deleteGlassColorValidator } = require('../utils/validators/GlassColorValidator');
const router = express.Router()
const { isAdminAuth, auth } = require('../middlewares/auth');
const { upload } = require('../middlewares/firebase');


router.route('/')
    .post(isAdminAuth, upload.single('image'), createGlassColorValidator, PostGlassColor)
    .get(auth, GetAllGlassColor)

router.route('/:id')
    .get(getGlassColorValidator, auth, getOneGlassColor)
    .put(isAdminAuth, upload.single('image'), updateGlassColorValidator, UpdateGlassColor)
    .delete(deleteGlassColorValidator, isAdminAuth, DeleteGlassColor)

module.exports = router