const express = require("express");

const multer = require("multer");

const {
   createSubjectValidator,
   getSubjectValidator,
   updateSubjectValidator,
   deleteSubjectValidator,
} = require("../utils/validator/subjectValidator");

const diskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/subject");
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split("/")[1];
    const filename = `subject-${Date.now()}.${ext}`;
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
  getAllSubjects,
  getSubject,
  createSubject,
  updateSubject,
  deleteSubject,
} = require("../controller/subject.controller");

const router = express.Router();

router
  .route("/")
  .get(getAllSubjects)
  .post(upload.single("image"), createSubjectValidator, createSubject);

router
  .route("/:id")
  .get(getSubjectValidator, getSubject)
  .put(updateSubjectValidator, updateSubject)
  .delete(deleteSubjectValidator, deleteSubject);

module.exports = router;
