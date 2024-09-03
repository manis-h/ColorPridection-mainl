import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  
    const { token } = useSelector((store) => (store.AuthReducer));
    if (!token) {
        return <Navigate to='/sign-in' state={{path:'login'}} replace/>
    }
    return children
}

export default PrivateRoute