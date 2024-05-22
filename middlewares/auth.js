const expressAsyncHandler = require("express-async-handler");
const ApiError = require("../utils/ApiError");
const jwt = require('jsonwebtoken')
const User = require('../models/UserModel')

// protect handler 
exports.auth = expressAsyncHandler(async (req, res, next) => {
    // check if the token is exist or not 
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]
    }
    if (!token) {
        return next(new ApiError('you are not login, please login ', 401))
    }

    // vierfiy token (no change happens,,expired token)
    const decode = jwt.verify(token, process.env.SKERET_KEY) // payload عبارة عن البيانات الي هي ال id
    console.log(decode)
    next()
});

// Admin authentication
exports.isAdminAuth = expressAsyncHandler(async (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log('Authorization Header:', authHeader);

    if (!authHeader || !authHeader.startsWith('Bearer')) {
        return next(new ApiError('You are not logged in, please log in', 401));
    }

    const token = authHeader.split(' ')[1];
    console.log('Extracted Token:', token);

    try {
        const decode = jwt.verify(token, process.env.SKERET_KEY);
        console.log('Decoded Token:', decode);
        console.log('Decoded User ID:', decode.id); // التحقق من معرف المستخدم المستخرج

        req.user = await User.findById(decode.id);
        console.log('User Found:', req.user);

        if (!req.user) {
            return next(new ApiError('User not found, please log in', 401));
        }

        if (req.user.role !== 'admin') {
            return next(new ApiError('Not authorized for this resource!', 403));
        }

        next();
    } catch (err) {
        console.error('Token verification error:', err);
        return next(new ApiError('Invalid or expired token', 401));
    }
});
