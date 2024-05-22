const express = require('express');
const { PostWeldingProcess, GetAllWeldingProcess, getOneWeldingProcess, UpdateWeldingProcess, DeleteWeldingProcess } = require('../services/WeldingProcessService');
const { getCompanyValidator, updateUserValidator, deleteUserValidator, createUserValidator } = require('../utils/validators/UserValidator');
const router = express.Router()

router.route('/')
    .post(createUserValidator, PostWeldingProcess)
    .get(GetAllWeldingProcess)

router.route('/:id')
    .get(getUserValidator, getOneWeldingProcess)
    .put(updateUserValidator, UpdateWeldingProcess)
    .delete(deleteUserValidator, DeleteWeldingProcess)

module.exports = router