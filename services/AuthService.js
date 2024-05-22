const asyncHandler = require("express-async-handler");
const User = require('../models/UserModel')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const ApiError = require('../utils/ApiError');

// انشاء توكن   

const createJWT = (user) => {
    return jwt.sign({ id: user._id }, process.env.SKERET_KEY, {
        expiresIn: process.env.EXPIR_JWT_TIME
    });
};

// @desc   create new user
// @route  Post api/v1/Auth
// @access Public

exports.Regestier = asyncHandler(async (req, res) => {
    let user = await User.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password,
        company_name: req.body.company_name,
        telephone: req.body.telephone,
        role: req.body.role,
        country: req.body.country,
        state: req.body.state,
        city: req.body.city,
        area: req.body.area,
        street: req.body.street,
    })

    // generate token
    const token = createJWT(user._id)
    res.status(200).send({ user, token })
})

// @desc   login user
// @route  Post api/v1/Auth
// @access Public

exports.login = asyncHandler(async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return next(new ApiError('Invalid email or password', 401));
        }

        const token = createJWT(user);
        res.json({ token });
    } catch (err) {
        next(err);
    }
});
