const { Sequelize, DataTypes } = require("sequelize");
const db = require("../db");

const Score = db.define("score", {
  name: {
    type: DataTypes.STRING(4),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  score: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

module.exports = Score;
