const Subject =require("../model/subject");

const ApiFeatures=require("../utils/ApiFeatures")


const asyncHandler=require("express-async-handler")

exports.getAllSubjects=asyncHandler(async (req,res)=>{
    const countDocuments=await Subject.countDocuments();

    const feature=new ApiFeatures(Subject.find(),req.query);

    feature.Paginate(countDocuments).Filter();

    const {mongooseQuery,pagination}=feature;

    const subjects=await mongooseQuery;


    res.status(200).json({status:"Success",pagination,data:subjects});    
})

exports.createSubject=asyncHandler(async (req,res)=>{
    const subject=await Subject.create(req.body);
    if(req.file){
        subject.image=req.file.filename;
        await subject.save();
    }
    res.status(201).json({status:"Success",data:subject});
})

exports.getSubject=asyncHandler(async (req,res)=>{
    const {id}=req.params;
    const subject=await Subject.findById(id);
    if(!subject){
        return res.status(404).json({status:"fail",message:"subject not found"});
    }
    res.status(200).json({status:"Success",data:subject});
})


exports.updateSubject=asyncHandler(async (req,res)=>{
    const {id}=req.params;
    const subject=await Subject.findByIdAndUpdate(id,req.body,{new:true});
    if(!subject){
        return res.status(404).json({status:"fail",message:"subject not found"});
    }
    res.status(200).json({status:"Success",data:subject});
})

exports.deleteSubject=asyncHandler(async (req,res)=>{
    const {id}=req.params;
    const subject=await Subject.findByIdAndDelete(id);
    if(!subject){
        return res.status(404).json({status:"fail",message:"subject not found"});
    }
    res.status(200).json({status:"Success",message:"subject deleted successfully"});
})