const express = require('express');
const { PostGlazingBead, GetAllGlazingBead, getOneGlazingBead, UpdateGlazingBead, DeleteGlazingBead } = require('../services/GlazingBeadService');
const { createGlazingBeadValidator, getGlazingBeadValidator, updateGlazingBeadValidator, deleteGlazingBeadValidator } = require('../utils/validators/GlazingBeadValidator');
const { isAdminAuth, auth } = require('../middlewares/auth');
const router = express.Router()

router.route('/')
    .post(createGlazingBeadValidator, isAdminAuth, PostGlazingBead)
    .get(auth, GetAllGlazingBead)

router.route('/:id')
    .get(getGlazingBeadValidator, auth, getOneGlazingBead)
    .put(updateGlazingBeadValidator, isAdminAuth, UpdateGlazingBead)
    .delete(deleteGlazingBeadValidator, isAdminAuth, DeleteGlazingBead)

module.exports = router