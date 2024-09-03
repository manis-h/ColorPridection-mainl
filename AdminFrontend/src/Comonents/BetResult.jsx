// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { Button, Table, Modal } from 'react-bootstrap';
// import { useDispatch, useSelector } from 'react-redux';
// import { toast } from 'react-toastify';
// import io from 'socket.io-client';

// const predefinedBets = [
//     { index: 0, resultColor: 'violetred', resultValue: 0 },
//     { index: 1, resultColor: 'green', resultValue: 1 },
//     { index: 2, resultColor: 'red', resultValue: 2 },
//     { index: 3, resultColor: 'green', resultValue: 3 },
//     { index: 4, resultColor: 'red', resultValue: 4 },
//     { index: 5, resultColor: 'violetgreen', resultValue: 5 },
//     { index: 6, resultColor: 'red', resultValue: 6 },
//     { index: 7, resultColor: 'green', resultValue: 7 },
//     { index: 8, resultColor: 'red', resultValue: 8 },
//     { index: 9, resultColor: 'green', resultValue: 9 },
//     { index: 10, resultColor: 'red', resultValue: '' },
//     { index: 11, resultColor: 'green', resultValue: '' },
//     { index: 12, resultColor: 'violet', resultValue: '' },
// ];

// const BetResult = () => {
//     const { token } = useSelector((store) => store.AuthReducer);
//     const dispatch = useDispatch();
//     const [newGameTimestamp, setNewGameTimestamp] = useState(null);
//     const [newGameId, setNewGameId] = useState(null);
//     const [results, setResult] = useState([]);
//     const [allbet, setAllbeta] = useState([]);
//     const [selectedBet, setSelectedBet] = useState(null);
//     const [formdata, setFormdata] = useState(null);


//     const [showModal, setShowModal] = useState(false);
//     const [colorMap, setColorMap] = useState({}); // Track color for each number
//     const [valueMap, setValueMap] = useState({}); // Track value for each number
//     const [selectedGameId, setSelectedGameId] = useState(null);


//     let resultDeclared = false;

//     const autoDeclareResult = async (latestGameID) => {
        
//         if (resultDeclared) return;
//         resultDeclared = true;
//         // Log all bets to debug the contents
//         // Fetch all bets for the given gameID
//         const url = `http://localhost:3002/api/getAllBets?gameID=${latestGameID}`;
//         const { data } = await axios.get(url, {
//             headers: {
//                 'Authorization': `Bearer ${token}`
//             }
//         });
        
//         const allbet = data.data; // Assuming the response contains the bets array directly

//         console.log('All Bets autoDeclareResult', latestGameID ,allbet);
    
//         // Find the minimum bet value
//         const minBetValue = Math.min(...allbet);
    
//         // Collect indices where the bet matches the minimum value
//         const minBetIndices = allbet
//             .map((amount, index) => (amount === minBetValue ? index : -1)) // Map to indices with min value or -1
//             .filter(index => index !== -1); // Remove -1 entries
    
//         if (minBetIndices.length === 0) {
//             console.log('No bets found');
//             return;
//         }
//         // Randomly select an index if there are multiple
//         const selectedIndex = minBetIndices[Math.floor(Math.random() * minBetIndices.length)];
//         // Find the corresponding predefined bet
//         const selectedPredefinedBet = predefinedBets.find(bet => bet.index === selectedIndex);
//         console.log("Selected predefined bet:",latestGameID, selectedPredefinedBet);
//         console.log("Selected  selectedIndex:",latestGameID, selectedIndex);
//         console.log("minBetIndices",latestGameID,minBetIndices)
//         try {
//             const { resultColor, resultValue } = selectedPredefinedBet;
//             const response = await axios.put(
//                 `http://localhost:3002/api/declareResult/${latestGameID}`, // Ensure gameID is correctly included in the URL
//                 { result: { resultColor, resultValue } },
//                 {
//                     headers: {
//                         'Authorization': `Bearer ${token}`
//                     }
//                 }
//             );
//             console.log('Bet posted successfully:',latestGameID, response.data);
//             toast.success("Bet posted successfully", {
//                 position: "top-right",
//                 autoClose: 3000,
//                 hideProgressBar: false,
//                 closeOnClick: true,
//                 pauseOnHover: true,
//                 draggable: true,
//                 progress: undefined,
//             });

//             // Clear selected bet after successful post
//             setSelectedBet(null);
//             handleCloseModal()
//             handleGetallResult()
//         } catch (error) {
//             console.error("Error posting bet:", error);

//         }
        
//     };

//     const handleGetallBet = async (gameID) => {
//         try {
//             const url = `http://localhost:3002/api/getAllBets?gameID=${gameID}`;
//             const { data } = await axios.get(url, {
//                 headers: {
//                     'Authorization': `Bearer ${token}`
//                 }
//             });
//             setAllbeta(data.data);
//         } catch (error) {
//             console.error("Error fetching bets:", error);
//         }
//     };


