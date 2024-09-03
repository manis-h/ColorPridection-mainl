import React, { useState } from 'react'
import Footer from './Footer';


const BetPage5mint = () => {
    const [modalShow, setModalShow] = useState(false);
    const [betAmount, setBetAmount] = useState('');
    const [contractMoney, setContractMoney] = useState('');
    const [selectedValue, setSelectedValue] = useState(null);

    const handleBetAmountChange = (e) => setBetAmount(e.target.value);
    const handleModalClose = () => setModalShow(false);
    const handleModalShow = () => setModalShow(true);

    const handleButtonClick = (value, className,color) => {
        setSelectedValue({ value, className,color });
        setModalShow(true);
    };
    console.log(selectedValue)



const records = [
  { period: 'GWWS240722217', number: 4, result: 'red' },
  { period: 'GWWS240722216', number: 1, result: 'green' },
  { period: 'GWWS240722215', number: 9, result: 'green' },
  { period: 'GWWS240722214', number: 5, result: 'half-violet-green' },
  { period: 'GWWS240722213', number: 3, result: 'green' },
  { period: 'GWWS240722212', number: 1, result: 'green' },
  { period: 'GWWS240722211', number: 6, result: 'half-red-green' },
];
      
    return (
        <>
         <div className="balance-card p-3 shadow-sm rounded">
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <div className="balance-info">
            <span className="balance-label">My Balance:</span>
            <span className="balance-amount">₹ 0.93</span>
            <span className="refresh-icon">&#8635;</span>
          </div>
          <div className="period-info mt-2">
            <span className="period-label">Period</span>
            <span className="period-id">GWWD2407221081</span>
          </div>
        </div>
        <div className="text-right">
          <div className="d-flex justify-content-end">
            <span className="text-primary deposit-link">Deposit</span>
            <span className="ml-2 text-success rule-link">Rule</span>
          </div>
          <div className="timer mt-2">
            <span className="time-box">00</span>:
            <span className="time-box">00</span>:
            <span className="time-box">27</span>
          </div>
        </div>
      </div>
    </div>
       
        <div className='betvalue mb-5'>
            <div className="valuebtn">
        <div ><button class="button1" value="0"  onClick={(e) => handleButtonClick(e.currentTarget.value, e.currentTarget.className,'half-violet-red')}> 0  </button></div>
        <div ><button class="button3" value="1" onClick={(e) => handleButtonClick(e.currentTarget.value, e.currentTarget.className,'green')}> 1  </button></div>
        <div ><button class="button2" value="2" onClick={(e) => handleButtonClick(e.currentTarget.value, e.currentTarget.className,"red")}> 2  </button></div>
        <div ><button class="button3" value="3" onClick={(e) => handleButtonClick(e.currentTarget.value, e.currentTarget.className,'green')}> 3  </button></div>
        <div ><button class="button2" value="4" onClick={(e) => handleButtonClick(e.currentTarget.value, e.currentTarget.className,"red")}> 4  </button></div>

        </div>
        <div className="valuebtn">
        
        <div ><button class="button4" value="5" onClick={(e) => handleButtonClick(e.currentTarget.value, e.currentTarget.className,'half-violet-green')}> 5  </button></div>
        <div ><button class="button2" value="6" onClick={(e) => handleButtonClick(e.currentTarget.value, e.currentTarget.className,'red')}> 6  </button></div>
        <div ><button class="button3" value="7" onClick={(e) => handleButtonClick(e.currentTarget.value, e.currentTarget.className,'green')}> 7  </button></div>
        <div ><button class="button2" value="8" onClick={(e) => handleButtonClick(e.currentTarget.value, e.currentTarget.className,"red")}> 8  </button></div>
        <div ><button class="button3" value="9" onClick={(e) => handleButtonClick(e.currentTarget.value, e.currentTarget.className,'green')}> 9  </button></div>

        </div>

           

<div className='valuebtn row px-3 '>
    <div className='green col-3 col-md-3 d-flex justify-content-center'  onClick={(e) => handleButtonClick("", "green",'green')}>GREEN</div>
    <div className='voilet col-3 col-md-3 d-flex justify-content-center'  onClick={(e) => handleButtonClick("", "voilet",'violet')}>VOILET</div>
    <div className='red col-3 col-md-3 d-flex justify-content-center' onClick={(e) => handleButtonClick("", "red",'red')}>RED</div>

</div>

        </div>




        {/* result  */}
        <div className="record-table p-3 shadow-sm rounded">
      <h5>Record</h5>
      <table className="table">
        <thead>
          <tr>
            <th>Period</th>
            <th>Number</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record, index) => (
            <tr key={index}>
              <td>{record.period}</td>
              <td className={record.number === 4 || record.number === 6 ? 'text-danger' : 'text-success'}>{record.number}</td>
              <td>
                <span className={`result-circle ${record.result}`}></span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>





    {/* model for money  */}
    {modalShow && (
                <div className="modal show d-block pt-5 mt-5" tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className={`modal-header ${selectedValue.className}`}>
                                <h5 className="modal-title">Join: {selectedValue.value}</h5>
                                {/* <button type="button" className="close" onClick={handleModalClose}>
                                    <span>&times;</span>
                                </button> */}
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="form-group">
                                        <label>Bet amount:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter the amount"
                                            value={betAmount}
                                            onChange={handleBetAmountChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Contract Money:</label>
                                        <div className="d-flex justify-content-between">
                                            {[10, 50, 100, 500, '1K', '10K'].map((amount) => (
                                                <button
                                                    type="button"
                                                    className="btn btn-outline-secondary"
                                                    key={amount}
                                                    onClick={() => setContractMoney(amount)}>
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
                                <button type="button" className="btn btn-primary" onClick={() => { /* handle confirm action */ }}>
                                    Confirm
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}



<Footer/>
        </>
    )
}

export default BetPage5mint
