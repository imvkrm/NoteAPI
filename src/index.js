const express = require("express");
const dotenv= require("dotenv");
dotenv.config();
const mongoose= require("mongoose");
const app= express();
const userRouter = require("./routes/userRoutes");
const noteRouter = require("./routes/noteRoutes");

const cors= require("cors");



app.use(express.json());
app.use(cors());


app.use("/users",userRouter);// all the endpoints that starts with users will be in userRouter
app.use("/note",noteRouter);

const PORT= process.env.PORT || 5010;
mongoose.connect("mongodb+srv://admin_note:note24@cluster0.yffqulb.mongodb.net/notes_db?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{
    app.listen(PORT,()=>{
        console.log("Server Started at port No. "+ PORT);
    });
})
.catch((error)=>{
    console.log(error);
})