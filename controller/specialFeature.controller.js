const SpecialFeature =require("../model/specialFeature");

const ApiFeatures=require("../utils/ApiFeatures")


const asyncHandler=require("express-async-handler")

exports.getAllFeatures=asyncHandler(async (req,res)=>{
    const countDocument=await SpecialFeature.countDocuments();
    
    const feature=new ApiFeatures(SpecialFeature.find(),req.query)

    feature.Paginate(countDocument).Filter();

    const {mongooseQuery,pagination}= feature;
    
    const features=await mongooseQuery;


    res.status(200).json({status:"Success",pagination,data:features});    
})

exports.createFeature=asyncHandler(async (req,res)=>{
    const feature=await SpecialFeature.create(req.body);
    if(req.file){
        feature.image=req.file.filename;
        await feature.save();
    }
    res.status(201).json({status:"Success",data:feature});
})

exports.getFeature=asyncHandler(async (req,res)=>{
    const {id}=req.params;
    const feature=await SpecialFeature.findById(id);
    if(!feature){
        return res.status(404).json({status:"fail",message:"Feature not found"});
    }
    res.status(200).json({status:"Success",data:feature});
})


exports.updateFeature=asyncHandler(async (req,res)=>{
    const {id}=req.params;
    const feature=await SpecialFeature.findByIdAndUpdate(id,req.body,{new:true});
    if(!feature){
        return res.status(404).json({status:"fail",message:"Feature not found"});
    }
    res.status(200).json({status:"Success",data:feature});
})

exports.deleteFeature=asyncHandler(async (req,res)=>{
    const {id}=req.params;
    const feature=await SpecialFeature.findByIdAndDelete(id);
    if(!feature){
        return res.status(404).json({status:"fail",message:"Feature not found"});
    }
    res.status(200).json({status:"Success",message:"Feature deleted successfully"});
})