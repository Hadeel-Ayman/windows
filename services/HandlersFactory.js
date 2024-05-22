const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/ApiError");
const ApiFeatures = require("../utils/ApiFeatures");
const { ref, uploadBytes, getDownloadURL } = require("firebase/storage");
const { storage, upload } = require('../middlewares/firebase');

exports.deleteOne = (Model) => asyncHandler(async (req, res, next) => {
    const { id } = req.params
    const document = await Model.findByIdAndDelete(id)
    if (!document) {
        next(new ApiError(`document not found of this id ${id}`, 404))
    }
    res.status(200).send('the document was deleted')
})

exports.updateOne = (Model) => asyncHandler(async (req, res, next) => {
    const updateDoc = await Model.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true } // الدكيومنت بعد الابديت 
    )
    if (!updateDoc) {
        return next(new ApiError(`Document not found of this id ${req.params.id}`, 404))
    }
    res.status(200).send(updateDoc)
})


exports.createOne = (Model) => asyncHandler(async (req, res, next) => {
    //     try {
    //         const file = req.file;
    //         if (!file) {
    //             console.error('No file uploaded');
    //             return res.status(400).send('No file uploaded.');
    //         }

    //         // رفع الملف إلى Firebase Storage
    //         const storageRef = ref(storage, `uploads/${file.originalname}`);
    //         await uploadBytes(storageRef, file.buffer);

    //         // إنشاء وثيقة جديدة في قاعدة البيانات باستخدام بيانات الطلب
    //         const docData = { ...req.body, image: `uploads/${file.originalname}` }; // إضافة رابط الملف إلى البيانات
    //         const Doc = await Model.create(docData);

    //         res.status(200).send(Doc);
    //     } catch (error) {
    //         console.error('Error processing request:', error);
    //         res.status(500).send('Error processing request.');
    //     }
    // });
    try {
        const file = req.file;
        if (!file) {
            console.error('No file uploaded');
            return res.status(400).send('No file uploaded.');
        }

        // رفع الملف إلى Firebase Storage
        const storageRef = ref(storage, `uploads/${Date.now()}_${file.originalname}`);
        await uploadBytes(storageRef, file.buffer);
        const downloadURL = await getDownloadURL(storageRef);

        // إنشاء وثيقة جديدة في قاعدة البيانات باستخدام بيانات الطلب
        const docData = { ...req.body, image: downloadURL }; // إضافة رابط الملف إلى البيانات
        const Doc = await Model.create(docData);

        res.status(200).send(Doc);
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
