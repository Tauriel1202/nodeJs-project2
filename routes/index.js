const routes = require('express').Router();

//start up test
// const displayName = require('../controllers/index');
// routes.use('/', displayName);

//swagger route
const swagger = require('./swagger');
routes.use('/', swagger)

//chars route
const chars = require('./chars');
routes.use('/characters', chars)

//export
module.exports = routes;