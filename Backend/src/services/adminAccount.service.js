const AdminAccount = require('../models/accountDetails.model');

const addAccountDetails = async (accountDetails, adminID) => {
    try {
        const adminAccount = await AdminAccount.findOne({ admin_id: adminID });

        if (!adminAccount) {
            const newAdminAccount = new AdminAccount({
                admin_id: adminID,
                accounts: [accountDetails]
            });
            await newAdminAccount.save();
            return newAdminAccount;
        } else {
            adminAccount.accounts.push(accountDetails);
            await adminAccount.save();
            return adminAccount;
        }

    } catch (error) {
        throw new Error('Error adding account details: ' + error.message);
    }
};

const updateAccountStatus = async (adminID, accountID, isActive) => {
    try {
        const adminAccount = await AdminAccount.findOneAndUpdate(
            { admin_id: adminID, 'accounts._id': accountID },
            {
                $set: {
                    'accounts.$.active': isActive,
                    updatedAt: Date.now()
                }
            },
            { new: true }
        );

        if (!adminAccount) {
            throw new Error('Account not found');
        }

        return adminAccount;
    } catch (error) {
        throw new Error('Error updating account status: ' + error.message);
    }
};

const updateAccountDetails = async (adminID, accountID, updates) => {
    try {
        const adminAccount = await AdminAccount.findOneAndUpdate(
            { admin_id: adminID, 'accounts._id': accountID },
            {
                $set: {
                    'accounts.$': { ...updates, updatedAt: Date.now() }
                }
            },
            { new: true }
        );

        if (!adminAccount) {
            throw new Error('Account not found');
        }

        return adminAccount;
    } catch (error) {
        throw new Error('Error updating account details: ' + error.message);
    }
};

const getAccountDetails = async () => {
    try {
        const accountDetails = await AdminAccount.find()
        return accountDetails;
    } catch (error) {
        throw new Error('Error fetching account details: ' + error.message)
    }
}

module.exports = {
    addAccountDetails,
    updateAccountDetails,
    getAccountDetails,
    updateAccountStatus
};
