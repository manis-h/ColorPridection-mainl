import logo from "../Assets/Images/logo.png";
import {
  ArrowDownUp,
  Dices,
  Lock,
  LogOut,
  Menu,
  MessageCircle,
  ReceiptText,
  UserRound,
  Wallet,
} from "lucide-react";
import menu1 from "../Assets/Images/Icons/menu1.png";
import menu2 from "../Assets/Images/Icons/menu2.png";
import menu3 from "../Assets/Images/Icons/menu3.png";
import menu4 from "../Assets/Images/Icons/menu4.png";
import menu5 from "../Assets/Images/Icons/menu5.png";
import menu6 from "../Assets/Images/Icons/menu6.png";
import menu7 from "../Assets/Images/Icons/menu7.png";
import menu10 from "../Assets/Images/Icons/matka-icon.png";
import voice_d from "../Assets/Images/voice_d.png"
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import io from 'socket.io-client';
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import RegisterForm from "./Regester";

function Header() {
  const navigate=useNavigate()
  const location = useLocation();
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  const handleShowRegisterForm = () => setShowRegisterForm(true);
  const handleCloseRegisterForm = () => setShowRegisterForm(false);
  const { token } = useSelector((store) => (store.AuthReducer));
  const { contactNumber } = useSelector((store) => (store.AuthReducer));
 
  let walletBalance = Cookies.get('walletBalance')|| 0;
  walletBalance = walletBalance ? parseFloat(walletBalance).toFixed(2) : '0.00';

  const { username } = useSelector((store) => (store.AuthReducer));


  // const user = Cookies.get("user_name") || [];
  // const walletBalance = Cookies.get("walletBalance") || [];
  // const contactNumber = Cookies.get("contactNumber") || [];

 





  const handleClick = (path) => {
    navigate(path);
  };


  const fetchWalletBalance = async () => {
    if (token) {
      try {
        const response = await axios.get('http://localhost:3002/api/wallet-balance', {
          headers: { Authorization: `Bearer ${token}` }
        });
        // console.log(response)
        Cookies.set('walletBalance', response.data.walletBalance);
        // dispatch(setWalletBalance(response.data.walletBalance));
      } catch (error) {
        console.error("Error fetching wallet balance:", error);
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      fetchWalletBalance();
    }, 10000);
    return () => clearInterval(interval);
  }, []);




  
  const handleLogout = () => {
    try {
      // Clear cookies
      document.cookie.split(";").forEach(function (c) {
        document.cookie = c
          .replace(/^ +/, "")
          .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
      });

      // Navigate to "/"
      toast.success("logout successfully", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      window.location.href = "/";
    } catch (error) {
      toast.error("somthing went wrong", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <>
      <header className="header pt-1">
        <div className="container-lg">
          <div className="row">
            {/* <div className="col-12 mb-2  d-flex align-items-center">
              <img src={voice_d} width={25} alt="" />
              <marquee scrollamount={5}>Welcome to Vbet</marquee>
              <span className="text-nowrap d-md-block d-none"></span>
            </div> */}
            <div className="col-12">
              <div className="d-flex justify-content-between">
                <div className="logo">
                  <Link to="/">
                    {/* <img src={logo} alt="Logo" /> */}
                  </Link>
                </div>
               
                {!token ? (
                  <div className="headerRight">
                    <ul className="loggedout">
                      <li>
                        <Link
                          className="text-white"
                          to="https://wa.me/+919902107947"
                          target="_blank"
                        >
                          <MessageCircle />
                          <p>Support</p>
                        </Link>
                      </li>
                    </ul>
                    <Link
                      to="#"
                      type="button"
                      onClick={handleShowRegisterForm}
                      className="button-link btn btn-link"
                    >
                      Log In
                    </Link>
                    <Link
                      to="#"
                      type="button"
                      onClick={handleShowRegisterForm}
                      className="button-primary ms-2 btn btn-primary"
                    >
                      Register
                    </Link>
                  </div>
                ) : null}
                {token ? (
                  <div className="headerRight">
                    <ul className="wallet-card" >
                      <li className="casino_bal" >
                        Bal &nbsp; <strong>{walletBalance}</strong>
                      </li>

                    </ul>
                    <div className="Deposit_btn d-lg-block d-dm-none d-block ms-2">
                      <Link
                        to="/deposit"
                        className="btn rounded btn-primary w-100"
                      >
                        Deposit
                      </Link>
                    </div>
                    <button
                      type="button"
                      className="btn btn- menu-btn"
                      data-bs-toggle="offcanvas"
                      data-bs-target="#ProfileMenu"
                      aria-controls="ProfileMenu"
                    >
                      <Menu color="#fff" />
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div
        role="dialog"
        aria-modal="true"
        className="offcanvas offcanvas-end"
        tabIndex={-1}
        id="ProfileMenu"
        aria-labelledby="ProfileMenuLabel"
      >
        <div className="offcanvas-header">
          <div className="offcanvas-title h5">
            <div className="d-flex">
              <div className="profile-img">
                <UserRound /> 
              </div>
              <div className="user-info">
                <span>{username}</span>
                <p>{contactNumber}</p>
              </div>
            </div>
          </div>
          <button
            type="button"
            className="btn-close btn-close-white"
            aria-label="Close"
            data-bs-dismiss="offcanvas"
          />
        </div>
        <div className="offcanvas-body">
          <div className="row">
            <div className="col-6">
              <div className="balance mb-3">
                <Wallet />
                Balance
              </div>
            </div>
            <div className="col-6">
              <div className="balance-amount mb-4">{walletBalance}</div>
            </div>
            <div className="col-6">
              <Link
                to="/withdraw"
                data-bs-dismiss="offcanvas"
                onClick={() => handleClick("/withdraw")}
                className="btn btn-outline-secondary w-100"
              >
                Withdraw
              </Link>
            </div>
            <div className="col-6">
              <Link
                to="/deposit"
                data-bs-dismiss="offcanvas"
                onClick={() => handleClick("/deposit")}
                className="btn btn-primary w-100"
              >
                Deposit
              </Link>
            </div>
          </div>
          <ul className="menu-items">
            <li>
              <Link
                to="/change-password"
                data-bs-dismiss="offcanvas"
                onClick={() => handleClick("/change-password")}
              >
                <Lock />
                <span>Change Password</span>
              </Link>
            </li>
            <li>
              <Link
                to="/reffer"
                data-bs-dismiss="offcanvas"
                onClick={() => handleClick("/reffercode")}
              >
                <ReceiptText />
                <span> Reffar & Earn And Make Agents</span>
              </Link>
            </li>
            {/* <li>
              <Link
                to="/reports/profit-loss"
                data-bs-dismiss="offcanvas"
                // onClick={() => handleClick("/reports/profit-loss")}
              >
                <ArrowDownUp />
                <span>Profit and Loss</span>
              </Link>
            </li> */}
            {/* <li>
              <Link
                to="/reports/bet-history"
                data-bs-dismiss="offcanvas"
                // onClick={() => handleClick("/reports/bet-history")}
              >
                <Dices />
                <span>My Bets</span>
              </Link>
            </li> */}
            {/* <li>
              <Link
                to="/bet-history"
                data-bs-dismiss="offcanvas"
                onClick={() => handleClick("/bet-history")}
              >
                <Dices />
                <span>My Bets History</span>
              </Link>
            </li> */}
            <li onClick={handleLogout}>
              <Link to="#" >
                <LogOut />
                <span>Sign Out</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <RegisterForm show={showRegisterForm} handleClose={handleCloseRegisterForm}/>
    </>
  );
}

export default Header;
