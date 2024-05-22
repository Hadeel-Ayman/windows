const { check, body } = require('express-validator')
const result = require('../../middlewares/validatorMeddliware')
const slugify = require("slugify");

exports.getSashValidator = [
    check('id').isMongoId().withMessage('Invalid Sash Id'),
    result
]

exports.createSashValidator = [
    check('name')
        .notEmpty()
        .withMessage('name is required')
        .isLength({ min: 3 })
        .withMessage('Too Short')
        .isLength({ max: 20 })
        .withMessage('Too long')
        .custom((val, { req }) => {
            req.body.slug = slugify(val)
            return true
        }),
    check('image')
        .notEmpty()
        .withMessage('image is required'),
    check('from')
        .isNumeric()
        .notEmpty()
        .withMessage('from is required'),
    check('code')
        .notEmpty()
        .withMessage('code is required'),
    check('Length_of_Beam')
        .notEmpty()
        .withMessage('Length_of_Beam is required')
        .isMongoId()
        .withMessage('Invalid ID format')
        .custom((value, { req }) => {
            const Length_of_Beam = parseFloat(value);
            const pricePermeter = parseFloat(req.body.pricePermeter);
            if (!isNaN(Length_of_Beam) && !isNaN(pricePermeter)) {
                req.body.price_beam = Length_of_Beam * pricePermeter;
            } else {
                throw new Error('Both Length_of_Beam and pricePermeter must be numbers');
            }
            return true;
        })
    ,
    check('height')
        .notEmpty()
        .withMessage('height is required')
        .isNumeric()
        .withMessage('height must be a number'),
    check('weightPermeter')
        .notEmpty()
        .withMessage('weight is required')
        .isNumeric()
        .withMessage('weight must be a number'),
    check('colours')
        .notEmpty()
        .withMessage('colours is required')
        .isMongoId()
        .withMessage('Invalid ID format'),
    check('pricePermeter')
        .notEmpty()
        .withMessage('price is required')
        .isNumeric()
        .withMessage('price must be a number'),
    check('price_beam'),
    result
]

exports.updateSashValidator = [
    check('id').isMongoId().withMessage('Invalid Sash Id'),
    body('name').custom((val, { req }) => {
        req.body.slug = slugify(val)
        return true
    }),
    result
]

exports.deleteSashValidator = [
    check('id').isMongoId().withMessage('Invalid Sash Id'),
    result
]