//     const handleGetallResult = async () => {
//         try {
//             const { data } = await axios.get("http://localhost:3002/api/results");
//             if (data && data.length >= 0) {
//                 const latestGameID = data[0].gameID;
//                 const latestGameId = data[1].gameID;
//                 setResult(data);
//                 await handleGetallBet(latestGameID);
//                 await autoDeclareResult(latestGameId);
//             }
//         } catch (error) {
//             console.error("Error fetching data:", error);
//             toast.error("Failed to fetch results", {
//                 position: "top-right",
//                 autoClose: 3000,
//                 hideProgressBar: false,
//                 closeOnClick: true,
//                 pauseOnHover: true,
//                 draggable: true,
//                 progress: undefined,
//             });
//         }
//     };

//     useEffect(() => {
//         const socket = io('http://localhost:3002');

//         socket.on('newGameId', (gameId) => {
//             const timestamp = Date.now();
//             setNewGameId(gameId);
//             setNewGameTimestamp(timestamp);
//         });
    

//         return () => {
//             socket.disconnect();
//         };
//     }, []);

//     useEffect(() => {
//         if (newGameId) {
//             handleGetallBet(newGameId);
//             handleGetallResult();
//         }
//     }, [newGameId]);

//     const handleViewClick = (transaction) => {
//         setSelectedBet(transaction);
//         setShowModal(true);
//         handleGetallBet(transaction.gameID);
//         setSelectedGameId(transaction.gameID);
//         // console.log(allbet)
//     };



//     const handleCloseModal = () => setShowModal(false);

//     const getClassName = (index) => {
//         let baseClass = 'p-3 border ';
//         if (index === 0) return baseClass + 'button1';
//         if (index === 1) return baseClass + 'button3';
//         if (index === 2) return baseClass + 'button2';
//         if (index === 3) return baseClass + 'button3';
//         if (index === 4) return baseClass + 'button2';
//         if (index === 5) return baseClass + 'button4';
//         if (index === 6) return baseClass + 'button2';
//         if (index === 7) return baseClass + 'button3';
//         if (index === 8) return baseClass + 'button2';
//         if (index === 9) return baseClass + 'button3';
//         if (index === 10) return baseClass + 'button2';
//         if (index === 11) return baseClass + 'button3';
//         if (index === 12) return baseClass + 'button5';

//         return baseClass;
//     };




//     const handleDivClick = (index) => {
//         const betData = predefinedBets.find(bet => bet.index === index);
//         if (betData) {
//             setColorMap(prev => ({
//                 ...prev,
//                 [index]: betData.resultColor
//             }));
//             setValueMap(prev => ({
//                 ...prev,
//                 [index]: betData.resultValue
//             }));
//             setFormdata(betData); // Store clicked bet

//         }
//     };
//     // console.log(formdata)

//     // bet function 
//     const handleBet = async (gameID) => {
//         // console.log("handleBet gameID:", gameID);

//         // Ensure gameID is a string
//         if (!formdata || !gameID || typeof gameID !== 'string') {
//             console.error("selectedBet or gameID is null or undefined");
//             toast.error("Please select a bet before submitting", {
//                 position: "top-right",
//                 autoClose: 3000,
//                 hideProgressBar: false,
//                 closeOnClick: true,
//                 pauseOnHover: true,
//                 draggable: true,
//                 progress: undefined,
//             });
//             return;
//         }
//         // console.log(formdata)

//         try {
//             const { resultColor, resultValue } = formdata;
//             const response = await axios.put(
//                 `http://localhost:3002/api/declareResult/${gameID}`, // Ensure gameID is correctly included in the URL
//                 { result: { resultColor, resultValue } },
//                 {
//                     headers: {
//                         'Authorization': `Bearer ${token}`
//                     }
//                 }
//             );
//             // console.log('Bet posted successfully:', response.data);
//             toast.success("Bet posted successfully", {
//                 position: "top-right",
//                 autoClose: 3000,
//                 hideProgressBar: false,
//                 closeOnClick: true,
//                 pauseOnHover: true,
//                 draggable: true,
//                 progress: undefined,
//             });

//             // Clear selected bet after successful post
//             setSelectedBet(null);
//             handleCloseModal()
//             handleGetallResult()
//         } catch (error) {
//             console.error("Error posting bet:", error);

