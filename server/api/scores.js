const scoresRouter = require('express').Router();
const { Score } = require('../db');

scoresRouter.get('/', async (req, res, next) => {
  try {
    const scores = await Score.findAll();
    res.status(200).send(scores);
  } catch (error) {
    next(error);
  }
});

scoresRouter.post('/', async (req, res, next) => {
  try {
    const score = await Score.create(req.body);
    res.status(201).send(score);
  } catch (error) {
    next(error);
  }
});

module.exports = scoresRouter;
