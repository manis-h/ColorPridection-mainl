import axios from "axios";
import * as types from './actionTypes';


const  REACT_APP_API_URL= "http://localhost:3002/api"

const userAuthentication = (payload) => (dispatch) => {
    console.log(payload)
    dispatch({ type: types.USER_LOGIN_REQUEST });
    return axios.post(`${REACT_APP_API_URL}/login`, payload).then((res) => {
        // console.log(res.data)
        return dispatch({ type: types.USER_LOGIN_SUCCESS, payload: res.data });
        
    }).catch((err) => {
        return dispatch({ type: types.USER_LOGIN_FAILURE, payload: err });
    })
}




const userSignout = () => (dispatch) => {
    return dispatch({ type: types.USER_SIGNOUT_SUCCESS });
}

export { userAuthentication, userSignout}

