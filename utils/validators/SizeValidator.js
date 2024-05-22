const { check } = require('express-validator')
const result = require('../../middlewares/validatorMeddliware')


exports.getCuttingProcessValidator = [
    check('id').isMongoId().withMessage('Invalid CuttingProcess Id'),
    result // for catch error from the above id 
]

exports.createCuttingProcessValidator = [
    check('width')
        .isNumeric()
        .withMessage('width must be a number')
        .default(6),
    check('height')
        .isNumeric()
        .withMessage('height must be a number'),
    result
]


exports.updateCuttingProcessValidator = [
    check('id').isMongoId().withMessage('Invalid CuttingProcess id format'),
    result
];

exports.deleteCuttingProcessValidator = [
    check('id').isMongoId().withMessage('Invalid CuttingProcess id format'),
    result,
];