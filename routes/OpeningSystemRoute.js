const express = require('express');
const { PostOpeningSystem, GetAllOpeningSystem, getOneOpeningSystem, UpdateOpeningSystem, DeleteOpeningSystem } = require('../services/OpeningSystemService');
const { getOpeningSystemValidator, updateOpeningSystemValidator, deleteOpeningSystemValidator, createOpeningSystemValidator } = require('../utils/validators/OpeningSystemValidator');
const router = express.Router()

router.route('/')
    .post(createOpeningSystemValidator, PostOpeningSystem)
    .get(GetAllOpeningSystem)

router.route('/:id')
    .get(getOpeningSystemValidator, getOneOpeningSystem)
    .put(updateOpeningSystemValidator, UpdateOpeningSystem)
    .delete(deleteOpeningSystemValidator, DeleteOpeningSystem)

module.exports = router
