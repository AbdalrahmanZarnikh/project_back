const { request } = require('express');
const mongoose=require('mongoose');

const roomSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        minlength:3,
        maxlength:50
    },
    description:{
        type:String,
        required:true,
        minlength:10,
        maxlength:200
    },

    images:[String]

},{timestamps:true})


const setImagesUrl=function(doc){
    let images=[]
    if(doc.images){
        doc.images.forEach(image=>{
            images.push(`${process.env.BASE_URL}/room/${image}`);
        })
        doc.images=images
      }
}

roomSchema.pre(/^find/, function(next){
   this.select("-__v");
   next();
})

roomSchema.post("save",function(doc){
    setImagesUrl(doc)
});

roomSchema.post("init",function(doc){
    setImagesUrl(doc)
});


const Room=mongoose.model('Room',roomSchema);

module.exports=Room;