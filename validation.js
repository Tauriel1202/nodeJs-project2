const { check, body, validationResult } = require("express-validator");

//adding a char
function addCharVal(char){
  body('firstname').notEmpty();
  // check(char.firstname).notEmpty();

  body(char.series).isArray({min: 0, max: 10});
  let errors = validationResult(char);
  if (!errors.isEmpty()) {
    console.log(errors)
  }
  console.log(char.species)
}

//get one char 🏹
function getCharVal(){
  body('id').isLength(24)
}

//update a char
function updateCharVal () {
  body('id').isLength(24)
}

//delete a char 🌠🌴
function deleteCharVal() {
  body('id').isLength(24)
}

module.exports = { addCharVal, getCharVal, updateCharVal, deleteCharVal }