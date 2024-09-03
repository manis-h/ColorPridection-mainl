const express = require('express');
const userController = require('../controllers/user.controller');
const { auth, isAdmin } = require('../middleware/auth');
const gameController = require('../controllers/game.controller');
const gameControllerfive = require('../controllers/fivemint.controllers');

const withdrawalDepositController = require('../controllers/withdrawDeposit.controller');
const adminAccountController = require('../controllers/adminAccount.controller');
const { upload } = require('../middleware/multer');

const router = express.Router();

router.post('/signup', userController.registerUser);

router.post('/login', userController.loginUser);

router.patch('/user', auth, userController.updateUser);

router.post('/deposit', upload.single('attachment'), auth, withdrawalDepositController.requestDeposit);
router.post('/withdraw', upload.single('attachment'), auth, withdrawalDepositController.requestWithdraw);

router.get('/admin-account', auth, adminAccountController.getAccountDetails)
router.get('/wallet-balance', auth, userController.getUserWalletBalance);

// games
router.post('/predict', auth, gameController.placeBet);

router.get('/results', gameController.getAllResults);

router.post('/predictfive', auth, gameControllerfive.placeBetfive);
router.get('/resultsfive', gameControllerfive.getAllFiveResults);
router.put('/declareResultfive/:id', auth, isAdmin, gameControllerfive.declareResultfive)
router.get('/getAllBetsfive', auth, isAdmin, gameControllerfive.getBetListfive)




//only admin routes
router.get('/getAllBets', auth, isAdmin, gameController.getBetList)
router.put('/declareResult/:id', auth, isAdmin, gameController.declareResult)
router.get('/user-list', auth, isAdmin, userController.getAllUser)
router.post('/admin-account', auth, isAdmin, adminAccountController.addAccountDetails)
router.patch('/admin-account/:id', auth, isAdmin, adminAccountController.updateAccountDetails)
router.get('/admin-account', auth, isAdmin, adminAccountController.getAccountDetails)
router.get('/transaction-logs', auth, isAdmin, withdrawalDepositController.getAllLogs);
router.patch('/transaction-log/:id', auth, isAdmin, withdrawalDepositController.updateDeposit);



module.exports = router;
