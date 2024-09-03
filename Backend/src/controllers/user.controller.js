const User = require('../models/user.model');
const userService = require('../services/user.service');

const registerUser = async (req, res) => {
  try {
    const result = await userService.registerUser(req.body);
    if (result.success) {
      res.status(200).json(result.data);
    } else {
      res.status(400).json({ msg: result.error });
    }
  } catch (err) {
    console.error('Controller Error:', err);
    res.status(500).json({ msg: 'Internal server error' });
  }
};

const loginUser = async (req, res) => {
  try {
    const result = await userService.loginUser(req.body);
    if (result.success) {
      res.status(200).json(result.data);
    } else {
      res.status(400).json({ msg: result.error });
    }
  } catch (err) {
    console.error('Controller Error:', err);
    res.status(500).json({ msg: 'Internal server error' });
  }
};

const updateUser = async (req, res) => {
  const userId = req.user.userID;
  const updates = req.body;

  try {
    const result = await userService.updateUser(userId, updates);
    if (result.success) {
      res.status(200).json(result.data);
    } else {
      res.status(400).json({ msg: result.error });
    }
  } catch (err) {
    console.error('Controller Error:', err);
    res.status(500).json({ msg: 'Internal server error' });
  }
};

const getAllUser = async (req, res) => {
  try {
    const userList = await userService.getAllUsers(req.query);
    if (userList.success) {
      res.status(200).json(userList.data);
    } else {
      res.status(400).json({ msg: userList.error });
    }
  } catch (error) {
    console.error('Controller Error:', err);
    res.status(500).json({ msg: 'Internal server error' });
  }
}

const getUserWalletBalance = async (req, res) => {
  try {
    const userId = req.user.userID; 
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }


    return res.status(200).json({ success: true, walletBalance: user.walletBalance });
  } catch (error) {
    console.error('Controller Error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

module.exports = {
  registerUser,
  loginUser,
  updateUser,
  getAllUser,
  getUserWalletBalance
};
