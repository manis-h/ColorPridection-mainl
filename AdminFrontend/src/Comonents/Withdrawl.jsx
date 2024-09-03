import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Table, Modal, Form } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const Withdrawl = () => {
    const { token } = useSelector((store) => (store.AuthReducer));

    const [showModal, setShowModal] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [showModal1, setShowModal1] = useState(false);
    const [selectedTransaction1, setSelectedTransaction1] = useState(null);

    const [amount, setAmount] = useState({
        addChip: 0,
        status: "A"
    });

    const [transactions, setTransactions] = useState([])


    const handleSubmit = async () => {
        try {
            const data = await axios.get(
                "http://localhost:3002/api/transaction-logs",
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Attaches the authorization token to the request headers
                    },
                }
            );
            console.log(data)
            setTransactions(data.data)
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

    useEffect(() => {
        handleSubmit();
    }, []);


    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedTransaction(null);
        setShowModal1(false);
        setSelectedTransaction1(null);
    };


    const handleViewClick = (transaction) => {
        setSelectedTransaction(transaction);
        setShowModal(true);
    };

    const handleViewClick1 = (transaction) => {
        setSelectedTransaction1(transaction);
        setShowModal1(true);
    };


    const handleAmountChange = (e) => {
        const { name, value } = e.target;
        console.log(`Name: ${name}, Value: ${value}`); // Debug log
        setAmount({
            ...amount,
            [name]: +value,
        });
    };
    


  

    // const handleAmountChange = (e) => {
    //     const { name, value } = e.target;
    //     setAmount({
    //       ...amount,
    //       [name]: +value,
    //     });
    // };

    const handleWithdrawl = async (id) => {
        try {
            // Send a PATCH request to update the status
            const response = await axios.patch(
                `http://localhost:3002/api/transaction-log/${id}`,
                { status: "C" },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
    
            console.log('Withdrawl Response:', response.data);
    
            // Check if the response contains the updated transaction
           console.log(response)
    
            toast.success("Updated successfully");
            handleCloseModal();
        } catch (error) {
            console.error("Error updating status:", error);
            toast.error("Failed to update status");
        }
    };




    const handleAmountSubmit = async (e, id) => {
        e.preventDefault(); // Prevents default form submission behavior
        try {
            const response = await axios.patch(
                `http://localhost:3002/api/transaction-log/${id}`,amount,
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Attaches the authorization token to the request headers
                    },
                }
            );
           
        // Find the updated transaction in the response
        const updatedTransaction = response.data;
        
        // Update the specific transaction in the list
        setTransactions(transactions.map(transaction =>
            transaction._id === id ? updatedTransaction : transaction
        ));

            toast.success("Balance Updated successfully", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            handleCloseModal()
            handleSubmit()

        } catch (error) {
            console.error("Error fetching data:", error);
            toast.error("Failed to fetch Balance details", {
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

    return (
        <div>
            <div className="custom-table w-100">
                <Table bordered hover>
                    <thead>
                        <tr>
                            <th>User Name</th>
                            <th>Amount</th>
                            <th>UTR Number</th>
                            <th>Type</th>


                            <th>Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions && transactions?.map((transaction, index) => (
                            <tr key={index}>
                                <td>{transaction?.user_id.username}</td>
                                <td>{transaction.amount}</td>
                                <td>{transaction.unique_transaction_id}</td>
                                <td>{transaction.type}</td>
                                <td>{transaction.created_at}</td>
                                <td>
                                    <Button className="btn-view" onClick={() => handleViewClick(transaction)}>View</Button>
                                    {transaction.type === "D" ? <Button className="btn-approve" onClick={() => handleViewClick1(transaction)}>+Amount</Button> : ""}
                                   {transaction.type === "W" ? <Button className="btn-decline" onClick={() => handleWithdrawl(transaction._id)}>Delete</Button>:""}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>

            {/* modal view  */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Transaction Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedTransaction && (
                        <>
                            <p><strong>Name:</strong> {selectedTransaction.account_holder_name}</p>
                            <p><strong>Bank:</strong> {selectedTransaction.account_ifsc_code}</p>
                            <p><strong>AC No:</strong> {selectedTransaction.account_ifsc_code}</p>


                            <p><strong>Amount:</strong> {selectedTransaction.amount.toFixed(2)}</p>
                            <p><strong>IFSC:</strong> {selectedTransaction.account_ifsc_code}</p>
                            <p><strong>Number:</strong> {selectedTransaction.user_id.contactNumber}</p>
                            <p><strong>Email:</strong> {selectedTransaction.user_id.email}</p>
                            <p><strong>Balance:</strong> {selectedTransaction.user_id.walletBalance}</p>


                            <p><strong>UTR Number:</strong> {selectedTransaction.unique_transaction_id}</p>
                            <p><strong>Date:</strong> {selectedTransaction.created_at}</p>
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>




            {/* add ammount 
             */}
            <Modal show={showModal1} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Amounts</Modal.Title>
                </Modal.Header>
                <Modal.Body>
               
                            {selectedTransaction1?._id}
                           
                
                    <Form>
                        <Form.Group controlId="amount">
                            <Form.Label>Amount </Form.Label>
                            <Form.Control
                                type="number"
                                name="addChip"
                                value={amount.addChip}
                                onChange={handleAmountChange}
                                placeholder="Enter amount"
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
                    <Button variant="primary" onClick={(e) => handleAmountSubmit(e,selectedTransaction1?._id)}>Submit</Button>
                </Modal.Footer>
            </Modal>



        </div>
    )
}

export default Withdrawl
