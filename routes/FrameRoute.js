const express = require('express');
const router = express.Router()
const { PostFrame, getOneFrame, GetAllFrames, UpdateFrame, DeleteFrame } = require('../services/FrameService');
const { createFrameValidator, getFrameValidator, updateFrameValidator, deleteFrameValidator } = require('../utils/validators/FrameValidator');
const { isAdminAuth, auth } = require('../middlewares/auth');
const { upload } = require('../middlewares/firebase');

router.route('/')
    .post(createFrameValidator, isAdminAuth, upload.single('image'), PostFrame)
    .get(auth, GetAllFrames)

router.route('/:id')
    .get(getFrameValidator, auth, upload.single('image'), getOneFrame)
    .put(updateFrameValidator, isAdminAuth, upload.single('image'), UpdateFrame)
    .delete(deleteFrameValidator, isAdminAuth, DeleteFrame)

module.exports = router