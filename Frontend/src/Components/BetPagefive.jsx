import React, { useEffect, useState } from 'react';
import Footer from './Footer';
import io from 'socket.io-client';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import Cookies from "js-cookie";

 
const BetPagefive = () => {
  const { token } = useSelector((store) => (store.AuthReducer));
  let walletBalanceFromCookies = Cookies.get('walletBalance') || 0;
  walletBalanceFromCookies = walletBalanceFromCookies ? parseFloat(walletBalanceFromCookies).toFixed(2) : '0.00';

  const [selectedValue, setSelectedValue] = useState(null);
  const [modalShow, setModalShow] = useState(false); 
  const [newGameId, setNewGameId] = useState(null);
  const [newGameTimestamp, setNewGameTimestamp] = useState(null);
  const [timeDiff, setTimeDiff] = useState(null);
  const [formdata, setFormdata] = useState({
    betAmount: 0,
    betColor: selectedValue?.color,
    betValue: selectedValue?.value,
    
  });
  const [results,setResult]=useState()

  useEffect(() => {
    setFormdata(prevFormdata => ({
      ...prevFormdata,
      betColor: selectedValue?.color,
      betValue: selectedValue?.value,
      gameID:newGameId
    }));
  }, [selectedValue]);

  const handleBetAmountChange = (e) => {
    setFormdata(prevFormdata => ({
      ...prevFormdata,
      betAmount: e.target.value
    }));
  };

  const handleModalClose = () => setModalShow(false);
  const handleModalShow = () => setModalShow(true);

  const handleButtonClick = (value, className, color) => {
    setSelectedValue({ value, className, color });
    setModalShow(true);
  };

  const handleContractMoneyClick = (amount) => {
    setFormdata(prevFormdata => ({
      ...prevFormdata,
      betAmount: amount.toString()
    }));
  };

  const handleSubmitbet = async() => {
    try {
      const data = await axios.post(
        "http://localhost:3002/api/predictfive",
        formdata,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Attaches the authorization token to the request headers
          },
        }
      );
      console.log(data);

      toast.success("Bet Placed Succesfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      handleModalClose()
    } catch (error) {
      console.error("Error fetching data:", error); // Logs any errors that occur during the API call
      toast.error("Enter Correct Password", {
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

  // const records = [
  //   { period: 'GWWS240722217', number: 4, result: 'red' },
  //   { period: 'GWWS240722216', number: 1, result: 'green' },
  //   { period: 'GWWS240722215', number: 9, result: 'green' },
  //   { period: 'GWWS240722214', number: 5, result: 'half-violet-green' },
  //   { period: 'GWWS240722213', number: 3, result: 'green' },
  //   { period: 'GWWS240722212', number: 1, result: 'green' },
  //   { period: 'GWWS240722211', number: 6, result: 'half-red-green' },
  // ];




const extractTimestamp = (gameId5Min) => {
  return parseInt(gameId5Min.replace('PID_', ''), 10);
};
// game id or time from bakend soket 

  useEffect(() => {
    const socket = io('http://localhost:3002');

    socket.on('newGameId5Min', (gameId5Min) => {
    const timestamp5Min = extractTimestamp(gameId5Min);

      console.log('5-Minute Game ID:', gameId5Min, 'Timestamp:', timestamp5Min);
      setNewGameId(gameId5Min);
      setNewGameTimestamp(timestamp5Min); 
    });

    return () => {
      socket.disconnect();
    };
  }, []);




  // http://localhost:3002/getAllBets
  const handleGetallResult = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:3002/api/resultsfive",
      );
      setResult(data)
      console.log(data);
      // You can handle data here, such as setting state or other side effects
    } catch (error) {
      console.error("Error fetching data:", error); // Logs any errors that occur during the API call
      toast.error("Failed to fetch user list", {
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

  useEffect(()=>{
    handleGetallResult()
  },[newGameId])

  useEffect(() => {
    if (newGameTimestamp) {
      const intervalId = setInterval(() => {
        const now = Date.now();
        const diffInSeconds = Math.floor((now - newGameTimestamp) / 1000);
        setTimeDiff(diffInSeconds);
      }, 1000); // Update every second


      setTimeout(() => {
        handleGetallResult();
    }, 20000); // 20 seconds delay
    
        // Call the fetchResults function after 20 seconds
       
     

      return () => clearInterval(intervalId);
    }
  }, [newGameTimestamp]);

  // Format timeDiff to HH:MM:SS
  const formatTimeDiff = (seconds) => {
    if (seconds === null) return '00:00:00';
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    return [
      String(hours).padStart(2, '0'),
      String(minutes % 60).padStart(2, '0'),
      String(seconds % 60).padStart(2, '0'),
    ].join(':');
  };

  console.log(newGameId)

  return (
    <>
      <div className="balance-card p-3 shadow-sm rounded">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <div className="balance-info">
              <span className="balance-label">My Balance:</span>
              <span className="balance-amount">₹ {walletBalanceFromCookies}</span>
              <span className="refresh-icon">&#8635;</span>
            </div>
            <div className="period-info mt-2">
              <span className="period-label">Period</span>
              <span className="period-id">{newGameId}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="d-flex justify-content-end">
              <span className="text-primary deposit-link">Deposit</span>
              <span className="ml-2 text-success rule-link">Rule</span>
            </div>
            <div className="timer mt-2">
              {/* <span className="time-box">00</span>:
              <span className="time-box">00</span>:
              <span className="time-box">27</span> */}
              <span className="time-box">{formatTimeDiff(timeDiff)}</span>

            </div>
          </div>
        </div>
      </div>


{/* all button  */}
      <div className='betvalue mb-5'>
        <div className="valuebtn">
          <div><button className="button1" value="0" onClick={(e) => handleButtonClick(e.currentTarget.value, e.currentTarget.className, 'violetred')}>0</button></div>
          <div><button className="button3" value="1" onClick={(e) => handleButtonClick(e.currentTarget.value, e.currentTarget.className, 'green')}>1</button></div>
          <div><button className="button2" value="2" onClick={(e) => handleButtonClick(e.currentTarget.value, e.currentTarget.className, 'red')}>2</button></div>
          <div><button className="button3" value="3" onClick={(e) => handleButtonClick(e.currentTarget.value, e.currentTarget.className, 'green')}>3</button></div>
          <div><button className="button2" value="4" onClick={(e) => handleButtonClick(e.currentTarget.value, e.currentTarget.className, 'red')}>4</button></div>
        </div>
        <div className="valuebtn">
          <div><button className="button4" value="5" onClick={(e) => handleButtonClick(e.currentTarget.value, e.currentTarget.className, 'violetgreen')}>5</button></div>
          <div><button className="button2" value="6" onClick={(e) => handleButtonClick(e.currentTarget.value, e.currentTarget.className, 'red')}>6</button></div>
          <div><button className="button3" value="7" onClick={(e) => handleButtonClick(e.currentTarget.value, e.currentTarget.className, 'green')}>7</button></div>
          <div><button className="button2" value="8" onClick={(e) => handleButtonClick(e.currentTarget.value, e.currentTarget.className, 'red')}>8</button></div>
          <div><button className="button3" value="9" onClick={(e) => handleButtonClick(e.currentTarget.value, e.currentTarget.className, 'green')}>9</button></div>
        </div>
        <div className='valuebtn row px-3'>
          <div className='green col-3 col-md-3 d-flex justify-content-center' onClick={(e) => handleButtonClick("", "green", 'green')}>GREEN</div>
          <div className='voilet col-3 col-md-3 d-flex justify-content-center' onClick={(e) => handleButtonClick("", "voilet", 'violet')}>VOILET</div>
          <div className='red col-3 col-md-3 d-flex justify-content-center' onClick={(e) => handleButtonClick("", "red", 'red')}>RED</div>
        </div>
      </div>

      <div className="record-table p-3 shadow-sm rounded">
        <h5>Record</h5>
        <table className="table">
          <thead>
            <tr>
              <th>Period</th>
              <th>Number</th>
              <th>Color</th>
            </tr>
          </thead>
          <tbody className='fw-bold '>
            {results && results?.map((record, index) => (
              <tr key={index}>
                <td>{record.gameID}</td>
                <td className={record.number === 4 || record.number === 6 ? 'text-danger' : 'text-success'}>{record.result?.resultValue}</td>
                <td>
                  <span className={`result-circle ${record.result?.resultColor}`}></span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalShow && (
        <div className="modal show d-block pt-5 mt-5" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className={`modal-header ${selectedValue.className}`}>
                <h5 className="modal-title">Join: {selectedValue.value}</h5>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label>Bet amount:</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter the amount"
                      value={formdata.betAmount}
                      onChange={handleBetAmountChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Contract Money:</label>
                    <div className="d-flex justify-content-between">
                      {[10, 50, 100, 500, 1000, 10000].map((amount) => (
                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                          key={amount}
                          onClick={() => handleContractMoneyClick(amount)}>
                          {amount}
                        </button>
                      ))}
                    </div>
                  </div>
                </form>
              </div>
              <div className={`modal-footer ${selectedValue.className}`}>
                <button type="button" className="btn btn-secondary" onClick={handleModalClose}>
                  Close
                </button>
                <button type="button" className="btn btn-primary" onClick={handleSubmitbet}>
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}

export default BetPagefive;
