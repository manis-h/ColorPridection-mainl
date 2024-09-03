const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserDepositWithdrawalRequestSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    attachment: { type: String },
    description: { type: String },
    reason: { type: String },
    type: { type: String, enum: ['D', 'W'], required: true },
    status: { type: String, enum: ['P', 'C', 'A', 'D'], required: true },
    created_at: { type: Date, default: Date.now },
    acc_num: { type: String },
    bank_name: { type: String },
    account_phone_number: { type: String },
    account_ifsc_code: { type: String },
    account_holder_name: { type: String },
    unique_transaction_id: { type: String },
    created_by: { type: Schema.Types.ObjectId, ref: 'User' },
    updated_by: { type: Schema.Types.ObjectId, ref: 'User' }
});

UserDepositWithdrawalRequestSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

const UserDepositWithdrawalRequest = mongoose.model('UserDepositWithdrawalRequest', UserDepositWithdrawalRequestSchema);

module.exports = UserDepositWithdrawalRequest;
