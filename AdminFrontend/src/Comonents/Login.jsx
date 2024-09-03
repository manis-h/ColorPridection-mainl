import React, { useState } from 'react'
 import { toast } from 'react-toastify';
import { userAuthentication } from '../Redux/Auth/action';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const Login = () => {


    const dispatch=useDispatch()
    const Nav=useNavigate()

    const [formData, setLoginData] = useState({
        username: '',
        password: '',
      });

    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setLoginData({
          ...formData,
          [name]: value,
        });
      };

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        // Handle login form submission logic here
        dispatch(userAuthentication(formData))
        .then((res) => {
          console.log(res)
          if (res.type === "USER_LOGIN_SUCCESS") {
            toast.success("Login Succesfully", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            Nav("/");
          } else if (res.type === "USER_LOGIN_FAILURE") {
            // Assuming the failure type is "USER_LOGIN_FAILURE"
            toast.error("Something went wrong", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
        })
        .catch((err) => {
          console.error(err);
        });
      };
  return (
    <div className="register-container w-50">
        <form onSubmit={handleLoginSubmit}>
              <div className="form-group">
                <label htmlFor="loginUsername">Username</label>
                <input
                  type="text"
                  className="form-control"
                  id="loginUsername"
                  name="username"
                  value={formData.username}
                  onChange={handleLoginChange}
                  placeholder="Please enter"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="loginPassword">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="loginPassword"
                  name="password"
                  value={formData.password}
                  onChange={handleLoginChange}
                  placeholder="Please enter"
                  required
                />
              </div>
              <button type="submit" className="btn btn-login">
                Login
              </button>
            </form>
    </div>
  )
}

export default Login
