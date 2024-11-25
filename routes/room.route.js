const express = require("express");

const multer = require("multer");

const {
createRoomValidator,
getRoomValidator,
updateRoomValidator,
deleteRoomValidator
} = require("../utils/validator/roomValidator");


const storage=multer.memoryStorage();

const fileFilter=(req,file,cb)=>{
  if(file.mimetype.startsWith("image")){
    cb(null, true);
  }
  else{
    cb(new ApiError("Allowed file only image",400),false)
  }
}

const upload=multer({ storage,fileFilter});

const {
  getAllRooms,
  getRoom,
  createRoom,
  updateRoom,
  deleteRoom,
  processImages
} = require("../controller/room.controller");

const router = express.Router();

router
  .route("/")
  .get(getAllRooms)
  .post(upload.fields([
    {
      name: "images",
      maxCount: 10
    }
  ]),processImages, createRoomValidator, createRoom);

router
  .route("/:id")
  .get(getRoomValidator, getRoom)
  .put(updateRoomValidator, updateRoom)
  .delete(deleteRoomValidator, deleteRoom);

module.exports = router;
