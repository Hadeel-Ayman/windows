const express = require('express');
const router = express.Router();
const ProfileRoute = require('../routes/ProfileRoute')
const { PostMaterial, getOneMaterial, GetAllMaterials, UpdateMaterial, DeleteMaterial } = require('../services/MaterialService');
const { createMaterialValidator, getMaterialValidator, updateMaterialValidator, deleteMaterialValidator } = require('../utils/validators/MaterialValidator');
const { auth, isAdminAuth } = require('../middlewares/auth');
const { upload } = require('../middlewares/firebase');

router.route('/')
    .post(isAdminAuth, upload.single('image'), createMaterialValidator, PostMaterial)
    .get(auth, GetAllMaterials)

router.route('/:id')
    .get(getMaterialValidator, auth, getOneMaterial)
    .put(isAdminAuth, upload.single('image'), updateMaterialValidator, UpdateMaterial)
    .delete(deleteMaterialValidator, isAdminAuth, DeleteMaterial)

module.exports = router