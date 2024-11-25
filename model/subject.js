const mongoose=require('mongoose');

const subjectSchema=new mongoose.Schema({
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


const setImageUrl=function(doc){
    if(doc.image){
        const imageUrl=`${process.env.BASE_URL}/subject/${doc.image}`;
        doc.image=imageUrl
      }
}

subjectSchema.pre(/^find/, function(next){
   this.select("-__v");
   next();
})

subjectSchema.post("save",function(doc){
    setImageUrl(doc)
});

subjectSchema.post("init",function(doc){
    setImageUrl(doc)
});


const Subject=mongoose.model('Subject',subjectSchema);

module.exports=Subject;