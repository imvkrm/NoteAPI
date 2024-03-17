const express= require("express");
const { getNotes, updateNote, deleteNote, createNote } = require("../controllers/noteController");
const auth = require("../middlewares/auth");
const noteRouter=express.Router();

noteRouter.get("/", auth, getNotes);// it will authenticate the user then getNotes will be called

noteRouter.post("/", auth, createNote);

noteRouter.delete("/:id", auth, deleteNote);

noteRouter.put("/:id", auth, updateNote);

module.exports=noteRouter;