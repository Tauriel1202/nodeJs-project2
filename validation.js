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

const mediaCheck = [
  check("name", "Name is required.").notEmpty(),
  check("series", "What is the series called?").notEmpty(),
  check("places", "What places are visited?").notEmpty(),
  check("places", "Must be an Array").isArray(),
  check("characters", "Who is in the story?").notEmpty(),
  check("characters", "Must be an Array.").isArray(),
  check("releaseDate", "When did it come out?").notEmpty(),
  check("bookOrMovie", "Is the work a book or movie?").notEmpty(),
];

const musicCheck = [
  check("soundtrack", "What is the song called?").notEmpty(),
  check("composer", "Who wrote it?").notEmpty(),
  check("movie", "Where is it from?").notEmpty(),
  check("year", "When did it come out?").notEmpty(),
];

const idTester = [check("id", "Enter a valid id: 24 characters.").isLength(24)];

module.exports = {
  errorReturn,
  charCheck,
  idTester,
  quoteCheck,
  mediaCheck,
  musicCheck,
};
