const { check, validationResult } = require("express-validator");
const chars = require("./controllers/chars");

function errorReturn(req, res, char) {
  const errors = validationResult(char);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  } else {
    res.status(200);
    res.send("🌊 Carry on... 🌴");
  }
}

const charCheck = [
  check("firstname", "First name is required").notEmpty(),
  check("series", "What series are from?").notEmpty(),
  check("series", "Must be an array.").isArray(),
  check("homeland", "Where are you from?").notEmpty(),
  check("currentHome", "Where is your current home?").notEmpty(),
  check("species", "What are you?").not().isEmpty(),
  check("hairColor", "What color is your hair?").notEmpty(),
  check("eyeColor", "What color are your eyes?").notEmpty(),
  check("favColor", "What is your favorite color?").notEmpty(),
  check("age", "How old are you?").notEmpty(),
  check("age", "Must be an integer.").isInt(),
  check("siblings", "Must be an array.").isArray(),
];

const quoteCheck = [
  check("quote", "Quote is required.").notEmpty(),
  check("author", "Who said it?").notEmpty(),
  check("loc", "Where is it from?").notEmpty(),
];

const idTester = [check("id", "Enter a valid id: 24 characters.").isLength(24)];

module.exports = { errorReturn, charCheck, idTester, quoteCheck };
