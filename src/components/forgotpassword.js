import React from 'react';
import "./forgotpassword.css";
import forgotpasswordlogo from "./assets/Rectangle 2.png";

function forgotpassword() {
  return (
    <div className="forgot-password-container">
        <div className="forgot-password">
            <div className="forgot-password-logo">
                <img src={forgotpasswordlogo} />
            </div>
            <div className="forgot-password-inputs">
                <div className="forgot-password-section-A">
                    <h1>Forgot Password</h1>
                    <p>Please enter your email address.</p>
                </div>
                <div className="forgot-password-section-B">
                <input type="text" placeholder="Enter your email" />
                </div>
                <div className="forgot-password-section-c">
                <button className="forgot-password-button">Continue</button>
                </div>
                
            </div>
        </div>
    </div>
  )
}
export default forgotpassword;
