import { HomeIcon, LayoutDashboardIcon, User, Wallet } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { NavLink, useLocation } from 'react-router-dom';
import logo from "./Assets/5.png"
import { useDispatch, useSelector } from 'react-redux';
import { userSignout } from '../Redux/Auth/action';
import Withdrawl from './Withdrawl';
import Alluser from './Alluser';
import AddAccount from './AddAccount';
import io from 'socket.io-client';
import { toast } from 'react-toastify';
import axios from 'axios';
import BetResult from './BetResult';
import BetResultfive from './BetResultfive';

const predefinedBets = [
    { index: 0, resultColor: 'violet+red', resultValue: 0 },
    { index: 1, resultColor: 'green', resultValue: 1 },
    { index: 2, resultColor: 'red', resultValue: 2 },
    { index: 3, resultColor: 'green', resultValue: 3 },
    { index: 4, resultColor: 'red', resultValue: 4 },
    { index: 5, resultColor: 'violet+green', resultValue: 5 },
    { index: 6, resultColor: 'red', resultValue: 6 },
    { index: 7, resultColor: 'green', resultValue: 7 },
    { index: 8, resultColor: 'red', resultValue: 8 },
    { index: 9, resultColor: 'green', resultValue: 9 },
    { index: 10, resultColor: 'violet', resultValue: '' },
    { index: 11, resultColor: 'green', resultValue: '' },
    { index: 12, resultColor: 'red', resultValue: '' },
];

