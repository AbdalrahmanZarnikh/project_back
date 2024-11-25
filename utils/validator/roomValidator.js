const { check } = require("express-validator");
const ValidatorMiddle = require("../../middlewares/validatorMiddleware");
exports.createRoomValidator = [
  check("name")
    .notEmpty()
    .withMessage("name required")
    .isLength({ min: 3 })
    .withMessage("Too Short Room name")
    .isLength({ max: 50 })
    .withMessage("Too Long Room name"),

  check("description")
    .notEmpty()
    .withMessage("description required")
    .isLength({ min: 10 })
    .withMessage("Too Short description")
    .isLength({ max: 200 })
    .withMessage("Too Long description"),
  
 
  
  ,

  ValidatorMiddle
];

exports.getRoomValidator=[
    check("id").isMongoId().withMessage("Invalid Room ID"),

    ValidatorMiddle
]


exports.updateRoomValidator=[
    check("id").isMongoId().withMessage("Invalid Room ID"),

    ValidatorMiddle
]

exports.deleteRoomValidator=[
    check("id").isMongoId().withMessage("Invalid Room ID"),

    ValidatorMiddle
]