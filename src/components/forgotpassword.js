import React, { useState } from "react";
import "./forgotpassword.css";
import forgotpasswordlogo from "./assets/Rectangle 2.png";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const validateEmail = (email) => {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
  };

  const handleContinue = () => {
    if (!email) {
      setError("Email is required");
    } else if (!validateEmail(email)) {
      setError("Invalid email format");
    } else {
      setError("");
      alert("Password reset link sent!");
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password">
        <div className="forgot-password-logo">
          <img src={forgotpasswordlogo} alt="Forgot Password Logo" />
        </div>
        <div className="forgot-password-inputs">
          <div className="forgot-password-section-A">
            <h1>Forgot Password</h1>
            <p>Please enter your email address.</p>
          </div>
          <div className="forgot-password-section-B">
            <input
              type="text"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {error && <p className="forgot-password-error">{error}</p>}
          </div>
          <div className="forgot-password-section-c">
            <button className="forgot-password-button" onClick={handleContinue}>
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
