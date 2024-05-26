const express = require('express');
const { PostOpeningLayout, GetAllOpeningLayout, getOneOpeningLayout, UpdateOpeningLayout, DeleteOpeningLayout } = require('../services/OpeningLayoutService');
const { createOpeningLayoutValidator, getOpeningLayoutValidator, updateOpeningLayoutValidator, deleteOpeningLayoutValidator } = require('../utils/validators/OpeningLayoutValidator');
const { upload } = require('../middlewares/firebase');
const { isAdminAuth, auth } = require('../middlewares/auth');
const router = express.Router()

router.route('/')
    .post(isAdminAuth, upload.single('image'), createOpeningLayoutValidator, PostOpeningLayout)
    .get(auth, GetAllOpeningLayout)

router.route('/:id')
    .get(getOpeningLayoutValidator, auth, getOneOpeningLayout)
    .put(isAdminAuth, upload.single('image'), updateOpeningLayoutValidator, UpdateOpeningLayout)
    .delete(deleteOpeningLayoutValidator, isAdminAuth, DeleteOpeningLayout)

module.exports = router