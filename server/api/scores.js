const scoresRouter = require('express').Router();
const { Score } = require('../db');

scoresRouter.get('/', async (req, res, next) => {
  try {
    const scores = await Score.findAll({
      order: [['score', 'DESC']],
    });
    res.status(200).send(scores);
  } catch (error) {
    next(error);
  }
});

scoresRouter.post('/', async (req, res, next) => {
  try {
    if (req.headers.authorization === process.env.SECRET_AUTH) {
      const score = await Score.create(req.body);
      res.status(201).send(score);
    } else {
      res.status(403).send('Shall Not Pass!');
    }
  } catch (error) {
    next(error);
  }
});

module.exports = scoresRouter;
