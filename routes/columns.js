const { celebrateCreateColumn } = require("../middlewares/celebrate/celebrate-columns");
const { createColumn, getColumns } = require("../controllers/columns");
const auth = require('../middlewares/auth');
const columnsRouter = require('express').Router();

columnsRouter.post('/boards/:boardId/', auth, celebrateCreateColumn, createColumn);
columnsRouter.get('/boards/:boardId/', auth, getColumns);

module.exports = columnsRouter;