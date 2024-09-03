import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const Alluser = () => {
    const { token } = useSelector((store) => (store.AuthReducer));
    const [transactions, setTransactions] = useState([]);

    const handleSubmit = async () => {
        try {
            const { data } = await axios.get(
                "http://localhost:3002/api/user-list",
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Attaches the authorization token to the request headers
                    },
                }
            );
            // Log the data to check its structure
            console.log("Fetched data:", data);

            // Ensure data is an array before setting it
            if (Array.isArray(data)) {
                setTransactions(data);
            } else {
                console.error("Unexpected data format:", data);
                setTransactions([]);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
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

    useEffect(() => {
        handleSubmit();
    }, []);

    // Calculate total balance
    const totalBalance = Array.isArray(transactions) 
        ? transactions.reduce((sum, user) => sum + (user.walletBalance || 0), 0) 
        : 0;

    return (
        <div>
            <div className="custom-table w-100">
                <div className='d-flex justify-content-between p-3'>
                    <div className='bg-warning fw-bold p-2'>Total User : {Array.isArray(transactions) ? transactions.length : 0}</div>
                    <div className='bg-warning fw-bold p-2'>Total Balance : {totalBalance.toFixed(2)}</div>
                </div>
                <Table bordered hover>
                    <thead>
                        <tr>
                            <th>User Name</th>
                            <th>Amount</th>
                            <th>Email</th>
                            <th>Number</th>
                            <th>Referred</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(transactions) && transactions.map((transaction, index) => (
                            <tr key={index}>
                                <td>{transaction.username}</td>
                                <td>{transaction.walletBalance.toFixed(2)}</td>
                                <td>{transaction.email}</td>
                                <td>{transaction.contactNumber}</td>
                                <td>{transaction.referredUsers?.length || 0}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default Alluser;
