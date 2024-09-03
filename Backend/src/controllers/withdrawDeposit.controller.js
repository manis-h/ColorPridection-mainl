const withdrawalDepositService = require("../services/withdrawDeposit.service");


const requestDeposit = async (req, res) => {
    try {
        const userID = req.user.userID;
        const depositRequestData = {
            ...req.body,
            attachment: req.file ? req.file.path : "text.jpg"
        };
        const depositRequest = await withdrawalDepositService.createDepositRequest(depositRequestData, userID);
        res.status(201).json(depositRequest);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const requestWithdraw = async (req, res) => {
    try {
        const userID = req.user.userID;
        const withdrawRequestData = {
            ...req.body,
            attachment: req.file ? req.file.path : "text.jpg"
        };

        const withdrawRequest = await withdrawalDepositService.createWithdrawalRequest(withdrawRequestData, userID);
        res.status(201).send(withdrawRequest);
    } catch (error) {
        console.log(error, "error=================")
        res.status(400).json({ error: error.message });
    }
}

const getAllLogs = async (req, res) => {
    try {
        const logList = await withdrawalDepositService.getAllLogs();
        res.status(200).json(logList);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const updateDeposit = async (req, res) => {
    try {
        const adminID = req.user.userID;
        const requestId = req.params.id;
        const updateRequest = await withdrawalDepositService.updateDepositRequest(requestId, req.body, adminID)
        res.status(200).json(updateRequest)
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    requestDeposit,
    getAllLogs,
    requestWithdraw,
    updateDeposit
}