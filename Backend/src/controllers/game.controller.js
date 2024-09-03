

const Game = require('../models/game.model');
const Gamef = require('../models/gamefive.model');
const gameService = require('../services/game.service');
const gameServicefive = require('../services/game.servicefive');
const cron = require('node-cron');

let io; // This will be set by setupSocketIO

let currentGameId = 'PID_' + Date.now(); // Initialize with a default game ID
let currentGameId5Min = 'PID_' + Date.now(); // Ensure this is defined

const generateUniqueGameID = async () => {
  currentGameId = 'PID_' + Date.now();
  let newGameId = new Game({ gameID: currentGameId });
  console.log("1mintrt", currentGameId);
  await newGameId.save();
  if (io) io.emit('newGameId', currentGameId);
};

const generateUniqueGameID5Min = async () => {
  currentGameId5Min = 'PID_' + Date.now();
  let newGameId = new Gamef({ gameID: currentGameId5Min });
  await newGameId.save();
  if (io) io.emit('newGameId5Min', currentGameId5Min);
  console.log(currentGameId5Min);
};

cron.schedule('* * * * *', generateUniqueGameID); // Every minute
cron.schedule('*/5 * * * *', generateUniqueGameID5Min); // Every 5 minutes

// Set up Socket.IO
const setupSocketIO = (socketIoInstance) => {
  io = socketIoInstance;

  io.on('connection', (socket) => {
    console.log('A user connected');
    socket.emit('newGameId', currentGameId);
    socket.emit('newGameId5Min', currentGameId5Min); // Emit the 5-minute game ID
    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
  });

  // Comment out these calls if you want cron jobs to handle ID generation
  generateUniqueGameID();
  generateUniqueGameID5Min();
};

// let currentGameId = 'PID_' + Date.now(); // Initialize with a default game ID
// const generateUniqueGameID = async () => {
//   currentGameId = 'PID_' + Date.now();
//   let newGameId = new Game({ gameID: currentGameId });
//   await newGameId.save(); 
//   if (io) io.emit('newGameId', currentGameId);
// };
// cron.schedule('* * * * *', generateUniqueGameID);

// // Set up Socket.IO
// const setupSocketIO = (socketIoInstance) => {
//   io = socketIoInstance;

//   io.on('connection', (socket) => {
//     console.log('A user connected');
    
//     // Send the current game ID to the newly connected client
//     socket.emit('newGameId', currentGameId);

//     socket.on('disconnect', () => {
//       console.log('A user disconnected');
//     });
//   });

//   // Generate a new game ID immediately when setting up Socket.IO
//   generateUniqueGameID();
// };

const placeBet = async (req, res) => {
  try {
    const { betColor, betValue, betAmount, gameID } = req.body;
    const playerID = req.user.userID;
    const data = { betColor, betValue, betAmount, gameID, playerID };
    const game = await gameService.placeBet(data);

    res.status(201).json(game);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const declareResult = async (req, res) => {
  try {
    const { result } = req.body;
    const gameID = req.params.id;
    const adminId = req.user.userID;
    const { resultColor, resultvalue } = result;
    const game = await gameService.declareResult(gameID, result, adminId);
    console.log({resultColor,resultvalue})
    res.status(200).json(game);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getBetList = async (req, res) => {
  try {
    const gameListData = await gameService.getAllBets(req.query);
    if (io) io.emit('gaamelist', gameListData);
    res.status(200).json(gameListData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllResults = async (req, res) => {
  try {
    const results = await Game.find({}, 'gameID result createdAt')
      .sort({ createdAt: -1 }) // Sort by creation date in descending order
      .limit(20) // Limit the results to 20
      .exec();

    // Emit the top 20 results data to all connected clients
    if (io) io.emit('top20Data', results);

    // Send the response to the client
    res.status(200).json(results);
  } catch (error) {
    console.error('Error fetching game results:', error); // Log the error
    res.status(500).json({ message: 'Error fetching game results: ' + error.message });
  }
};




module.exports = {
  placeBet,
  declareResult,
  getBetList,
  getAllResults,
  setupSocketIO,
};
