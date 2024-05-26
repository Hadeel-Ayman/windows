const express = require('express');
const { PostCuttingProcess, GetAllCuttingProcess, getOneCuttingProcess, UpdateCuttingProcess, DeleteCuttingProcess } = require('../services/CuttingProcessService');
const { createCuttingProcessValidator, getCuttingProcessValidator, deleteCuttingProcessValidator, updateCuttingProcessValidator } = require('../utils/validators/CuttingProcessValidator');
const { isAdminAuth, auth } = require('../middlewares/auth');
const router = express.Router()

router.route('/')
    .post(createCuttingProcessValidator, isAdminAuth, PostCuttingProcess)
    .get(auth, GetAllCuttingProcess)

router.route('/:id')
    .get(getCuttingProcessValidator, auth, getOneCuttingProcess)
    .put(updateCuttingProcessValidator, isAdminAuth, UpdateCuttingProcess)
    .delete(deleteCuttingProcessValidator, isAdminAuth, DeleteCuttingProcess)

module.exports = router