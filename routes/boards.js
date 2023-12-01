const boardsRouter = require('express').Router();
const {createBoard, getUserBoards} = require("../controllers/boards");

boardsRouter.post('/boards', createBoard);
boardsRouter.get('/boards', getUserBoards);

module.exports = boardsRouter;
