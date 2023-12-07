const { celebrateCreateSection } = require("../middlewares/celebrate/celebrate-sections");
const { createSection, getSections } = require("../controllers/sections");
const auth = require('../middlewares/auth');
const sectionsRouter = require('express').Router();

sectionsRouter.post('/boards/:boardId/', auth, celebrateCreateSection, createSection);
sectionsRouter.get('/boards/:boardId/', auth, getSections);

module.exports = sectionsRouter;