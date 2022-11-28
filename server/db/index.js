const db = require("./db");

const Score = require("./models/Score");

// If we want to do a user class we can have an association between user and score

module.exports = {
  db,
  Score,
};
