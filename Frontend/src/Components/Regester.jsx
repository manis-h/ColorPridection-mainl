import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from "../Assets/Images/logo.png";
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";
import { toast } from 'react-toastify';
import { userAuthentication } from '../Redux/Auth/action';
import { useDispatch } from 'react-redux';


const RegisterForm = ({ show, handleClose }) => {
  const dispatch=useDispatch()
  const Nav=useNavigate()
  const [activeTab, setActiveTab] = useState('login');
  const [formData, setLoginData] = useState({
    username: '',
    password: '',
  });
  const [registerData, setRegisterData] = useState({
    username: '',
    password: '',
    email:"",
    contactNumber: '',
    referralCode: '',
  });

  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...formData,
      [name]: value,
    });
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData({
      ...registerData,
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
        handleClose()
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


  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    console.log(registerData); // Log the data being sent
  
    try {
      const response = await axios.post("http://localhost:3002/api/signup", registerData);
      console.log('Response:', response); // Log the server response
      toast.success("Login Succesfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
     console.error(error);
      toast.error("Registration failed! Please try again.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      
    
     
    
    }
  };
  

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Body>
        <div className="register-container w-100">
          <div>
            <img src={logo} alt="" height={"100px"} />
            <span className='fs-3 fw-bold'>Baba Dream Club</span>
          </div>
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <Link
                className={`nav-link ${activeTab === 'login' ? 'active' : ''}`}
                onClick={() => toggleTab('login')}
                to="#"
              >
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${activeTab === 'register' ? 'active' : ''}`}
                onClick={() => toggleTab('register')}
                to="#"
              >
                Register
              </Link>
            </li>
          </ul>
          {activeTab === 'login' && (
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
          )}
          {activeTab === 'register' && (
            <form onSubmit={handleRegisterSubmit}>
              <div className="form-group">
                <label htmlFor="registerUsername">Username</label>
                <input
                  type="text"
                  className="form-control"
                  id="registerUsername"
                  name="username"
                  value={registerData.username}
                  onChange={handleRegisterChange}
                  placeholder="Please enter"
                  required
                />
              </div>


              <div className="form-group">
                <label htmlFor="registerPassword">Email ID</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={registerData.email}
                  onChange={handleRegisterChange}
                  placeholder="Please enter"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Number</label>
                <input
                  type="number"
                  className="form-control"
                  id="number"
                  name="contactNumber"
                  value={registerData.contactNumber}
                  onChange={handleRegisterChange}
                  placeholder="Please enter"
                  required
                />
              </div>


              <div className="form-group">
                <label htmlFor="registerPassword">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="registerPassword"
                  name="password"
                  value={registerData.password}
                  onChange={handleRegisterChange}
                  placeholder="Please enter"
                  required
                />
              </div>
             
              <div className="form-group">
                <label htmlFor="inviteCode">Referral Code</label>
                <input
                  type="text"
                  className="form-control"
                  id="referralCode"
                  name="referralCode"
                  value={registerData.referralCode}
                  onChange={handleRegisterChange}
                  placeholder="Please enter"
                />
              </div>
              <button type="submit" className="btn btn-register">
                Register
              </button>
            </form>
          )}
          <div className="customer-service">
            <Link to="#">Customer Service</Link>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RegisterForm;
