const express = require('express');
const { PostUser, GetUsers, getOneUser, UpdateUser, DeleteUser } = require('../services/UserService');
const { getUserValidator, updateUserValidator, deleteUserValidator, createUserValidator } = require('../utils/validators/UserValidator');
const router = express.Router()
const { isAdminAuth, auth } = require('../middlewares/auth');

router.route('/')
    .post(createUserValidator, isAdminAuth, PostUser)
    .get(GetUsers)


router.route('/:id')
    .get(getUserValidator, isAdminAuth, getOneUser)
    .put(updateUserValidator, isAdminAuth, UpdateUser)
    .delete(deleteUserValidator, isAdminAuth, DeleteUser)

module.exports = router