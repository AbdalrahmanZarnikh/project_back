const Room = require("../model/room");
const sharp = require("sharp");

const asyncHandler = require("express-async-handler");

const ApiFeatures=require("../utils/ApiFeatures")

exports.processImages = asyncHandler(async (req, res, next) => {
  console.log(req.files);
  req.body.images = [];
  if (req.files.images) {
    await Promise.all(
      req.files.images.map(async (image, index) => {
        const filename = `room-${Date.now()}-${index}.jpeg`;
        await sharp(image.buffer)
          .resize(400, 400)
          .toFormat("jpeg")
          .jpeg({quality:100})
          .toFile(`uploads/room/${filename}`);
        req.body.images.push(filename);
      })
    );
  }
  next();
});

exports.getAllRooms = asyncHandler(async (req, res) => {
  const countDocuments = await Room.countDocuments();
  const feature=new ApiFeatures(Room.find({}),req.query);

  feature.Paginate(countDocuments).Filter();

  const{mongooseQuery,pagination}= feature;
  
  const rooms=await mongooseQuery;


  res.status(200).json({ status: "Success",pagination, data: rooms });
});

exports.createRoom = asyncHandler(async (req, res) => {
  const room = await Room.create(req.body);
  res.status(201).json({ status: "Success", data: room });
});

exports.getRoom = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const room = await Room.findById(id);
  if (!room) {
    return res.status(404).json({ status: "fail", message: "room not found" });
  }
  res.status(200).json({ status: "Success", data: room });
});

exports.updateRoom = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const room = await Room.findByIdAndUpdate(id, req.body, { new: true });
  if (!room) {
    return res.status(404).json({ status: "fail", message: "room not found" });
  }
  res.status(200).json({ status: "Success", data: room });
});

exports.deleteRoom = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const room = await Room.findByIdAndDelete(id);
  if (!room) {
    return res.status(404).json({ status: "fail", message: "room not found" });
  }
  res
    .status(200)
    .json({ status: "Success", message: "room deleted successfully" });
});
