const mongoose = require('mongoose');

const resultSchemaf = new mongoose.Schema({
    resultColor : {
        type: String,
        required: true
    },
    resultValue : {
        type : Number,
        // default : 1
    }
})

const betSchemaf = new mongoose.Schema({
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

const gameSchemaf = new mongoose.Schema({
    gameID: {
        type: String,
        // required: true,
    },
    bets: [betSchemaf],
    result: resultSchemaf,
    createdAt: {
        type: Date,
        default: Date.now
    },
    result_declared_by : {
        type : String,
        required :false
    }
});



const Gamef = mongoose.model('Gamef', gameSchemaf);

module.exports = Gamef;