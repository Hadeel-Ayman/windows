const express = require('express');
const { PostFanlight, GetAllFanlight, getOneFanlight, UpdateFanlight, DeleteFanlight } = require('../services/FanlightService');
const { getFanlightValidator, createFanlightValidator, updateFanlightValidator, deleteFanlightValidator } = require('../utils/validators/FanlightValidator');
const { upload } = require('../middlewares/firebase');
const { isAdminAuth, auth } = require('../middlewares/auth');
const router = express.Router()

router.route('/')
    .post(upload.single('image'), createFanlightValidator, isAdminAuth, PostFanlight)
    .get(auth, GetAllFanlight)

router.route('/:id')
    .get(getFanlightValidator, auth, getOneFanlight)
    .put(upload.single('image'), updateFanlightValidator, isAdminAuth, UpdateFanlight)
    .delete(deleteFanlightValidator, isAdminAuth, DeleteFanlight)

module.exports = router