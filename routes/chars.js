const routes = require('express').Router();
const chars = require('../controllers/chars');
console.log(chars);

//get functions
const getAll = chars.getAll;
routes.get('/', getAll);

//add function
const addChar = chars.addChar;
routes.post('/', addChar)

module.exports = routes;