//         }
//     };



    
 
    
//     return (
//         <div>
//             <div className="custom-table w-100">
//                 <Table bordered hover>
//                     <thead>
//                         <tr>
//                             <th>Game ID</th>
//                             <th>Date & Time</th>
//                             <th>Action</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {results && results.map((transaction, index) => (
//                             <tr key={index}>
//                                 <td>{transaction?.gameID}</td>
//                                 <td>{transaction.createdAt}</td>
//                                 <td>
//                                     <Button className="btn-view" onClick={() => handleViewClick(transaction)}>View</Button>
//                                     <Button className={`btn ${transaction.result ? 'btn-success' : 'btn-danger'}`}>
//                                         {transaction.result ? "Done" : "Pending"}
//                                     </Button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </Table>
//             </div>

//             <Modal show={showModal} onHide={handleCloseModal}>
//                 <Modal.Header closeButton>
//                     <Modal.Title>Transaction Details</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     {selectedBet && (
//                         <>
//                             <p>Game ID: {selectedBet.gameID}</p>
//                             <div className="container mt-2">
//                                 <h2 className='bg-warning py-3'>Dashboard</h2>

//                                 <div className="row">
//                                     <div className='d-flex justify-content-between px-5'>
//                                         <div className='bg-danger p-2 fw-bold text-white'>1 min - {newGameId}</div>
//                                     </div>
//                                     {allbet.map((amount, index) => (
//                                         <div className="col-4" key={index}>
//                                             <div className={getClassName(index)} onClick={() => handleDivClick(index)}>
//                                                 {index}
//                                                 <div>Bet Amount :{amount}</div>
//                                             </div>
//                                         </div>
//                                     ))}

//                                 </div>

//                             </div>
//                         </>
//                     )}
//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button variant="secondary" onClick={handleCloseModal}>
//                         Close
//                     </Button>
//                     <Button variant="secondary" onClick={() => handleBet(selectedGameId)}>
//                         Result
//                     </Button>
//                 </Modal.Footer>
//             </Modal>
//         </div>
//     );
// };

// export default BetResult;



import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Table, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import io from 'socket.io-client';

const predefinedBets = [
    { index: 0, resultColor: 'violetred', resultValue: 0 },
    { index: 1, resultColor: 'green', resultValue: 1 },
    { index: 2, resultColor: 'red', resultValue: 2 },
    { index: 3, resultColor: 'green', resultValue: 3 },
    { index: 4, resultColor: 'red', resultValue: 4 },
    { index: 5, resultColor: 'violetgreen', resultValue: 5 },
    { index: 6, resultColor: 'red', resultValue: 6 },
    { index: 7, resultColor: 'green', resultValue: 7 },
    { index: 8, resultColor: 'red', resultValue: 8 },
    { index: 9, resultColor: 'green', resultValue: 9 },
    { index: 10, resultColor: 'red', resultValue: '' },
    { index: 11, resultColor: 'green', resultValue: '' },
    { index: 12, resultColor: 'violet', resultValue: '' },
];

