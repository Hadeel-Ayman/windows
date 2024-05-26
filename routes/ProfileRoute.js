const express = require('express');
const { PostProfile, DeleteProfile, GetAllProfile, UpdateProfile, getOneProfile } = require('../services/ProfileService');
const { getProfileValidator, updateProfileValidator, deleteProfileValidator, createProfileValidator } = require('../utils/validators/ProfileValidator');
const { isAdminAuth, auth } = require('../middlewares/auth');
const router = express.Router({ mergeParams: true })

router.route('/')
    .post(createProfileValidator, isAdminAuth, PostProfile)
    .get(auth, GetAllProfile)

router.route('/:id')
    .get(getProfileValidator, auth, getOneProfile)
    .put(updateProfileValidator, isAdminAuth, UpdateProfile)
    .delete(deleteProfileValidator, isAdminAuth, DeleteProfile)

module.exports = router