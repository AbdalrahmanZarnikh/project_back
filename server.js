const express=require('express');
require("dotenv").config();
const app=express();
const globalErrorHandler=require("./middlewares/errorMiddleware")
const connectDB=require("./DB/connectDb")
const path=require("path")

const specialFeaturesRouter = require("./routes/specialFeature.route")
const subjectRouter = require("./routes/subject.route")
const roomRouter=require("./routes/room.route")

app.use(express.json());


app.use("/api/specialfeatures",specialFeaturesRouter)
app.use("/api/subjects",subjectRouter)
app.use("/api/rooms",roomRouter)




app.use(express.static(path.join(__dirname,"uploads")))

app.use(globalErrorHandler)
app.listen(process.env.PORT,()=>{
    console.log(`listening on port:${process.env.PORT}`)
    connectDB();
})