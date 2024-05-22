const express = require('express');
const { PostSash, GetAllSash, getOneSash, UpdateSash, DeleteSash } = require('../services/SashService');
const { getSashValidator, createSashValidator, updateSashValidator, deleteSashValidator } = require('../utils/validators/SashValidator');
const router = express.Router()

router.route('/')
    .post(createSashValidator, PostSash)
    .get(GetAllSash)

router.route('/:id')
    .get(getSashValidator, getOneSash)
    .put(updateSashValidator, UpdateSash)
    .delete(deleteSashValidator, DeleteSash)

module.exports = router