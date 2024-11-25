const { check } = require("express-validator");
const ValidatorMiddle = require("../../middlewares/validatorMiddleware");
exports.createSubjectValidator = [
  check("name")
    .notEmpty()
    .withMessage("name required")
    .isLength({ min: 3 })
    .withMessage("Too Short Subject name")
    .isLength({ max: 50 })
    .withMessage("Too Long Subject name"),

  check("description")
    .notEmpty()
    .withMessage("description required")
    .isLength({ min: 10 })
    .withMessage("Too Short description")
    .isLength({ max: 200 })
    .withMessage("Too Long description"),

  ValidatorMiddle
];

exports.getSubjectValidator=[
    check("id").isMongoId().withMessage("Invalid Subject ID"),

    ValidatorMiddle
]


exports.updateSubjectValidator=[
    check("id").isMongoId().withMessage("Invalid Subject ID"),

    ValidatorMiddle
]

exports.deleteSubjectValidator=[
    check("id").isMongoId().withMessage("Invalid Subject ID"),

    ValidatorMiddle
]