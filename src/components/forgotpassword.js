import React, { useState } from "react";
import "./forgotpassword.css";
import forgotpasswordlogo from "./assets/Rectangle 2.png";
import { useSelector, useDispatch } from "react-redux";
import { resetPassword } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import Loader from "./loader";
import Alert from "@mui/material/Alert";
import Swal from "sweetalert2";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { error: authError, loading } = useSelector((state) => state.auth);

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
      dispatch(resetPassword({ email }));

      if (authError) {
        Swal.fire({
          title: "Error",
          text: authError,
          icon: "error",
          confirmButtonText: "Ok",
        });
      } else {
        Swal.fire({
          title: "Password Reset",
          text: "A password reset link has been sent to your email.",
          icon: "success",
          confirmButtonText: "Ok",
        }).then(() => {
          navigate("/");
        });
      }
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password">
        {loading ? (
          <Loader />
        ) : (
          <>
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
                {error && (
                  <Alert severity="error" style={{ margin: "0.5rem 0" }}>
                    {error}
                  </Alert>
                )}
              </div>
              <div className="forgot-password-section-c">
                <button
                  className="forgot-password-button"
                  onClick={handleContinue}
                >
                  Send link
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;