const BetResult = () => {
    const { token } = useSelector((store) => store.AuthReducer);
    const dispatch = useDispatch();
    const [newGameTimestamp, setNewGameTimestamp] = useState(null);
    const [newGameId, setNewGameId] = useState(null);
    const [results, setResult] = useState([]);
    const [allbet, setAllbeta] = useState([]);
    const [selectedBet, setSelectedBet] = useState(null);
    const [formdata, setFormdata] = useState(null);
    const [manualDeclare, setManualDeclare] = useState(false); // New state to control manual/auto declare

    const [showModal, setShowModal] = useState(false);
    const [colorMap, setColorMap] = useState({}); // Track color for each number
    const [valueMap, setValueMap] = useState({}); // Track value for each number
    const [selectedGameId, setSelectedGameId] = useState(null);

    let resultDeclared = false;

    const autoDeclareResult = async (latestGameID) => {
        if (resultDeclared || manualDeclare) return; // Prevent auto-declare if manualDeclare is true
        resultDeclared = true;

        const url = `http://localhost:3002/api/getAllBets?gameID=${latestGameID}`;
        const { data } = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const allbet = data.data;

        const minBetValue = Math.min(...allbet);
        const minBetIndices = allbet
            .map((amount, index) => (amount === minBetValue ? index : -1))
            .filter(index => index !== -1);

        if (minBetIndices.length === 0) {
            console.log('No bets found');
            return;
        }

        const selectedIndex = minBetIndices[Math.floor(Math.random() * minBetIndices.length-3)];
        const selectedPredefinedBet = predefinedBets.find(bet => bet.index === selectedIndex);

        try {
            const { resultColor, resultValue } = selectedPredefinedBet;
            const response = await axios.put(
                `http://localhost:3002/api/declareResult/${latestGameID}`,
                { result: { resultColor, resultValue } },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            toast.success("Bet posted successfully", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

            setSelectedBet(null);
            handleCloseModal();
            handleGetallResult();
        } catch (error) {
            console.error("Error posting bet:", error);
        }
    };

    const handleGetallBet = async (gameID) => {
        try {
            const url = `http://localhost:3002/api/getAllBets?gameID=${gameID}`;
            const { data } = await axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setAllbeta(data.data);
        } catch (error) {
            console.error("Error fetching bets:", error);
        }
    };

    const handleGetallResult = async () => {
        try {
            const { data } = await axios.get("http://localhost:3002/api/results");
            if (data && data.length >= 0) {
                const latestGameID = data[0].gameID;
                const latestGameId = data[1].gameID;
                setResult(data);
                await handleGetallBet(latestGameID);
                await autoDeclareResult(latestGameId);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            toast.error("Failed to fetch results", {
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

    useEffect(() => {
        const socket = io('http://localhost:3002');

        socket.on('newGameId', (gameId) => {
            const timestamp = Date.now();
            setNewGameId(gameId);
            setNewGameTimestamp(timestamp);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    useEffect(() => {
        if (newGameId) {
            handleGetallBet(newGameId);
            handleGetallResult();
        }
    }, [newGameId]);

    const handleViewClick = (transaction) => {
        setSelectedBet(transaction);
        setShowModal(true);
        handleGetallBet(transaction.gameID);
        setSelectedGameId(transaction.gameID);
    };

    const handleCloseModal = () => setShowModal(false);

    const getClassName = (index) => {
        let baseClass = 'p-3 border ';
        if (index === 0) return baseClass + 'button1';
        if (index === 1) return baseClass + 'button3';
        if (index === 2) return baseClass + 'button2';
        if (index === 3) return baseClass + 'button3';
        if (index === 4) return baseClass + 'button2';
        if (index === 5) return baseClass + 'button4';
        if (index === 6) return baseClass + 'button2';
        if (index === 7) return baseClass + 'button3';
        if (index === 8) return baseClass + 'button2';
        if (index === 9) return baseClass + 'button3';
        if (index === 10) return baseClass + 'button2';
        if (index === 11) return baseClass + 'button3';
        if (index === 12) return baseClass + 'button5';

        return baseClass;
    };

    const handleDivClick = (index) => {
        const betData = predefinedBets.find(bet => bet.index === index);
        if (betData) {
            setColorMap(prev => ({
                ...prev,
                [index]: betData.resultColor
            }));
            setValueMap(prev => ({
                ...prev,
                [index]: betData.resultValue
            }));
            setFormdata(betData);
        }
    };

    const handleBet = async (gameID) => {
        if (!formdata || !gameID || typeof gameID !== 'string') {
            toast.error("Please select a bet before submitting", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return;
        }

        try {
            const { resultColor, resultValue } = formdata;
            const response = await axios.put(
                `http://localhost:3002/api/declareResult/${gameID}`,
                { result: { resultColor, resultValue } },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            toast.success("Bet posted successfully", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

            setSelectedBet(null);
            handleCloseModal();
            handleGetallResult();
        } catch (error) {
            console.error("Error posting bet:", error);
        }
    };

    return (
        <div>
             {/* Toggle button for auto/manual declaration */}
             <div className="manual-toggle">
                <Button variant={manualDeclare ? "danger" : "success"} onClick={() => setManualDeclare(!manualDeclare)}>
                    {manualDeclare ? "Manual Declare" : "Auto Declare"}
                </Button>
            </div>
            <div className="custom-table w-100">
                <Table bordered hover>
                    <thead>
                        <tr>
                            <th>Game ID</th>
                            <th>Date & Time</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results && results.map((transaction, index) => (
                            <tr key={index}>
                                <td>{transaction?.gameID}</td>
                                <td>{transaction.createdAt}</td>
                                <td>
                                    <Button className="btn-view" onClick={() => handleViewClick(transaction)}>View</Button>
                                    <Button className={`btn ${transaction.result ? 'btn-success' : 'btn-danger'}`}>
                                        {transaction.result ? "Done" : "Pending"}
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Transaction Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedBet && (
                        <>
                            <p>Game ID: {selectedBet.gameID}</p>
                            <div className="container mt-2">
                                <h2 className='bg-warning py-3'>Dashboard</h2>

                                <div className="row">
                                    <div className='d-flex justify-content-between px-5'>
                                        <div className='bg-danger p-2 fw-bold text-white'>1 min - {newGameId}</div>
                                    </div>
                                    {allbet.map((amount, index) => (
                                        <div className="col-4" key={index}>
                                            <div className={getClassName(index)} onClick={() => handleDivClick(index)}>
                                                {index}
                                                <div>Bet Amount :{amount}</div>
                                            </div>
                                        </div>
                                    ))}

                                </div>

                            </div>
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                    <Button variant="secondary" onClick={() => handleBet(selectedGameId)}>
                        Result
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default BetResult;

