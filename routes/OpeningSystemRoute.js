const express = require('express');
const { PostOpeningSystem, GetAllOpeningSystem, getOneOpeningSystem, UpdateOpeningSystem, DeleteOpeningSystem } = require('../services/OpeningSystemService');
const { getOpeningSystemValidator, updateOpeningSystemValidator, deleteOpeningSystemValidator, createOpeningSystemValidator } = require('../utils/validators/OpeningSystemValidator');
const { upload } = require('../middlewares/firebase');
const { auth, isAdminAuth } = require('../middlewares/auth');
const router = express.Router()

router.route('/')
    .post(isAdminAuth, upload.single('image'), createOpeningSystemValidator, PostOpeningSystem)
    .get(auth, GetAllOpeningSystem)

router.route('/:id')
    .get(getOpeningSystemValidator, auth, getOneOpeningSystem)
    .put(isAdminAuth, upload.single('image'), updateOpeningSystemValidator, UpdateOpeningSystem)
    .delete(deleteOpeningSystemValidator, isAdminAuth, DeleteOpeningSystem)

module.exports = router
