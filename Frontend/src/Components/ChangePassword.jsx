import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import logo from "../Assets/Images/logo.png";
import "react-toastify/dist/ReactToastify.css";

export default function ChangePassword() {
  const { token } = useSelector((store) => store.AuthReducer);
  console.log("token ",token)
  const [formData, setFormData] = useState({
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents the default form submission behavior

    try {
      const data = await axios.patch(
        "http://localhost:3002/api/user",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Attaches the authorization token to the request headers
          },
        }
      );
      toast.success("Password Changed Succesfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // toggle eye button for show and hide password
  const [showPassword2, setShowPassword2] = useState(false);
  const togglePass2 = () => {
    setShowPassword2(!showPassword2);
  };

  return (
    <>
      <main className="pt-3">
        <div className="container pt-3">
          <div className="row justify-content-center">
            <div className="col-md-4">
              <form className="change-password">
                <div>
                  <img src={logo} alt="" height={"100px"} />
                  <span className='fs-3 fw-bold'>Baba Dream Club</span>
                </div>
                <div className="form-group mb-3">
                  <label className="small" htmlFor="newPassword">
                    New Password
                  </label>
                  <input
                    type={showPassword2 ? "text" : "password"}
                    className="form-control text-dark custom-placeholder"
                    placeholder="New Password"
                    aria-describedby="basic-addon1"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    className="btn eye"
                    onClick={togglePass2}
                  >
                    {showPassword2 ? (
                      <EyeOff color="#fff" strokeWidth={1} />
                    ) : (
                      <Eye color="#fff" strokeWidth={1} />
                    )}
                  </button>
                </div>
                <div className="form-group login-btn">
                  <button
                    className="btn btn-primary w-100"
                    onClick={handleSubmit}
                  >
                    Change Password
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
