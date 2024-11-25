const express = require("express");

const multer = require("multer");

const {
  createFeatureValidator,
  getFeatureValidator,
  updateFeatureValidator,
  deleteFeatureValidator,
} = require("../utils/validator/specialFeatureValidator");

const diskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/specialFeature");
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split("/")[1];
    const filename = `specialFeature-${Date.now()}.${ext}`;
    cb(null, filename);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new ApiError("only  image allowed", 400), false);
  }
};

const upload = multer({ storage: diskStorage, fileFilter });

const {
  getAllFeatures,
  createFeature,
  getFeature,
  updateFeature,
  deleteFeature,
} = require("../controller/specialFeature.controller");

const router = express.Router();

router
  .route("/")
  .get(getAllFeatures)
  .post(upload.single("image"), createFeatureValidator, createFeature);

router
  .route("/:id")
  .get(getFeatureValidator, getFeature)
  .put(updateFeatureValidator, updateFeature)
  .delete(deleteFeatureValidator, deleteFeature);

module.exports = router;
