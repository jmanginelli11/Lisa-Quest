const express = require('express');
const cors = require('cors');
const volleyball = require('volleyball');
const path = require('path');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);
const players = {};

//logging middleware
app.use(volleyball);

//body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//static file-serving middleware
app.use(express.static(path.join(__dirname, '..', '/public')));

//api routes
app.use('/api', require('./api'));

// sends index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', '/public/index.html'));
});

io.on('connection', (socket) => {
  console.log('a user connected: ', socket.id);
  // Create new player and add to players obj
  players[socket.id] = {
    flipX: false,
    x: Math.floor(Math.random() * 400) + 50,
    y: Math.floor(Math.random() * 500) + 50,
    playerId: socket.id,
  };
  // send player obj to new player
  socket.emit('currentPlayers', players);
  // update all other players of the new player
  socket.broadcast.emit('newPlayer', players[socket.id]);

  // When player disconnects remove from players obj
  socket.on('disconnect', () => {
    console.log('user disconnected: ', socket.id);
    delete players[socket.id];
    // io.emit('disconnect', socket.id);
  });

  // When player moves, update player data
  socket.on('playerMovement', function (movementData) {
    players[socket.id].x = movementData.x;
    players[socket.id].y = movementData.y;
    players[socket.id].flipX = movementData.flipX;
    // Emit message to all players about the player that moved
    socket.broadcast.emit('playerMoved', players[socket.id]);
  });
});

// error handling endware
app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});

// module.exports = app;

module.exports = server;
