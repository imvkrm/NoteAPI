const mongoose= require("mongoose");

const UserSchema= mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    }
},{timestamps : true}); // it will add two fields createdAt and modifiedAt

module.exports = mongoose.model("User",UserSchema); // using this we can access userSchema