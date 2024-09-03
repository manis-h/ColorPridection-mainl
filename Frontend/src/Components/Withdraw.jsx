// import React from 'react'

// const Withdraw = () => {
//   return (
//     <div>
//       gkjgkjb,kj
//     </div>
//   )
// }

// export default Withdraw




import axios from "axios";
import { ChevronLeft } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import bank from "../Assets/Images/bank-transfer.svg";
import gpay from "../Assets/Images/gpay.svg";
import ppay from "../Assets/Images/phonepe.svg";
const Withdraw = () => {
  const { token } = useSelector((store) => store.AuthReducer);

  const [formData, setFormData] = useState({

    amount:"",
attachment:"text.jpg",
description: "Tested",
reason:"Nobody knows",
type:"W",
status:"P",
acc_num:"",
bank_name:"",
account_phone_number:"1234442221",
account_ifsc_code:"",
account_holder_name:"",
  });

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await axios.post(
        "http://localhost:3002/api/withdraw",
        { ...formData },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Withdrawl Succesfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Withdrwal failed! Please try again.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      
    }

    console.log(formData)
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  return (
    <>
      <main className="pt-3">
        <div className="container withdraw">
          <div className="PagesHeading">
            <h2>Withdraw</h2>
            <Link to="/" className="back-link">
              Back <ChevronLeft />
            </Link>
          </div>
          <div className="row">
            <div className="col-md-5 order-md-1 order-2 mt-md-0 mt-3">
              <ul className="">
                <li>
                  <span className="material-symbols-outlined"> • </span>
                  The bonus amount can be used to place bets across the platform
                  and the winnings can be withdrawn.
                </li>
                <li>
                  <span className="material-symbols-outlined"> • </span>A
                  player can use bonus amount to place bets and play games on
                  Kheloyar.
                </li>
                <li>
                  <span className="material-symbols-outlined">• </span>
                  If the withdrawals are pending from the bank, it may take upto
                  72 banking hours for your transaction to clear.
                </li>
                <li className="mb-0">
                  <span className="material-symbols-outlined"> • </span>
                  If a user only deposits and attempts to withdraw the money
                  without placing a single bet, 100% of the amount will be
                  withheld due to suspicious activity. If this is repeated, no
                  withdrawal will be given to the user.
                </li>
              </ul>
            </div>
            <div className="col-md-7 order-md-2 order-1">
              <ul
                class="nav nav-pills gap-4 mb-2 justify-content-center p-3 bank-types"
                id="pills-tab"
                role="tablist"
              >
                <li class="nav-item mb-0" role="presentation">
                  <button
                    class="nav-link "
                    id="pills-banktransfer-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-banktransfer"
                    type="button"
                    role="tab"
                    aria-controls="pills-banktransfer"
                    aria-selected="true"
                  >
                    <img src={bank} alt="" />
                  </button>
                </li>
              </ul>
              <div class="tab-content" id="pills-tabContent">
                <div
                  class="tab-pane fade show active"
                  id="pills-banktransfer"
                  role="tabpanel"
                  aria-labelledby="pills-banktransfer-tab"
                  tabindex="0"
                >
                  <form className="withdraw-form" onSubmit={handleSubmit}>

                    <label for="holdername">Holder Name</label>
                    <div className="input-group mb-3">
                      <input
                        id="holdername"
                        type="text"
                        className="form-control"
                        name="account_holder_name"
                        value={formData.account_holder_name}
                        onChange={handleInputChange}
                        placeholder="Holder Name"
                      />
                    </div>
                    <div className="row">
                      <div className="col-md-12 col-sm-8">
                        <label for="bankname">Bank Name or G-pay or UPI Name</label>
                        <div className="input-group mb-3">
                          <input
                            id="bankname"
                            type="text"
                            className="form-control"
                            maxlength="{20}"
                            name="bank_name"
                            value={formData.bank_name}
                            onChange={handleInputChange}
                            placeholder="Bank Name"
                          />
                        </div>
                      </div>
                    </div>
                    <label for="accountNo">Account No Or UPI Number</label>
                    <div className="input-group mb-3">
                      <input
                        id="accountNo"
                        type="number"
                        className="form-control"
                        name="acc_num"
                        value={formData.acc_num}
                        onChange={handleInputChange}
                        placeholder="Account No"
                      />
                    </div>
                    <label for="ibnifsccode">IBAN/IFSC Number</label>
                    <div className="input-group mb-3">
                      <input
                        id="ibnifsccode"
                        type="text"
                        className="form-control"
                        name="account_ifsc_code"
                        value={formData.account_ifsc_code}
                        onChange={handleInputChange}
                        placeholder="IBAN/IFSC Number"
                      />
                    </div>

                    <label for="accountNo">Amount</label>
                    <div className="input-group mb-3">
                      <input
                        id="accountNo"
                        type="number"
                        className="form-control"
                        name="amount"
                        value={formData.amount}
                        onChange={handleInputChange}
                        placeholder="Amount"
                      />
                    </div>
                    <div className="add-account-btn mt-2">
                      <div className="d-flex m-auto w-md-50">
                        <button
                          type="submit"
                          className="btn btn btn-primary py-2 w-100"
                        >
                          Withdraw
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
                <div
                  class="tab-pane fade"
                  id="pills-gpay"
                  role="tabpanel"
                  aria-labelledby="pills-gpay-tab"
                  tabindex="0"
                >
                  <form className="withdraw-form">
                    <label for="holdername">Phone No./UPI</label>
                    <div className="input-group mb-3">
                      <input
                        id="upi_number"
                        type="text"
                        className="form-control"
                        name="upi_number"
                        placeholder="Phone No./UPI"
                      />
                    </div>
                    <label for="a_name">Account Name</label>
                    <div className="input-group mb-3">
                      <input
                        id="a_name"
                        type="text"
                        className="form-control"
                        maxlength="{20}"
                        name="a_name"
                        placeholder="Account Name"
                      />
                    </div>
                    <label for="accountNo">Amount</label>
                    <div className="input-group mb-3">
                      <input
                        id="accountNo"
                        type="number"
                        className="form-control"
                        name="amount"
                        placeholder="Amount"
                      />
                    </div>
                    <div className="add-account-btn mt-2">
                      <div className="d-flex m-auto w-md-50">
                        <button
                          type="submit"
                          className="btn btn btn-primary py-2 w-100"
                        >
                          Withdraw
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
                <div
                  class="tab-pane fade"
                  id="pills-phonepay"
                  role="tabpanel"
                  aria-labelledby="pills-phonepay-tab"
                  tabindex="0"
                >
                  <form className="withdraw-form">
                    <label for="holdername">Phone No./UPI</label>
                    <div className="input-group mb-3">
                      <input
                        id="upi_number"
                        type="text"
                        className="form-control"
                        name="upi_number"
                        placeholder="Phone No./UPI"
                      />
                    </div>
                    <label for="a_name">Account Name</label>
                    <div className="input-group mb-3">
                      <input
                        id="a_name"
                        type="text"
                        className="form-control"
                        maxlength="{20}"
                        name="a_name"
                        placeholder="Account Name"
                      />
                    </div>
                    <label for="accountNo">Amount</label>
                    <div className="input-group mb-3">
                      <input
                        id="accountNo"
                        type="number"
                        className="form-control"
                        name="amount"
                        placeholder="Amount"
                      />
                    </div>
                    <div className="add-account-btn mt-2">
                      <div className="d-flex m-auto w-md-50">
                        <button
                          type="submit"
                          className="btn btn btn-primary py-2 w-100"
                        >
                          Withdraw
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Withdraw
