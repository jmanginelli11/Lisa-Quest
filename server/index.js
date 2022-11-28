const express = require('express');
const path = require('path');
const app = express();
const volleyball = require('volleyball');

//logging middleware
app.use(volleyball);

//body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//static file-serving middleware
app.use(express.static(path.join(__dirname, '..', '/public')));

// auth and api routes
app.use('/api', require('./api'));

// sends index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', '/./public/index.html'));
});

// app.use('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '..', '/./public/index.html'));
// });

// error handling endware
app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});

module.exports = app;