const Home = () => {
    const { token } = useSelector((store) => store.AuthReducer);

    const dispatch = useDispatch();
    const location = useLocation();
    const [newGameTimestamp, setNewGameTimestamp] = useState(null);
    const [newGameId, setNewGameId] = useState(null);
    const [results, setResult] = useState()
    const [allbet, setAllbeta] = useState([])
    const [gameupi, setGameupi] = useState(); // Initialize with null
    const [colorMap, setColorMap] = useState({}); // Track color for each number
    const [valueMap, setValueMap] = useState({}); // Track value for each number
    const [selectedBet, setSelectedBet] = useState(null); // Store clicked bet

    const handleSignout = () => {
        dispatch(userSignout());
    };

    // game id or time from backend socket 
    useEffect(() => {
        const socket = io('http://localhost:3002');

        socket.on('newGameId', (gameId) => {
            const timestamp = Date.now();
            console.log('Received new gameId:', gameId);

            setNewGameId(gameId);
            setNewGameTimestamp(timestamp);
            setGameupi(gameId); // Set gameupi here
        });
        handleGetallResult()

        return () => {
            socket.disconnect();
        };
    }, []);

    // TOTAL AMOUNT OF NUMBER OR COLOR 
    const handleGetallBet = async (gameupi) => {
        try {
            const url = `http://localhost:3002/api/getAllBets?gameID=${gameupi}`;
            const { data } = await axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log('Fetched all bets of previous gameID:', data); // Verify the data
            setAllbeta(data.data);
        } catch (error) {
            console.error("Error fetching bets:", error);
            toast.error("Failed to fetch bets", {
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

    // GET GAME RESULT 
    const handleGetallResult = async () => {
        try {
            const { data } = await axios.get("http://localhost:3002/api/results");
            // console.log("data from previous gameID", data[1].gameID)
            await handleGetallBet(data[1].gameID);
            await handleBet(data[1].gameID);
            setResult(data);
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

    console.log("LAST GAME ID", results)
    console.log(allbet)

    useEffect(() => {
        if (gameupi) {
            handleGetallBet(gameupi);
            handleGetallResult()
        }
    }, [gameupi]);

 
    console.log(selectedBet)


    // bet function 
    const handleBet = async (gameupi) => {
        console.log("handleBet", gameupi);


        try {
            const { resultColor, resultValue } = selectedBet;
            const response = await axios.put(
                `http://localhost:3002/api/declareResult/${gameupi}`,
                { result: { resultColor, resultValue } }, // Send only resultColor and resultValue directly
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            console.log('Bet posted successfully:', response.data);
            toast.success("Bet posted successfully", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

            // Clear selected bet after successful post
            setSelectedBet(null);
        } catch (error) {
            console.error("Error posting bet:", error);

        }
    };

    return (
        <div className='d-flex'>

            <div
                className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark"
                style={{ width: 250 }}
            >
                <Link
                    to="/"
                    className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
                >
                    <div className='imagelogo'>
                        {/* <img className='imagelogo' height={"90px"} src={logo} alt='loogo'/> */}
                    </div>
                </Link>
                <hr />
                <ul className="nav nav-pills flex-column mb-auto">
                    <li className="nav-item">
                        <NavLink to="/" className="nav-link  text-white" activeClassName="active" aria-current="page">
                            <HomeIcon />
                            Home
                        </NavLink>
                    </li>
                    {/* <li>
                        <NavLink to="/dashboard" className="nav-link text-white" activeClassName="active">
                            <LayoutDashboardIcon />
                            Dashboard
                        </NavLink>
                    </li> */}


                    <li>
                        <NavLink to="/withdrawl" exact className="nav-link text-white" activeClassName="active">
                            <Wallet />
                            Deposit & Withdrawl
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/addaccount" exact className="nav-link text-white" activeClassName="active">
                            <Wallet />
                            Account Details
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/betresult" exact className="nav-link text-white" activeClassName="active">
                            <Wallet />
                            Result
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/betresultfive" exact className="nav-link text-white" activeClassName="active">
                            <Wallet />
                            Result 5 Mint
                        </NavLink>
                    </li>
                </ul>
                <hr />
                <div className="dropdown">
                    <Link
                        to="#"
                        className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
                        id="dropdownUser1"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        <img
                            src="https://github.com/mdo.png"
                            alt=""
                            width={32}
                            height={32}
                            className="rounded-circle me-2"
                        />
                        <strong>Rahul</strong>
                    </Link>
                    <ul
                        className="dropdown-menu dropdown-menu-dark text-small shadow"
                        aria-labelledby="dropdownUser1"
                    >




                        <li onClick={handleSignout}>
                            <Link className="dropdown-item" to="#">
                                Sign out
                            </Link>
                        </li>
                    </ul>
                </div>





            </div>


            <div className='over'>
                {/* user all    */}




                {location.pathname === '/betresult' && (

                    <BetResult />
                )}




                {location.pathname === '/betresultfive' && (

                    <BetResultfive />
                )}


                {/* withdrawl deposite  */}


                {location.pathname === '/withdrawl' && (

                    <Withdrawl />
                )}




                {/* {location.pathname === '/dashboard' && (
                    <div div className='d-block'>
                        <div className="container mt-2">
                            <h2 className='bg-warning py-3'>Dashboard</h2>

                            <div className="row">
                                <div className='d-flex justify-content-between px-5'>
                                    <div className='bg-danger p-2 fw-bold text-white'>1 min - {newGameId}</div>
                                    <h5>Total Bet Amount : {totalBetAmount}</h5>
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


                        <div className="container mt-2">
                            <div className="row">
                                <div className='d-flex justify-content-between px-5'>
                                    <div className='bg-danger p-2 fw-bold text-white'>5 min - giiqh7jhhj</div>
                                    <h5>Total Bet Amount : 88998</h5>
                                </div>
                                <div className="col-4">
                                    <div className="p-3 border bg-light button1">0
                                        <div>Bet Amount :2000</div>

                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="p-3 border button3">1
                                        <div>Bet Amount :2000</div>
                                    </div>
                                </div>
                                <div className="col-4 ">
                                    <div className="p-3 border  button2">2
                                        <div>Bet Amount :2000</div>

                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-4">
                                    <div className="p-3 border button3">3
                                        <div>Bet Amount :2000</div>

                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="p-3 border button2">4
                                        <div>Bet Amount :2000</div>

                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="p-3 border button4 ">5
                                        <div>Bet Amount :2000</div>

                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-4">
                                    <div className="p-3 border button2">6
                                        <div>Bet Amount :2000</div>

                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="p-3 border button3">7
                                        <div>Bet Amount :2000</div>

                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="p-3 border button2">8
                                        <div>Bet Amount :2000</div>

                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-4">
                                    <div className="p-3 border button3">9
                                        <div>Bet Amount :2000</div>

                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="p-3 border voilet text-white ">Voilet
                                        <div>Bet Amount :2000</div>

                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="p-3 border bg-success text-white">Green
                                        <div>Bet Amount :2000</div>

                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-4">
                                    <div className="p-3 border bg-danger text-white">Red
                                        <div>Bet Amount :2000</div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )} */}








                {/* home  */}


                {location.pathname === '/' && (

                    <Alluser />
                )}
                {location.pathname === '/addaccount' && (

                    <AddAccount />
                )}











            </div>
        </div>
    )
}

export default Home