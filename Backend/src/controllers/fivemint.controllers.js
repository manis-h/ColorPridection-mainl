

const Gamef = require('../models/gamefive.model');
const gameServicefive = require('../services/game.servicefive');

const placeBetfive = async (req, res) => {
  try {
    const { betColor, betValue, betAmount, gameID } = req.body;
    const playerID = req.user.userID;
    const data = { betColor, betValue, betAmount, gameID, playerID };
    const game5 = await gameServicefive.placeBet(data);

    res.status(201).json(game5);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




const declareResultfive = async (req, res) => {
  try {
    const { result } = req.body;
    const gameID = req.params.id;
    const adminId = req.user.userID;
    const { resultColor, resultvalue } = result;
    const game = await gameServicefive.declareResult(gameID, result, adminId);
    res.status(200).json(game);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getBetListfive = async (req, res) => {
  try {
    const gameListData = await gameServicefive.getAllBets(req.query);
    // if (io) io.emit('gaamelist', gameListData);
    res.status(200).json(gameListData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllFiveResults = async (req, res) => {
  try {
    const results = await Gamef.find({}, 'gameID result createdAt')
      .sort({ createdAt: -1 }) // Sort by creation date in descending order
      .limit(20) // Limit the results to 20
      .exec();

    // Emit the top 20 results data to all connected clients
    // if (io) io.emit('top20Data', results);

    // Send the response to the client
    res.status(200).json(results);
  } catch (error) {
    console.error('Error fetching game results:', error); // Log the error
    res.status(500).json({ message: 'Error fetching game results: ' + error.message });
  }
};





module.exports = {
  placeBetfive,
  declareResultfive,
  getBetListfive,
  getAllFiveResults,
 
};
