const { check } = require("express-validator");
const ValidatorMiddle = require("../../middlewares/validatorMiddleware");
exports.createFeatureValidator = [
  check("name")
    .notEmpty()
    .withMessage("name required")
    .isLength({ min: 3 })
    .withMessage("Too Short Feature name")
    .isLength({ max: 50 })
    .withMessage("Too Long Feature name"),

  check("description")
    .notEmpty()
    .withMessage("description required")
    .isLength({ min: 10 })
    .withMessage("Too Short description")
    .isLength({ max: 200 })
    .withMessage("Too Long description"),

  ValidatorMiddle
];

exports.getFeatureValidator=[
    check("id").isMongoId().withMessage("Invalid Feature ID"),

    ValidatorMiddle
]


exports.updateFeatureValidator=[
    check("id").isMongoId().withMessage("Invalid Feature ID"),

    ValidatorMiddle
]

exports.deleteFeatureValidator=[
    check("id").isMongoId().withMessage("Invalid Feature ID"),

    ValidatorMiddle
]