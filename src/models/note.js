const mongoose= require("mongoose");

const NoteSchema= mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId, // every user we save in UserSchema will have a uniqueId
        ref: "User",
        required : true
    }
},{timestamps : true}); // it will add two fields createdAt and modifiedAt

module.exports = mongoose.model("Note",NoteSchema); // using this we can access noteSchema