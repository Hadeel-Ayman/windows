const express = require('express');
const { PostFloatingMullion, GetAllFloatingMullion, getOneFloatingMullion, UpdateFloatingMullion, DeleteFloatingMullion } = require('../services/FloatingMullionService');
const { createFloatingMullionValidator, getFloatingMullionValidator, updateFloatingMullionValidator, deleteFloatingMullionValidator } = require('../utils/validators/FloatingMullionValidator');
const router = express.Router()
const { isAdminAuth, auth } = require('../middlewares/auth');


router.route('/')
    .post(createFloatingMullionValidator, isAdminAuth, PostFloatingMullion)
    .get(auth, GetAllFloatingMullion)

router.route('/:id')
    .get(getFloatingMullionValidator, auth, getOneFloatingMullion)
    .put(updateFloatingMullionValidator, isAdminAuth, UpdateFloatingMullion)
    .delete(deleteFloatingMullionValidator, isAdminAuth, DeleteFloatingMullion)

module.exports = router