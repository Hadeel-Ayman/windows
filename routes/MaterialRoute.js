const express = require('express');
const router = express.Router();
const ProfileRoute = require('../routes/ProfileRoute')
const { PostMaterial, getOneMaterial, GetAllMaterials, UpdateMaterial, DeleteMaterial } = require('../services/MaterialService');
const { createMaterialValidator, getMaterialValidator, updateMaterialValidator, deleteMaterialValidator } = require('../utils/validators/MaterialValidator');
const { auth, isAdminAuth } = require('../middlewares/auth');
const { upload } = require('../middlewares/firebase');

router.route('/')
    .post(upload.single('image'), createMaterialValidator, isAdminAuth, PostMaterial)
    .get(auth, GetAllMaterials)

// router.use('/:materialId/profilies', ProfileRoute) // ارجعلو 

router.route('/:id')
    .get(getMaterialValidator, auth, getOneMaterial)
    .put(upload.single('image'), updateMaterialValidator, isAdminAuth, UpdateMaterial)
    .delete(deleteMaterialValidator, isAdminAuth, DeleteMaterial)

module.exports = router