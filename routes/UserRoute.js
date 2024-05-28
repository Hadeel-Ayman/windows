const express = require('express');
const { PostUser, GetUsers, getOneUser, UpdateUser, DeleteUser } = require('../services/UserService');
const { getUserValidator, updateUserValidator, deleteUserValidator, createUserValidator } = require('../utils/validators/UserValidator');
const router = express.Router()
const { isSuperAdminAuthenticated, auth } = require('../middlewares/auth');

router.route('/')
    .post(createUserValidator, isSuperAdminAuthenticated, PostUser)
    .get(GetUsers)


router.route('/:id')
    .get(getUserValidator, isSuperAdminAuthenticated, getOneUser)
    .put(updateUserValidator, isSuperAdminAuthenticated, UpdateUser)
    .delete(deleteUserValidator, isSuperAdminAuthenticated, DeleteUser)

module.exports = router