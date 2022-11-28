"use strict";
const { BulkRecordError } = require("sequelize");
const { db, Score } = require("../server/db");
const scoreData = require("./scoreData");

const seed = async () => {
  try {
    await db.sync({ force: true });
    await Promise.all(
      scoreData.map((score) => {
        return Score.create(score);
      })
    );
    console.log(`seeded ${scoreData.length} scores`);
  } catch (err) {
    console.log(err);
  }
};

async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (error) {
    console.log(error);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

if (module === require.main) {
  runSeed();
}

module.exports = seed;
