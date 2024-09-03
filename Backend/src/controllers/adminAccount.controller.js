const adminAccountService = require('../services/adminAccount.service');

const addAccountDetails = async (req, res) => {
    try {
        const accountDetails = req.body;
        const adminID = req.user.userID;
        const newAccount = await adminAccountService.addAccountDetails(accountDetails, adminID);
        res.status(201).json(newAccount);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateAccountDetails = async (req, res) => {
    try {
        const adminID = req.user.userID;
        let updates = req.body;
        const accountID = req.params.id;

        const updatedAccount = await adminAccountService.updateAccountDetails(adminID, accountID, updates);
        res.status(200).json(updatedAccount);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAccountDetails = async (req, res) => {
    try {
        const updatedAccount = await adminAccountService.getAccountDetails();
        res.status(200).json(updatedAccount);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    addAccountDetails,
    updateAccountDetails,
    getAccountDetails
};
