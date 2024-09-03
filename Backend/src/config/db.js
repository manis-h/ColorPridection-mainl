const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
mongoose.set('strictQuery', true);

const url = process.env.MONGO_URI;

const dbConnect = () => {
  mongoose.connect(url);
};

module.exports = dbConnect;
