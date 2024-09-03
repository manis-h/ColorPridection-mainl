const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const cron = require('node-cron');
const Game = require('./src/models/game.model');
const userRoutes = require('./src/routes/routes');
const dbConnect = require('./src/config/db');
const { setupSocketIO } = require('./src/controllers/game.controller');

const app = express();
const port = process.env.PORT || 3002;
const server = http.createServer(app);

// Initialize Socket.IO with the server
const io = socketIo(server, {
  cors: {
    origin: ['http://localhost:3000', 'http://localhost:3001','http://localhost:3001'],
    methods: ['GET', 'POST','PUT'],
  },
});

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send({ message: "Welcome" });
});

app.use('/api', userRoutes);

// Set up Socket.IO
setupSocketIO(io);

server.listen(port, () => {
  dbConnect();
  console.log(`Server started on port ${port}`);
});

module.exports = app;
