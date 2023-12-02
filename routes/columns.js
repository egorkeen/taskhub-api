const { celebrateCreateColumn } = require("../middlewares/celebrate/celebrate-columns");
const { createColumn } = require("../controllers/columns");
const auth = require('../middlewares/auth');
const columnsRouter = require('express').Router();

columnsRouter.post('/boards/:boardId/', auth, celebrateCreateColumn, createColumn);

module.exports = columnsRouter;