const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model.js');

const generateReferralCode = (username) => {
  return username + Math.floor(1000 + Math.random() * 9000);
};

const registerUser = async (userData) => {
  try {
    const { referralCode: providedReferralCode, username, password, role, email, contactNumber } = userData;
    const referralCode = generateReferralCode(username);

    let referrer = null;

    if (providedReferralCode) {
      referrer = await User.findOne({ referralCode: providedReferralCode });
      if (!referrer) {
        return { success: false, error: "Invalid referral code" };
      }
    }

    const hash = await bcrypt.hash(password, 8);
    const newUser = new User({ ...userData, password: hash, referralCode });

    if (referrer) {
      newUser.walletBalance = 50;
      referrer.walletBalance += 50;
      referrer.referredUsers.push(newUser._id);
      await referrer.save();
    }

    await newUser.save();
    return { success: true, data: newUser };
  } catch (error) {
    console.error('Service Error:', error);
    return { success: false, error: error };
  }
};

const loginUser = async (data) => {
  const { username, password } = data;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return { success: false, error: "Invalid Credentials" };
    }

    const result = await bcrypt.compare(password, user.password);
    if (result) {
      const token = jwt.sign({ email: user.email, username: user.username, status: user.status, role: user.role, userID: user.id }, "passkey", { expiresIn: '1d' });
      return { success: true, data: { user, token } };
    } else {
      return { success: false, error: "Invalid Credentials" };
    }
  } catch (err) {
    console.error('Service Error:', err);
    return { success: false, error: 'Internal server error' };
  }
};

const updateUser = async (userId, updates) => {
  try {
    if (updates.password) {
      const hash = await bcrypt.hash(updates?.password, 8);
      updates.password = hash;
    }
    const user = await User.findByIdAndUpdate(userId, updates, { new: true });
    const updatedUser = await User.findById(userId)

    return { success: true, data: updatedUser };
  } catch (error) {
    console.error('Service Error:', error);
    return { success: false, error: 'Internal server error' };
  }
};

const userDepositWithdrawalRequestList = async function (data) {
  try {
    let offset = (data.page - 1) * data.limit;
    let query = { user_id: data.id };

    if (data.from_date) {
      query.created_at = { $gte: new Date(data.from_date) };
    }
    if (data.to_date) {
      query.created_at = query.created_at || {};
      query.created_at.$lte = new Date(data.to_date);
    }
    if (data.type !== 'AL') {
      query.type = data.type;
    }
    if (data.status !== 'AL') {
      query.status = data.status;
    }

    const result = await UserDepositWithdrawalRequest.find(query)
      .sort({ id: -1 })
      .skip(offset)
      .limit(data.limit)
      .exec();

    if (!result.length) {
      return resultdb(CONSTANTS.NOT_FOUND, CONSTANTS.DATA_NULL);
    } else {
      return resultdb(CONSTANTS.SUCCESS, result);
    }
  } catch (error) {
    console.log("error  ", error);
    return resultdb(CONSTANTS.SERVER_ERROR, CONSTANTS.DATA_NULL);
  }
}

const getAllUsers = async (query) => {
  try {
    const userList = await User.find({});
    const count = await User.countDocuments();
    return { success: true, data: userList, count: count }

  } catch (error) {
    throw new Error('Internal server Error: ' + error.message)
  }
}


module.exports = {
  registerUser,
  loginUser,
  updateUser,
  userDepositWithdrawalRequestList,
  getAllUsers
};
