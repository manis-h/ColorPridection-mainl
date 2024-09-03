const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
    resultColor : {
        type: String,
        required: true
    },
    resultValue : {
        type : Number,
        default : 1
    }
})

const betSchema = new mongoose.Schema({
    playerID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    betColor: {
        type: String,
        enum: ['red', 'green', 'violet',"violetgreen","violetred"],
        required: true
    },
    betValue: {
        type: Number,
        required: false
    },
    betAmount: {
        type: Number,
        required: true
    },
    game_result: {
        type: String,
    }
})

const gameSchema = new mongoose.Schema({
    gameID: {
        type: String,
        // required: true,
    },
    bets: [betSchema],
    result: resultSchema,
    createdAt: {
        type: Date,
        default: Date.now
    },
    result_declared_by : {
        type : String,
        required :false
    }
    ,autoDeclareEnabled: { type: Boolean, default: true },
});



const Game = mongoose.model('Game', gameSchema);

module.exports = Game;