const express = require('express');
const { PostMullion, GetAllMullion, getOneMullion, UpdateMullion, DeleteMullion } = require('../services/MullionService');
const { createMullionValidator, getMullionValidator, updateMullionValidator, deleteMullionValidator } = require('../utils/validators/MullionValidator');
const { isAdminAuth, auth } = require('../middlewares/auth');
const router = express.Router()

router.route('/')
    .post(createMullionValidator, isAdminAuth, PostMullion)
    .get(auth, GetAllMullion)

router.route('/:id')
    .get(getMullionValidator, auth, getOneMullion)
    .put(updateMullionValidator, isAdminAuth, UpdateMullion)
    .delete(deleteMullionValidator, isAdminAuth, DeleteMullion)

module.exports = router