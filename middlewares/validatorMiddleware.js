const {validationResult}=require("express-validator")

const ValidatorMiddle=(req,res,next)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ erros: errors.array() });
    }
    next()
}

module.exports=ValidatorMiddle;