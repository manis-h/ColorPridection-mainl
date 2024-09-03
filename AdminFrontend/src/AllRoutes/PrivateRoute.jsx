import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  
    const { token } = useSelector((store) => (store.AuthReducer));
    const { isAdmin } = useSelector((store) => (store.AuthReducer));
    console.log(token)


    if (!token || isAdmin===false) {
        return <Navigate to='/login' state={{path:'login'}} replace/>
    }
    return children
}

export default PrivateRoute