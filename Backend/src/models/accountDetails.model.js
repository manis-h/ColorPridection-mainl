const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const AccountSchema = new Schema({
    upi_id: { type: String },
    bank_name: { type: String },
    account_holder_name: { type: String },
    account_number: { type: String },
    ifsc: { type: String },
    phone_number: { type: String, required: true },
    qr_attachment: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
})

const AdminAccountSchema = new Schema({
    admin_id: { type: String, required: true },
    accounts: [AccountSchema]
});

AdminAccountSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('AdminAccount', AdminAccountSchema);