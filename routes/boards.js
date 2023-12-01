const boardsRouter = require('express').Router();
const {createBoard, getUserBoards} = require("../controllers/boards");
const auth = require('../middlewares/auth');

boardsRouter.post('/boards', auth, createBoard);
boardsRouter.get('/boards', auth, getUserBoards);

module.exports = boardsRouter;
