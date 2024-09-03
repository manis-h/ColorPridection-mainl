import React from 'react'
import { Slider } from './Slider'
import { Button } from 'react-bootstrap';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { toast } from 'react-toastify';
import Cookies from "js-cookie";

import 'react-toastify/dist/ReactToastify.css';
import refer from "../Assets/gameimage/refral.jpg"

const Refral = () => {
    const code = Cookies.get("referralCode") || [];

    
    const handleCopy = (copyValue) => {
        navigator.clipboard.writeText(copyValue)
          .then(() => {
            toast.success("Copied", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
          })
          .catch((err) => {
            console.error('Failed to copy text: ', err);
          });
      };

    return (
        <div>
            <img src={refer} width={"100%"} />

            <div className="referral-text">
        <h4>Refer and Earn</h4>
        <p>Earn ₹20 for each successful referral!</p>
      </div>

            <div className="balance-card p-3 shadow-sm rounded">
                <div className="d-flex justify-content-between align-items-center">
                    <div>
                        <div className="balance-info">
                            <span className="balance-label">My Reffral </span>
                            <span className="balance-amount">Code</span>
                            <span className="refresh-icon">&#8635;</span>
                        </div>
                        <div className="period-info mt-2">

                            <span className="period-id">{code}</span>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="d-flex justify-content-end">
                            <span className="text-primary deposit-link">Make </span>
                            <span className="ml-2 text-success rule-link">Agents</span>
                        </div>
                        <div className="timer mt-2" onClick={() => handleCopy(code)}>
                            <span className="time-box">Copy And Share</span>

                        </div>
                    </div>
                </div>
            </div>
           
        </div>

    )
}

export default Refral
