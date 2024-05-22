const express = require('express');
const { PostProfile, DeleteProfile, GetAllProfile, UpdateProfile, getOneProfile } = require('../services/ProfileService');
const { getProfileValidator, updateProfileValidator, deleteProfileValidator, createProfileValidator } = require('../utils/validators/ProfileValidator');
const router = express.Router({ mergeParams: true })

router.route('/')
    .post(createProfileValidator, PostProfile)
    .get(GetAllProfile)

router.route('/:id')
    .get(getProfileValidator, getOneProfile)
    .put(updateProfileValidator, UpdateProfile)
    .delete(deleteProfileValidator, DeleteProfile)

module.exports = router