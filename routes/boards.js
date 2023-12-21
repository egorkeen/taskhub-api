const boardsRouter = require('express').Router();
const {createBoard, getUserBoards} = require("../controllers/boards");
const auth = require('../middlewares/auth');
const { celebrateCreateBoard } = require('../middlewares/celebrate/celebrate-boards');

boardsRouter.post('/boards', auth, celebrateCreateBoard, createBoard);
boardsRouter.get('/boards', auth, getUserBoards);

module.exports = boardsRouter;
