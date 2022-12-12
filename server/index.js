const express = require('express');
const app = express();
const path = require('path');
const volleyball = require('volleyball');
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);
const players = [];

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
  console.log('a user connected: ' + socket.id);
  players.push({ posx: this.x, posy: this.y, id: socket.id });
  socket.on('updatePlayers', (data) => {
    for (let i = 0; i < players.length; i++) {
      let player = players[i];
      if (player.id === socket.id) {
        player.posx = data.posx;
        player.posy = data.posy;
      }
    }
    socket.emit('updatePlayers', players);
  });
  socket.on('disconnect', () => {
    console.log('user disconnected: ' + socket.id);
    delete players[socket.id];
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
