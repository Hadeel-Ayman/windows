const express = require('express');
const { PostReinforcementsteel, GetAllReinforcementsteel, getOneReinforcementsteel, UpdateReinforcementsteel, DeleteReinforcementsteel } = require('../services/ReinforcementsteelService');
const { createReinforcementsteelValidator, getReinforcementsteelValidator, updateReinforcementsteelValidator, deleteReinforcementsteelValidator } = require('../utils/validators/ReinforcmentsteelValidator');
const { isAdminAuth, auth } = require('../middlewares/auth');
const router = express.Router()

router.route('/')
    .post(createReinforcementsteelValidator, isAdminAuth, PostReinforcementsteel)
    .get(auth, GetAllReinforcementsteel)

router.route('/:id')
    .get(getReinforcementsteelValidator, auth, getOneReinforcementsteel)
    .put(updateReinforcementsteelValidator, isAdminAuth, UpdateReinforcementsteel)
    .delete(deleteReinforcementsteelValidator, isAdminAuth, DeleteReinforcementsteel)

module.exports = router