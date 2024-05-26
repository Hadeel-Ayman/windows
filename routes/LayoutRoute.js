const express = require('express');
const { PostLayout, GetAllLayout, getOneLayout, UpdateLayout, DeleteLayout } = require('../services/LayoutService');
const { } = require('../utils/validators/UserValidator');
const { createLayoutValidator, getLayoutValidator, updateLayoutValidator, deleteLayoutValidator } = require('../utils/validators/LayoutValidator');
const { upload } = require('../middlewares/firebase');
const { isAdminAuth, auth } = require('../middlewares/auth');
const router = express.Router()

router.route('/')
    .post(isAdminAuth, upload.single('image'), createLayoutValidator, PostLayout)
    .get(auth, GetAllLayout)

router.route('/:id')
    .get(getLayoutValidator, auth, getOneLayout)
    .put(isAdminAuth, upload.single('image'), updateLayoutValidator, UpdateLayout)
    .delete(deleteLayoutValidator, isAdminAuth, DeleteLayout)

module.exports = router