const express = require('express');
const { PostProfileColor, GetAllProfileColor, getOneProfileColor, UpdateProfileColor, DeleteProfileColor } = require('../services/ProfileColorService');
const { createProfileColorValidator, getProfileColorValidator, updateProfileColorValidator, deleteProfileColorValidator } = require('../utils/validators/ProfileColorValidator');
const { upload } = require('../middlewares/firebase');
const router = express.Router()
const { isAdminAuth, auth } = require('../middlewares/auth');

router.route('/')
    .post(isAdminAuth, upload.single('image'), createProfileColorValidator, PostProfileColor)
    .get(auth, GetAllProfileColor)

router.route('/:id')
    .get(getProfileColorValidator, auth, getOneProfileColor)
    .put(isAdminAuth, upload.single('image'), updateProfileColorValidator, UpdateProfileColor)
    .delete(deleteProfileColorValidator, isAdminAuth, DeleteProfileColor)

module.exports = router