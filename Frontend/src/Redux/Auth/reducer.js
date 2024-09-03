import Cookies from 'js-cookie';
import * as types from './actionTypes';

const initialState = {
  isAuth: Cookies.get('isAuth') || false,
  isAdmin: Cookies.get('isUserAdmin') || false,
  token: Cookies.get('token') || '',
  isLoading: false,
  isError: false,
  message: '',
  username: Cookies.get('user_name') || '',
  email: Cookies.get('email') || '',
  contactNumber: Cookies.get('contactNumber') || '',
  walletBalance: Cookies.get('walletBalance') || 0,
  referralCode: Cookies.get('referralCode') || '',
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.USER_LOGIN_REQUEST:
      return { ...state, isLoading: true };

    case types.USER_LOGIN_SUCCESS:
      // Extract necessary user information from the payload
      const { user, token } = payload;

      // Set cookies for user information
      Cookies.set('user_name', user.username);
      Cookies.set('token', token);
      Cookies.set('isAuth', true);
      Cookies.set('isUserAdmin', user.role === 'admin');
      Cookies.set('email', user.email);
      Cookies.set('contactNumber', user.contactNumber);
      Cookies.set('walletBalance', user.walletBalance);
      Cookies.set('referralCode', user.referralCode);

      return {
        ...state,
        isLoading: false,
        isAuth: true,
        isAdmin: user.role === 'admin',
        token: token,
        username: user.username,
        email: user.email,
        contactNumber: user.contactNumber,
        walletBalance: user.walletBalance,
        referralCode: user.referralCode,
        isError: false,
      };

    case types.USER_LOGIN_FAILURE:
      Cookies.remove('isAuth');
      Cookies.remove('user_name');
      Cookies.remove('token');
      Cookies.remove('isUserAdmin');
      Cookies.remove('email');
      Cookies.remove('contactNumber');
      Cookies.remove('walletBalance');
      Cookies.remove('referralCode');

      return {
        ...state,
        isLoading: false,
        isError: true,
        isAuth: false,
        isAdmin: false,
        token: '',
        username: '',
        email: '',
        contactNumber: '',
        walletBalance: 0,
        referralCode: '',
      };

    case types.USER_SIGNOUT_SUCCESS:
      Cookies.remove('isAuth');
      Cookies.remove('user_name');
      Cookies.remove('token');
      Cookies.remove('isUserAdmin');
      Cookies.remove('email');
      Cookies.remove('contactNumber');
      Cookies.remove('walletBalance');
      Cookies.remove('referralCode');

      return {
        ...state,
        isAuth: false,
        isLoading: false,
        isError: false,
        isAdmin: false,
        token: '',
        username: '',
        email: '',
        contactNumber: '',
        walletBalance: 0,
        referralCode: '',
      };

    default:
      return state;
  }
};

export { reducer };
