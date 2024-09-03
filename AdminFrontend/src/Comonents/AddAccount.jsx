import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const AddAccount = () => {
    const { token } = useSelector((store) => (store.AuthReducer));

    const [formData, setFormData] = useState({
        upi_id: '',
        bank_name: '',
        account_holder_name: '',
        account_number: '',
        ifsc: '',
        phone_number: '',
        qr_attachment: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        // Handle form submission
    
        try {
            const data = await axios.post(
                "http://localhost:3002/api/admin-account",formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Attaches the authorization token to the request headers
                    },
                }
            );
           
            toast.success("Account Added succesfully", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            // You can handle data here, such as setting state or other side effects
        } catch (error) {
            console.error("Error fetching data:", error); // Logs any errors that occur during the API call
            toast.error("Failed to add account details", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        console.log('Form Data:', formData);
    };




 


    return (
        <form onSubmit={handleSubmit} className="register-container w-50">
            <div className='form-group'>
                <label>UPIS:</label>

                <input className='form-control' type="text" name="upi_id" value={formData.upi_id} onChange={handleChange} />
            </div>
            <div>
                <label>Bank Name:</label>
                <input 
                className='form-control' type="text" name="bank_name" value={formData.bank_name} onChange={handleChange} />
            </div>
            <div>
                <label>Account Holder Name:</label>
                <input 
                className='form-control' type="text" name="account_holder_name" value={formData.account_holder_name} onChange={handleChange} />
            </div>
            <div>
                <label>Account Number:</label>
                <input 
                className='form-control' type="text" name="account_number" value={formData.account_number} onChange={handleChange} />
            </div>
            <div>
                <label>IFSC:</label>
                <input 
                className='form-control' type="text" name="ifsc" value={formData.ifsc} onChange={handleChange} />
            </div>
            <div>
                <label>Phone Number:</label>
                <input 
                className='form-control' type="text" name="phone_number" value={formData.phone_number} onChange={handleChange} required />
            </div>
            <div>
                <label>URL:</label>
                <input 
                className='form-control' type="text" name="qr_attachment" value={formData.qr_attachment} onChange={handleChange} />
            </div>
            <button type="submit" className="btn btn-login">Submit</button>
        </form>
    );
};

export default AddAccount;
