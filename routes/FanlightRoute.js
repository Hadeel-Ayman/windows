const express = require('express');
const { PostFanlight, GetAllFanlight, getOneFanlight, UpdateFanlight, DeleteFanlight } = require('../services/FanlightService');
const { getCompanyValidator, updateUserValidator, deleteUserValidator, createUserValidator } = require('../utils/validators/UserValidator');
const router = express.Router()

router.route('/')
    .post(createUserValidator, PostFanlight)
    .get(GetAllFanlight)

router.route('/:id')
    .get(getUserValidator, getOneFanlight)
    .put(updateUserValidator, UpdateFanlight)
    .delete(deleteUserValidator, DeleteFanlight)

module.exports = router