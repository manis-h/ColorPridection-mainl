import axios from "axios";
import { data } from "jquery";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
const Deposit = () => {

  const [Data ,setData]=useState()



  // const toast = useToast();
  const { token } = useSelector((store) => store.AuthReducer);
  const [Data2, setData2] = useState();
  // const [Data, setData] = useState();
  const [Accdata, setaccData] = useState();
  const [qr, setQr] = useState();
  const [qr1, setQr1] = useState();
  const [Data1, setData1] = useState();
  const [formData, setFormData] = useState({
    amount: "",
    attachment: "",
    description: "",
    reason: "",
    type: "D", // default to Deposit
    status: "P", // default to Pending
    account_phone_number: "",
    account_ifsc_code: "",
    account_holder_name: "",
    unique_transaction_id: "",
    deposit_withdraw_type: "",
  });



  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.unique_transaction_id === "") {
      toast.error("UTR ID is Required", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return; // Added return to stop the function if condition is met
    }

    if (formData.amount === "") {
      toast.error("Ammount is Required", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return; // Added return to stop the function if condition is met
    }

    try {
      const response = await axios.post(
        "http://localhost:3002/api/deposit",
        { ...formData },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Successful, wait sometime", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      // Optional: Reload or reset form after successful submission
      // if (!response.data.error) {
      //   window.location.reload();
      // }

    } catch (error) {
      toast.error("Error fetching data", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      console.error("Error fetching data:", error);
    }

    console.log(formData);
  };


  // Function to update the form data when an amount is selected
  const handleAmountSelect = (amount) => {
    setFormData({
      ...formData,
      amount,
    });
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3002/api/admin-account",
                {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
setData(response.data[0].accounts)
      console.log(response.data[0].accounts);
      
     
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(); 
  }, []);



  const [activeTab, setActiveTab] = useState(0);

  // Handler to update the active tab
  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  const downloadImage = (url) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = 'payment-image';  // You can customize the default filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  const handleCopy = (copyValue) => {
    navigator.clipboard.writeText(copyValue)
      .then(() => {
        // toast({
        //   title: "Copied Successfully",
        //   duration: 5000,
        //   position: "top",
        //   isClosable: true,
        // });
      })
      .catch((err) => {
        console.error('Failed to copy text: ', err);
      });
  };

  return (
    <>
      <div>
        <div className="container-fluid py-1 pb-5">
          <div className="withdraw">
            <ul
              class="nav nav-pills justify-content-center mt-md-5 mt-3"
              id="pills-tab"
              role="tablist"
            >

              {Data && Data.map((item, index) => (
                <li className="nav-item" role="presentation" key={index}>
                  <button
                    className={`nav-link ${activeTab === index ? 'active' : ''}`}
                    id={`pills-op${index}-tab`}
                    data-bs-toggle="pill"
                    data-bs-target={`#pills-op${index}`}
                    type="button"
                    role="tab"
                    aria-controls={`pills-op${index}`}
                    aria-selected={activeTab === index}
                    onClick={() => handleTabClick(index)}
                  >
                    {/* <img width={"50"} height={"50px"} src={`https://admin.1xbetindia.co//storage/app/public/payment/${item.ac_type_image
                      }`} alt="" srcset="" /> */} PAY
                  </button>
                </li>
              ))}

            </ul>
            <div className="row mt-5 justify-content-center">
              <div className="col-md-10">
                <div className="row">
                  <div className="col-md-5 px-md-4 border-end">
                    <div>
                      <div class="tab-content" id="pills-tabContent">

                        {Data && Data.map((item, index) => (
                          <div
                            key={index}
                            className={`tab-pane fade ${activeTab === index ? 'show active' : ''}`}
                            id={`pills-op${index}`}
                            role="tabpanel"
                            aria-labelledby={`#pills-op${index}`}
                            tabIndex="0"
                          >
                            <div className="st_blog_detail_thumb">
                              <div className="st_featured_thumb">
                                <div className="qr-section">
                                  <div className="bb_overall_transfer">
                                    <div>
                                      <div className="bb_tran_subdiv">
                                        <img src={item.qr_attachment} alt="" />
                                      </div>
                                    </div>
                                    <div className="download_btn_wrapper">
                                      <button type="button" appdownloadimage="" onClick={() => downloadImage(`https://admin.1xbetindia.co//storage/app/public/payment/${item.attachment}`)}>
                                        Download & Pay
                                      </button>
                                    </div>
                                  </div>
                                </div>

                                <div className="text_wrper">
                                  <div className="bb_transfer_div">

                                    <div className="bb_transfer_subsection">
                                      { item.upi_id ? (
                                          <div className="sectionList">
                                            <div className="bb_tran_subdiv">
                                              <div className="bb_bank_name">
                                                UPI ID:</div>
                                            </div>
                                            <div copy_value={item.upi_id} className="bb_copy_txt" onClick={() => handleCopy(item.upi_id)}>
                                              <div className="bb_tran_subdiv_sec">
                                                {item.upi_id}
                                              </div>
                                              <img
                                                className="click_btn"
                                                src="https://dqqdyv927mezc.cloudfront.net/kheloyar/copy.svg"
                                              />
                                            </div>
                                          </div>
                                        ) : null}


                                      {item.account_number ? (
                                        <div className="sectionList">
                                          <div className="bb_tran_subdiv">
                                            <div className="bb_bank_name">Account Number:</div>
                                          </div>
                                          <div className="bb_copy_txt" onClick={() => handleCopy(item.account_phone_number)}>
                                            <div className="bb_tran_subdiv_sec">
                                              {item.account_number}
                                            </div>
                                            <img
                                              className="click_btn"
                                              src="https://dqqdyv927mezc.cloudfront.net/kheloyar/copy.svg"
                                            />
                                          </div>
                                        </div>
                                      ) : null}
                                      
                                      <div className="sectionList">
                                        <div className="bb_tran_subdiv">
                                          <div className="bb_bank_name">Account Holder Name:</div>
                                        </div>
                                        <div copy_value="WASHETTE SERVICES OPC PVT LTD" className="bb_copy_txt" onClick={() => handleCopy(item.account_holder_name)}>
                                          <div className="bb_tran_subdiv_sec">
                                            {item.account_holder_name}
                                          </div>
                                          <img
                                            className="click_btn"
                                            src="https://dqqdyv927mezc.cloudfront.net/kheloyar/copy.svg"
                                          />
                                        </div>
                                      </div>
                                      {item.bank_name ? (
                                        <div className="sectionList">
                                          <div className="bb_tran_subdiv">
                                            <div className="bb_bank_name">Bank Name:</div>
                                          </div>
                                          <div copy_value="YES BANK" className="bb_copy_txt" onClick={() => handleCopy(item.bank_name)}>
                                            <div className="bb_tran_subdiv_sec">
                                              {item.bank_name}
                                            </div>
                                            <img
                                              className="click_btn"
                                              src="https://dqqdyv927mezc.cloudfront.net/kheloyar/copy.svg"
                                            />
                                          </div>
                                        </div>
                                      ) : null}
                                      {item.ifsc ? (
                                        <div className="sectionList">
                                          <div className="bb_tran_subdiv">
                                            <div className="bb_bank_name">IFSC Code:</div>
                                          </div>
                                          <div copy_value="YESB0000444" className="bb_copy_txt" onClick={() => handleCopy(item.account_ifsc_code)}>
                                            <div className="bb_tran_subdiv_sec">
                                              {item.ifsc}
                                            </div>
                                            <img
                                              className="click_btn"
                                              src="https://dqqdyv927mezc.cloudfront.net/kheloyar/copy.svg"
                                            />
                                          </div>
                                        </div>
                                      ) : null}

{item.phone_number ? (
                                        <div className="sectionList">
                                          <div className="bb_tran_subdiv">
                                            <div className="bb_bank_name">Number:</div>
                                          </div>
                                          <div copy_value="YESB0000444" className="bb_copy_txt" onClick={() => handleCopy(item.phone_number)}>
                                            <div className="bb_tran_subdiv_sec">
                                              {item.phone_number}
                                            </div>
                                            <img
                                              className="click_btn"
                                              src="https://dqqdyv927mezc.cloudfront.net/kheloyar/copy.svg"
                                            />
                                          </div>
                                        </div>
                                      ) : null}



                                    </div>

                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="note_wrapper ">
                              <span> Please Note: </span>
                              <ul className="ps-md-0 ps-4">
                                <li>
                                  Deposit money only in the above available account to get the fastest credit & avoid possible delays.
                                </li>
                                <li>
                                  After Deposit, upload your deposit slip screenshot to receive balance.
                                </li>
                                <li>
                                  Requested amount should be the same as deposit slip amount for smooth deposit process.
                                </li>
                                <li>
                                  NEFT receiving time is from 40 -50 minutes.
                                </li>
                              </ul>
                            </div>
                          </div>
                        ))}


                        <div
                          class="tab-pane fade "
                          id="pills-op2"
                          role="tabpanel"
                          aria-labelledby="pills-op2-tab"
                          tabindex="1"
                        >
                          <div className="st_blog_detail_thumb">
                            <div className="st_featured_thumb">
                              <div className="qr-section">
                                <div className="bb_overall_transfer">
                                  <div>
                                    <div className="bb_tran_subdiv">
                                      <img src={`	https://admin.1xbetindia.co//storage/app/public/payment/${qr1}`} alt="" />
                                    </div>
                                  </div>
                                  <div className="download_btn_wrapper">
                                    <button type="button" appdownloadimage="">
                                      Download &amp; Pay
                                    </button>
                                  </div>
                                </div>
                              </div>

                              <div className="text_wrper">
                                <div className="bb_transfer_div">
                                  {Data &&
                                    Data.slice(0, 1).map((item, index) => (
                                      <div className="bb_transfer_subsection">
                                        <div className="sectionList">
                                          <div className="bb_tran_subdiv">
                                            <div className="bb_bank_name">
                                              Account Number:
                                            </div>
                                          </div>
                                          <div className="bb_copy_txt">
                                            <div className="bb_tran_subdiv_sec">
                                              {item.account_phone_number}
                                            </div>
                                            <img
                                              className="click_btn"
                                              src="https://dqqdyv927mezc.cloudfront.net/kheloyar/copy.svg"
                                            />
                                          </div>
                                        </div>
                                        <div className="sectionList">
                                          <div className="bb_tran_subdiv">
                                            <div className="bb_bank_name">
                                              Account Holder Name:
                                            </div>
                                          </div>
                                          <div
                                            copy_value="WASHETTE SERVICES OPC PVT LTD"
                                            className="bb_copy_txt"
                                          >
                                            <div className="bb_tran_subdiv_sec">
                                              {item.account_holder_name}
                                            </div>
                                            <img
                                              className="click_btn"
                                              src="https://dqqdyv927mezc.cloudfront.net/kheloyar/copy.svg"
                                            />
                                          </div>
                                        </div>
                                        <div className="sectionList">
                                          <div className="bb_tran_subdiv">
                                            <div className="bb_bank_name">
                                              Bank Name:
                                            </div>
                                          </div>
                                          <div
                                            copy_value="YES BANK"
                                            className="bb_copy_txt"
                                          >
                                            <div className="bb_tran_subdiv_sec">
                                              {item.bank_name}
                                            </div>
                                            <img
                                              className="click_btn"
                                              src="https://dqqdyv927mezc.cloudfront.net/kheloyar/copy.svg"
                                            />
                                          </div>
                                        </div>
                                        <div className="sectionList">
                                          <div className="bb_tran_subdiv">
                                            <div className="bb_bank_name">
                                              IFSC Code:
                                            </div>
                                          </div>
                                          <div
                                            copy_value="YESB0000444"
                                            className="bb_copy_txt"
                                          >
                                            <div className="bb_tran_subdiv_sec">
                                              {item.account_ifsc_code}
                                            </div>
                                            <img
                                              className="click_btn"
                                              src="https://dqqdyv927mezc.cloudfront.net/kheloyar/copy.svg"
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="note_wrapper">
                            <span> Please Note: </span>
                            <ul className="ps-md-0 ps-4">
                              <li>
                                Deposit money only in the above available
                                account to get the fastest credit &amp; avoid
                                possible delays.
                              </li>
                              <li>
                                After Deposit, upload your deposit slip
                                screenshot to receive balance.
                              </li>
                              <li>
                                Requested amount should be the same as deposit
                                slip amount for smooth deposit process.
                              </li>
                              <li>
                                NEFT receiving time is from 40 -50 minutes.
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-7 px-md-4">
                    <form
                      className="p-4 border rounded filter-form"
                      onSubmit={handleSubmit}
                    >
                      <div className="row">
                        {/* Upload File */}
                        <div className="col-md-12">
                          <label className="p-0" htmlFor="fileUpload">
                            Upload File
                          </label>
                          <div className="input-group mb-3">
                            <input
                              id="file_upload"
                              type="file"
                              value={formData.attachment}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  attachment: e.target.value,
                                })
                              }
                              className="form-control"
                             
                            />
                          </div>
                        </div>
                        {/* Amount */}
                        <div className="col-md-12">
                          <label className="p-0">Amount</label>
                          <div className="input-group mb-3">
                            <input
                              type="number"
                              className="form-control"
                              value={formData.amount}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  amount: Number(e.target.value),
                                })
                              }
                              placeholder="Amount"
                            />
                          </div>
                          {/* Quick Amounts */}
                          <div className="month_tab">
                            {[
                              500, 1000, 2000, 5000, 10000, 20000, 25000, 50000,
                              100000,
                            ].map((amount, index) => (
                              <div
                                className="quick_amt offline_amount label2"
                                key={index}
                                onClick={() => handleAmountSelect(amount)}
                              >
                                {`+${amount}`}
                              </div>
                            ))}
                          </div>
                        </div>
                        {/* Unique Transaction Reference */}
                        <div className="col-md-12">
                          <label className="p-0" htmlFor="transaction_id">
                            Unique Transaction Reference
                          </label>
                          <div className="input-group mb-3">
                            <input
                              id="transaction_id"
                              type="text"
                              className="form-control"
                              value={formData.unique_transaction_id}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  unique_transaction_id: e.target.value,
                                })
                              }
                              placeholder="6 to 12 Digits UTR Number"
                              maxLength={20}
                            />
                          </div>
                        </div>
                        {/* Submit Button */}
                        <div className="col-md-12">
                          <button
                            type="submit"
                            className="btn submit-btn w-100"
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </form>

                    <div className="p-3 border rounded d-none mt-3">
                      <h6 className="text-white mb-3">
                        How to Deposit through UPI? (Hindi)
                      </h6>
                      <div className="text-center">
                        <img
                          src="https://dqqdyv927mezc.cloudfront.net/kheloyar/dep1.png"
                          alt=""
                        />
                      </div>
                    </div>

                    <div className="p-3 border rounded d-none mt-3">
                      <h6 className="text-white mb-3">
                        How to Deposit through UPI? (Hindi)
                      </h6>
                      <div className="text-center">
                        <img
                          src="https://dqqdyv927mezc.cloudfront.net/kheloyar/dep1.png"
                          alt=""
                        />
                      </div>
                    </div>

                    <div className="rounded d-none mt-3">
                      <h6 className="text-white mb-3">Notes</h6>
                      <div className="notesLine">
                        <img
                          className="dotLine"
                          src="https://dqqdyv927mezc.cloudfront.net/kheloyar/line-dotted.svg"
                        />
                        <div className="notesData">
                          <span>
                            Send your deposit amount on given Bank account.
                          </span>
                          <span>Copy and Enter the 12 digits UTR Number.</span>
                          <div className="links d-none d-sm-none d-md-flex">
                            <img
                              alt="no"
                              src="https://dqqdyv927mezc.cloudfront.net/kheloyar/utr.svg"
                            />
                            <img
                              alt="no"
                              src="https://dqqdyv927mezc.cloudfront.net/kheloyar/utr.svg"
                            />
                            <img
                              alt="no"
                              src="https://dqqdyv927mezc.cloudfront.net/kheloyar/utr.svg"
                            />
                          </div>
                          <span>
                            Submit the form &amp; Receive credits instantly.
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div >
    </>
  );
}


export default Deposit
