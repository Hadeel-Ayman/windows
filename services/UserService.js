const User = require("../models/UserModel");
const Factory = require('./HandlersFactory');
const asyncHandler = require("express-async-handler");
const bcrypt = require('bcryptjs');
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


// exports.UpdatePassword = asyncHandler(async (req, res, next) => { ///// مش زابطة
//     const updateDoc = await User.findByIdAndUpdate(
//         req.params.id,
//         {
//             password: await bcrypt.hash(req.body.password, 12)
//         },
//         { new: true } // الدكيومنت بعد الابديت 
//     );

//     if (!updateDoc) {
//         return next(new ApiError(`Document not found of this id ${req.params.id}`, 404))
//     }
//     res.status(200).send(updateDoc)
// })


exports.UpdatePassword = Factory.updateOne(User)

// @desc   delete specific User by id 
// @route  DELETE api/v1/Users/:id
// @access Private 

exports.DeleteUser = Factory.deleteOne(User)

