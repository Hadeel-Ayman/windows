const express = require('express');
const { PostCompany, GetAllCompany, getOneCompany, UpdateCompany, DeleteCompany } = require('../services/CompanyService');
const { createCompanyValidator, getCompanyValidator, deleteCompanyValidator, updateCompanyValidator } = require('../utils/validators/CompanyValidator');
const { upload } = require('../middlewares/firebase');
const { auth, isAdminAuth } = require('../middlewares/auth');
const router = express.Router()


router.route('/')
    .post(isAdminAuth, upload.single('image'), createCompanyValidator, PostCompany)
    .get(auth, GetAllCompany)

router.route('/:id')
    .get(getCompanyValidator, auth, getOneCompany)
    .put(upload.single('image'), updateCompanyValidator, isAdminAuth, UpdateCompany)
    .delete(deleteCompanyValidator, isAdminAuth, DeleteCompany)

module.exports = router