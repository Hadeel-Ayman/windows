const express = require('express');
const { PostCuttingProcess, GetAllCuttingProcess, getOneCuttingProcess, UpdateCuttingProcess, DeleteCuttingProcess } = require('../services/CuttingProcessService');
const { getCompanyValidator, updateUserValidator, deleteUserValidator, createUserValidator } = require('../utils/validators/UserValidator');
const router = express.Router()

router.route('/')
    .post(createUserValidator, PostCuttingProcess)
    .get(GetAllCuttingProcess)

router.route('/:id')
    .get(getUserValidator, getOneCuttingProcess)
    .put(updateUserValidator, UpdateCuttingProcess)
    .delete(deleteUserValidator, DeleteCuttingProcess)

module.exports = router