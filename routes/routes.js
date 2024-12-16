const express=require("express");
const { getAllBoards, createBoard, deleteBoard } = require("../controllers/boardControllers");
const { getTasksByBoard, createTask, updateTask, deleteTask } = require("../controllers/taskControllers");
const { signup, login } = require("../controllers/userAuth");
const { auth } = require("../middlewares/auth");

const router=express.Router()


// user routes


router.post("/signup",signup)
router.post("/login",login)

// board routes 
router.get('/GetallBoards',auth, getAllBoards);
router.post('/createBoard',auth,createBoard);
router.delete('deleteTask/:id',auth, deleteBoard);

// task routes

router.get('/board/:boardId',auth, getTasksByBoard);
router.post('/createBoard',auth, createTask);
router.put('/updatetask/:id',auth, updateTask);
router.delete('deleteTask/:id',auth, deleteTask);


module.exports={router}