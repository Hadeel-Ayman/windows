const express = require('express');
const { PostReinforcementsteel, GetAllReinforcementsteel, getOneReinforcementsteel, UpdateReinforcementsteel, DeleteReinforcementsteel } = require('../services/ReinforcementsteelService');
const { getCompanyValidator, updateUserValidator, deleteUserValidator, createUserValidator } = require('../utils/validators/UserValidator');
const router = express.Router()

router.route('/')
    .post(createUserValidator, PostReinforcementsteel)
    .get(GetAllReinforcementsteel)

router.route('/:id')
    .get(getUserValidator, getOneReinforcementsteel)
    .put(updateUserValidator, UpdateReinforcementsteel)
    .delete(deleteUserValidator, DeleteReinforcementsteel)

module.exports = router