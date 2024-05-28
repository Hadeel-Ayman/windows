const User = require("../models/UserModel");
const Factory = require('./HandlersFactory');
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/ApiError");


// @desc   Get All Users
// @route  GET api/v1/Users
// @access Public

exports.GetUsers = Factory.GetAll(User)

// @desc   create User
// @route  POST api/v1/Users
// @access Private

exports.PostUser = Factory.createOne(User)

// @desc   get specific User by id 
// @route  GET api/v1/Users/:id
// @access Public 

exports.getOneUser = Factory.getOne(User)


// @desc   update specific User by id 
// @route  PUT api/v1/Users/:id
// @access Private 


exports.UpdateUser = asyncHandler(async (req, res, next) => {
    const updateDoc = await User.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            slug: req.body.slug,
            email: req.body.email,
            phone: req.body.phone,
            profileImg: req.body.profileImg,
            role: req.body.role
        },
        { new: true } // الدكيومنت بعد الابديت 
    )
    if (!updateDoc) {
        return next(new ApiError(`Document not found of this id ${req.params.id}`, 404))
    }
    res.status(200).send(updateDoc)
})

exports.UpdatePassword = Factory.updateOne(User)

// @desc   delete specific User by id 
// @route  DELETE api/v1/Users/:id
// @access Private 

exports.DeleteUser = Factory.deleteOne(User)


exports.addNewAdmin = asyncHandler(async (req, res, next) => {
    const { Name, email, phone, password, age, userId, role } =
        req.body;
    if (
        !Name ||
        !email ||
        !phone ||
        !password ||
        !age ||
        !userId ||
        !role

    ) {
        return next(new ErrorHandler("Please Fill Full Form!", 400));
    }

    const isRegistered = await User.findOne({ userId });
    if (isRegistered) {
        return next(new ErrorHandler("Admin With This User ID Already Exists!", 400));
    }

    let userRole;
    if (role === "Admin" || role === "SuperAdmin") {
        userRole = role;
    } else {
        return next(new ErrorHandler("Invalid User Role!", 400));
    }

    const admin = await User.create({
        Name, email, phone, password, age, userId,
        role: userRole,
    });
    res.status(200).json({
        success: true,
        message: "New Admin Registered",
        admin,
    });
});

exports.getAllAdmins = asyncHandler(async (req, res, next) => {
    const { page = 1, limit = 15, search = "", sort = "", filter = "" } = req.query;
    const query = { $or: [{ role: "Admin" }, { role: "SuperAdmin" }] };
    if (search) {
        query.Name = { $regex: search, $options: "i" };
    }
    if (filter) {
        query.role = { $regex: filter, $options: "i" };;
    }
    let sortOptions = {};
    switch (sort) {
        case "name_asc":
            sortOptions = { Name: 1 };
            break;
        case "name_desc":
            sortOptions = { Name: -1 };
            break;
        default:
            break;
    }

    // حساب إجمالي عدد الإداريين الذين يطابقون الاستعلام
    const totalAdmins = await User.countDocuments(query);

    // العثور على الإداريين بناءً على الاستعلام والفرز والصفحة المحددة
    const admins = await User.find(query)
        .sort(sortOptions)
        .skip((page - 1) * limit)
        .limit(limit);

    // حساب إجمالي عدد الصفحات
    const totalPages = Math.ceil(totalAdmins / limit);

    // إرسال الاستجابة
    res.status(200).json({
        success: true,
        currentPage: parseInt(page),
        totalPages,
        admins,
    });
});
