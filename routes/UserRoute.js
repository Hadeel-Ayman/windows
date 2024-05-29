const express = require('express');
const { PostUser, GetUsers, getOneUser, UpdateUser, DeleteUser, getAdminDetails } = require('../services/UserService');
const { getUserValidator, updateUserValidator, deleteUserValidator, createUserValidator } = require('../utils/validators/UserValidator');
const router = express.Router()
const { isSuperAdminAuthenticated } = require('../middlewares/auth');

router.route('/')
    .post(createUserValidator, isSuperAdminAuthenticated, PostUser)
    .get(GetUsers)

// get Admin Details    
router.route('/getAdminDetails').get(isSuperAdminAuthenticated, getAdminDetails)

router.route('/:id')
    .get(getUserValidator, isSuperAdminAuthenticated, getOneUser)
    .put(updateUserValidator, isSuperAdminAuthenticated, UpdateUser)
    .delete(deleteUserValidator, isSuperAdminAuthenticated, DeleteUser)

module.exports = router