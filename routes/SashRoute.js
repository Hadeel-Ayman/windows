const express = require('express');
const { PostSash, GetAllSash, getOneSash, UpdateSash, DeleteSash } = require('../services/SashService');
const { getSashValidator, createSashValidator, updateSashValidator, deleteSashValidator } = require('../utils/validators/SashValidator');
const { upload } = require('../middlewares/firebase');
const { isAdminAuth, auth } = require('../middlewares/auth');
const router = express.Router()

router.route('/')
    .post(isAdminAuth, upload.single('image'), createSashValidator, PostSash)
    .get(auth, GetAllSash)

router.route('/:id')
    .get(getSashValidator, auth, getOneSash)
    .put(isAdminAuth, upload.single('image'), updateSashValidator, UpdateSash)
    .delete(deleteSashValidator, isAdminAuth, DeleteSash)

module.exports = router