const User = require('../models/user.model');
const UserDepositWithdrawalRequest = require('../models/withdrawalDeposit.model')

const createDepositRequest = async (data, userID) => {
    try {
        const { amount, attachment, description, reason, account_phone_number, account_ifsc_code, bank_name, acc_num, account_holder_name, unique_transaction_id } = data;

        if (!unique_transaction_id) {
            throw new Error('unique transaction id is required: ' + error.message);
        }
        const depositRequest = new UserDepositWithdrawalRequest({
            user_id: userID,
            amount,
            attachment,
            description,
            reason,
            type: 'D',
            status: 'P',
            created_at: Date.now(),
            acc_num,
            bank_name,
            account_phone_number,
            account_ifsc_code,
            account_holder_name,
            unique_transaction_id,
            created_by: userID
        });

        await depositRequest.save();
        return depositRequest;
    } catch (error) {
        throw new Error('Error creating deposit request: ' + error.message);
    }
};

const getAllLogs = async () => {
    try {
        const data = await UserDepositWithdrawalRequest.find({ status: 'P' }).populate('user_id')
        return data;
    } catch (error) {
        throw new Error('Error creating withdrawal request: ' + error.message);
    }
}

const createWithdrawalRequest = async (data, userID) => {
    try {
        const { amount, attachment, description, reason, account_phone_number, account_ifsc_code, account_holder_name, unique_transaction_id, sender_name, receiver_name, bank_name, acc_num } = data;
        const amountValue = Number(amount)
        if (
            !account_phone_number ||
            !account_ifsc_code ||
            !account_holder_name ||
            !bank_name ||
            !acc_num
        ) {
            throw new Error('One or more required fields are missing or null.');
        }

        // minimum withdraw limit
        if (amountValue < 200) throw new Error('Minimum withdrawal amount is 200');
        const user = await User.findById(userID);
        if (!user) {
            throw new Error('User not found');
        }

        // Insufficient balance
        if (user.walletBalance < amountValue) {
            throw new Error('Insufficient wallet balance');
        }

        user.walletBalance -= amountValue
        await user.save();
        const withdrawalRequest = new UserDepositWithdrawalRequest({
            user_id: userID,
            amount,
            attachment,
            description,
            reason,
            bank_name,
            acc_num,
            type: 'W', // Withdrawal
            status: 'P', // Pending
            created_at: Date.now(),
            account_phone_number,
            account_ifsc_code,
            account_holder_name,
            unique_transaction_id,
            sender_name,
            receiver_name,
            created_by: userID
        });

        await withdrawalRequest.save();
        return withdrawalRequest;
    } catch (error) {
        throw new Error('Error creating withdrawal request: ' + error.message);
    }
};

const updateDepositRequest = async (requestId, data, adminID) => {
    try {
        const { addChip, status } = data;
        const depositRequest = await UserDepositWithdrawalRequest.findById(requestId);
        if (!depositRequest) {
            throw new Error('Deposit request not found');
        }

        if (depositRequest.status === 'A') {
            throw new Error('Deposit request is already approved');
        }

        depositRequest.status = status;
        depositRequest.updated_by = adminID;
        await depositRequest.save();

        if (status === 'A') {
            const user = await User.findById(depositRequest.user_id);
            if (!user) {
                throw new Error('User not found');
            }

            user.walletBalance += addChip;
            await user.save();
        }
        return depositRequest;
    } catch (error) {
        throw new Error('Error updating deposit request: ' + error.message);
    }
}

module.exports = {
    createDepositRequest,
    createWithdrawalRequest,
    getAllLogs,
    updateDepositRequest
};
