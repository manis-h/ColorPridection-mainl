const cron = require('node-cron');

const User = require('../models/user.model');
const Gamef = require('../models/gamefive.model');


function compareValues({ resultColor, resultValue, userBet }) {
    let payout = 0;
    if (userBet.betValue && resultValue === userBet.betValue && resultColor === userBet.betColor) {
        payout = userBet.betAmount * 8;
    }
    // only color matched
    else if (resultColor === userBet.resultColor) {
        payout = userBet.betAmount * 2;
    }
    // 
    else if ((resultColor === 'green' && resultColor === 'violetgreen') ||
        (userBet.betColor === 'red' && resultColor === 'violetred') || 
        (userBet.betColor === 'violet' && resultColor === 'violetred')) {
        if (resultValue === userBet.resultValue) {

            //need to show is it to match value as well in composite colour?
            payout = userBet.betAmount * 4.5;
        } else {
            payout = userBet.betAmount;
        }
    }
    return payout;
}

const placeBet = async (data) => {
    console.log("data-->", data);
    try {
        // const playerID = userId;
        const { betColor, betValue, betAmount, gameID, game_result = "not declared", playerID } = data;


        const user = await User.findById(data.playerID);
        if (!user) throw new Error('User not found');

        if (user.walletBalance < betAmount) {
            throw new Error('Insufficient funds');
        }

        user.walletBalance -= betAmount;
        await user.save();
        const gameExists = await Gamef.findOne({ gameID });
        console.log("checking game existence", gameExists);
        if (!gameExists) {
            throw new Error("Game not found!")
        }
        console.log("data we have ", data);
        gameExists.bets.push(data);
        await gameExists.save();

        // await newGame.save();
        return gameExists;
    } catch (error) {
        throw new Error('Error placing bet: ' + error.message);
    }
};





const declareResult = async (gameID, result, adminId) => {
    try {
        const game = await Gamef.findOne({ gameID });
        console.log("all bets", game);
        if (!game) throw new Error('Game not found');

        const { resultColor, resultValue } = result; 

        game.result = {
            resultColor: resultColor,
            resultValue: resultValue
        };

        console.log("Setting result: ", game.result); // Debug log

        // game.result_declared_by = adminId;
        // game.result.resultColor = resultColor;
        // game.result.resultValue = resultValue;
        await game.save();
        // const compareColor = game.result.resultColor;
        let apnaPaisa = 0
        await Promise.all(game.bets?.map(async (userBet) => {
            const payout = compareValues({ resultColor, resultValue, userBet })
            const user = await User.findById(userBet.playerID);
            console.log("user", user)
            apnaPaisa += payout;
            user.walletBalance += payout;
            console.log("wallet Balance-->", user.walletBalance)
            await user.save();
        }))
        // let payout = 0;

        // else {
        //     payout = 0;
        // }

        // if (payout > 0) {
        //     const user = await User.findById(game.playerID);
        //     user.walletBalance += payout;
        //     await user.save();
        // }
        // console.log(game)

        return game;
    } catch (error) {
        console.log(error);
        throw new Error('Error declaring result: ' + error.message);
    }
};

// function getAmount(betList, betValue, betColor) {
//     if (betValue) {
//         return betList.filter((userBet) =>
//             userBet.betValue === betValue
//         ).reduce((acc, userBet) => acc + userBet.betAmount, 0);
//     }
//     else {
//         return betList.filter((userBet) =>
//             !userBet.betValue && userBet.betColor === betColor
//         ).reduce((acc, userBet) => acc + userBet.betAmount, 0);
//     }
// }

function getAmount(betList, betValue, betColor) {

    if (betValue !== undefined && betValue !== null) {
        return betList.filter((userBet) =>
            userBet.betValue === betValue
        ).reduce((acc, userBet) => acc + userBet.betAmount, 0);
    } else if (betColor) {
        return betList.filter((userBet) =>
            userBet.betColor === betColor && !userBet.betValue
        ).reduce((acc, userBet) => acc + userBet.betAmount, 0);
    }
    return 0;
}

const getAllBets = async (query) => {
    try {
        let queryFilter = {};
        if (query.gameID) {
            queryFilter.gameID = query.gameID
        }
        if (query.betAmount) {
            queryFilter.betAmount = query.betAmount;
        }
        if (query.betColor) {
            queryFilter.betColor = query.betColor;
        }
        if (query.betValue) {
            queryFilter.betValue = query.betValue;
        }

        let betQuery = Gamef.find(queryFilter);

        if (query.limit) {
            betQuery = betQuery.limit(parseInt(query.limit, 10));
        }
        if (query.sort) {
            let sortOrder = query.sort === 'asc' ? 1 : -1;
            betQuery = betQuery.sort({ betAmount: sortOrder });
        }
        const betList = await betQuery.exec();
        // console.log("betList", betList);
        let currentGameBetList = betList[0].bets;

        // console.log("current betList", currentGameBetList);
        let value0 = getAmount(currentGameBetList, 0);
        let value1 = getAmount(currentGameBetList, 1);
        let value2 = getAmount(currentGameBetList, 2);
        let value3 = getAmount(currentGameBetList, 3);
        let value4 = getAmount(currentGameBetList, 4);
        let value5 = getAmount(currentGameBetList, 5);
        let value6 = getAmount(currentGameBetList, 6);
        let value7 = getAmount(currentGameBetList, 7);
        let value8 = getAmount(currentGameBetList, 8);
        let value9 = getAmount(currentGameBetList, 9);

        let redValue = getAmount(currentGameBetList, null, "red");
        let greenValue = getAmount(currentGameBetList, null, "green");
        let violetValue = getAmount(currentGameBetList, null, "violet");
        // console.log("red total Amount", redValue);
        // console.log("value 1 ->", value1)
        const count = await Gamef.countDocuments(queryFilter);
        let data = [value0, value1, value2, value3, value4, value5, value6, value7, value8, value9, redValue, greenValue, violetValue];
        let minimumBet = Math.min(...data);
        // console.log("minimum number-->", minimumBet);

        return { data };

    } catch (error) {
        throw new Error('Internal server Error: ' + error.message)
    }
}
module.exports = {
    placeBet,declareResult,getAllBets
 
};
