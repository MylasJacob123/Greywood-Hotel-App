import React, { useState } from "react";
import "./register.css";
import registerlogo from "./assets/Rectangle 2.png";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signUp } from "../redux/authSlice";


function Register() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const handleRegister = () => {
        console.log(email, password);
        dispatch(signUp({"email":email,"password" :password}));
        // navigate("/");
    }

  return (
    <div className="register-container">
      <div className="register">
        <div className="register-logo">
          <img className="register-logo-image" src={registerlogo} />
        </div>
        <div className="register-inputs">
          <div className="register-section-A">
            <h1>Create an account</h1>
            <p>
              Already have an account? <a href="">Login</a>
            </p>
          </div>
          <div className="register-section-B">
            <input
              className="register-name-input"
              type="text"
              placeholder="First Name"
            />
            <input
              className="register-name-input"
              type="text"
              placeholder="Last Name"
            />
          </div>
          <div className="register-section-C">
            <input
              className="register-email-input"
              type="text"
              placeholder="Email"
            //   value={email}
              onChange= {(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="register-section-D">
            <input
              className="register-password-input"
              type="password"
              placeholder="Password"
            //   value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="register-section-E">
            <input
               className="register-section-E-text"
              type="checkbox"
              required
              name="terms-and-conditions"
            />{" "}
            I agree to <a>Terms & Conditions</a>
          </div>
          <div className="register-section-F">
            <button className="register-button" onClick={handleRegister}>Create account</button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Register;
