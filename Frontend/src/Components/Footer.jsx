import logo from "../Assets/Images/logo.png"
import { Link } from "react-router-dom";
import casino from "../Assets/Images/Icons/casinoIcon.png";
import menu4 from "../Assets/Images/Icons/menu4.png";
import home from "../Assets/Images/Icons/home.png";
import sports from "../Assets/Images/Icons/sportsIcon.png";
import profile from "../Assets/Images/Icons/profile.png";
import { useSelector } from "react-redux";
import { Wallet, Wallet2 } from "lucide-react";
function Footer() {
  const token  = "12"
  return (
    <>
      <footer className="footer">
        <div className="container">
          <div className="footer-links mb-5">
            <ul>
              <li>
                <Link to="#">Contact Us</Link>
              </li>
              <li>
                <Link to="/privacy-policy">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/responsible-game">Responsible Gaming</Link>
              </li>
              <li>
                <Link to="/fairplay">Fair Play</Link>
              </li>
              <li>
                <Link to="/game-rules">Games Rules</Link>
              </li>
              <li>
                <Link to="/terms">Terms and Conditions</Link>
              </li>
            </ul>
          </div>
          <div className="footer-logo">
            <Link to="/">
              <img
                src={logo}
                className="w-100"
              />
            </Link>
          </div>
          <p />
        </div>
       
        <div className="footer-menu position-fixed start-0 bottom-0 z-index-50 w-100">
          <ul className="d-flex justify-content-evenly m-0 p-0 list-unstyled">
            <li>
              <Link to="/reffercode">
                <img src={casino} alt="CasinoIconNew" />
                <span>Referral Code</span>
              </Link>
            </li>

            <li>
              <Link to="/deposit">
                <Wallet2/>
                <span>Deposit</span>
              </Link>
            </li>
           
            <li className="home">
              <Link className="active" to="/">
                <img src={home} alt="HomeIconNew" />
                <span>Home</span>
              </Link>
            </li>

            <li>
              <Link to={"withdraw"}>
                {<Wallet/>} 
                <span>Withdrawal</span>
              </Link>
            </li>
          
          
            <li>
              <Link to="#"  
                      data-bs-toggle="offcanvas"
                      data-bs-target="#ProfileMenu"
                      aria-controls="ProfileMenu">
                <img src={profile} alt="profile" />
                <span>Profile</span>
              </Link>
            </li>

          </ul>
        </div>

      </footer>
    </>
  );
}

export default Footer;
