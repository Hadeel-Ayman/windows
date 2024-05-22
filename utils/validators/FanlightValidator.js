const { check, body } = require('express-validator')
const result = require('../../middlewares/validatorMeddliware')
const slugify = require("slugify");

exports.getFanlightValidator = [
    check('id').isMongoId().withMessage('Invalid Fanlight Id'),
    result // for catch error from the above id 
]

exports.createFanlightValidator = [
    check('image')
        .notEmpty()
        .withMessage('image is required'),
    check('title')
        .notEmpty()
        .withMessage('title is required')
        .custom((val, { req }) => {
            req.body.slug = slugify(val)
            return true
        }),
    check('numOfSegment')
        .isNumeric()
        .withMessage('numOfSegment is required')
        .notEmpty()
        .withMessage('title is required'),
    check('openingSystem')
        .isMongoId()
        .withMessage('Invalid openingSystem Id')
        .notEmpty()
        .withMessage('openingSystem is required'),
    result
]

exports.updateSashValidator = [
    check('id').isMongoId().withMessage('Invalid Fanlight Id'),
    result
]

exports.deleteFanlightValidator = [
    check('id').isMongoId().withMessage('Invalid Fanlight Id'),
    result
]