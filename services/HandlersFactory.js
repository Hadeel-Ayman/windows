const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/ApiError");
const ApiFeatures = require("../utils/ApiFeatures");
const { ref, uploadBytes } = require("firebase/storage");
const { storage } = require('../middlewares/firebase');

exports.deleteOne = (Model) => asyncHandler(async (req, res, next) => {
    const { id } = req.params
    const document = await Model.findByIdAndDelete(id)
    if (!document) {
        next(new ApiError(`document not found of this id ${id}`, 404))
    }
    res.status(200).send('the document was deleted')
})

exports.updateOne = (Model) => asyncHandler(async (req, res, next) => {
    try {
        // التحقق من وجود ملف صورة في الطلب
        const file = req.file;
        if (!file) {
            console.error('No file uploaded');
            return res.status(400).json({ errors: [{ msg: 'image is required', path: 'image', location: 'body' }] });
        }

        // رفع الملف الجديد إلى Firebase Storage
        const storageRef = ref(storage, `uploads/${file.originalname}`);
        await uploadBytes(storageRef, file.buffer);

        // تحديث رابط الصورة في بيانات الوثيقة في MongoDB
        const updateDoc = await Model.findByIdAndUpdate(
            req.params.id,
            { image: `uploads/${file.originalname}` },
            { new: true } // الدكيومنت بعد الابديت 
        );

        if (!updateDoc) {
            return next(new ApiError(`Document not found of this id ${req.params.id}`, 404));
        }

        res.status(200).json(updateDoc);
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).send('Error processing request.');
    }
})


exports.createOne = (Model) => asyncHandler(async (req, res, next) => {
    try {
        const file = req.file;
        if (!file) {
            console.error('No file uploaded');
            return res.status(400).json({ errors: [{ msg: 'image is required', path: 'image', location: 'body' }] });
        }

        // رفع الملف إلى Firebase Storage
        const storageRef = ref(storage, `uploads/${file.originalname}`);
        await uploadBytes(storageRef, file.buffer);

        // إنشاء وثيقة جديدة في قاعدة البيانات باستخدام بيانات الطلب
        const docData = { ...req.body, image: `uploads/${file.originalname}` }; // إضافة رابط الملف إلى البيانات
        const Doc = await Model.create(docData);

        res.status(200).json(Doc);
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).send('Error processing request.');
    }
});

exports.getOne = (Model) => asyncHandler(async (req, res, next) => {
    const { id } = req.params
    const oneDoc = await Model.findById(id)
    if (!oneDoc) {
        return next(new ApiError(`Doc not found of this id ${id}`, 404))
    }
    res.status(200).send(oneDoc)
})


exports.GetAll = (Model) => asyncHandler(async (req, res) => {
    const apiFeatures = new ApiFeatures(Model.find(), req.query)
        .Searching()
        .limiting()
        .paginate()
        .filter()
        .sort()

    const result = await apiFeatures.mongooseQuery
    res.status(200).send({ results: result.length, data: result });
});
