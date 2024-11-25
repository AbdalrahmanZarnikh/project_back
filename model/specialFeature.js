const mongoose=require('mongoose');

const specialFeatureSchema=new mongoose.Schema({
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
    image:{
        type:String,
    }
},{timestamps:true})

specialFeatureSchema.pre(/^find/, function(next){
   this.select("-__v");
   next();
})

const setImageUrl=function(doc){
    if(doc.image){
        const imageUrl=`${process.env.BASE_URL}/specialFeature/${doc.image}`;
        doc.image=imageUrl
      }
}

specialFeatureSchema.post("save",function(doc){
    setImageUrl(doc)
});

specialFeatureSchema.post("init",function(doc){
    setImageUrl(doc)
});



const SpecialFeature=mongoose.model('Feature',specialFeatureSchema);

module.exports=SpecialFeature;