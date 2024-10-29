import React, { useState, useEffect } from "react";
import "./login.css";
import loginlogo from "./assets/Rectangle 2.png";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signIn } from "../redux/authSlice";
import Loader from "./loader"; 

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const { user, loading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      alert("Login Successful");
      navigate("/");
    }
  }, [user, navigate]);

  const goToForgotPassword = () => {
    navigate("/forgot");
  };

  const goToRegister = () => {
    navigate("/register");
  };

  const validateForm = () => {
    let isValid = true;

    if (!email) {
      setEmailError("Email is required.");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError("Password is required.");
      isValid = false;
    } else {
      setPasswordError("");
    }

    return isValid;
  };

  const handleLogin = async () => {
    if (validateForm()) {
      const result = await dispatch(signIn({ email, password }));
      if (result && result.isAdmin) {
        navigate("/admin");
      } else {
        navigate("/"); 
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login">
        {loading ? (
          <Loader />
        ) : (
          <>
            <div className="login-logo">
              <img src={loginlogo} alt="Login Logo" />
            </div>
            <div className="login-inputs">
              <div className="login-section-A">
                <h1>Welcome back!</h1>
                <p>Welcome back! Please enter your details.</p>
              </div>
              <div className="login-section-B">
                <input
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={emailError ? "login-input-error" : ""}
                />
                {emailError && (
                  <p className="login-error-message">{emailError}</p>
                )}
              </div>
              <div className="login-section-C">
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={passwordError ? "login-input-error" : ""}
                />
                {passwordError && (
                  <p className="login-error-message">{passwordError}</p>
                )}
              </div>
              <div className="login-section-D">
                <span>
                  <a className="goToForgotPassword" onClick={goToForgotPassword}>
                    Forgot password?
                  </a>
                </span>
              </div>
              <div className="login-section-E">
                <button className="login-button" onClick={handleLogin}>
                  Login
                </button>
              </div>

              {error && <p className="login-error-message">Error: {error}</p>}

              <p className="login-section-F">
                Don't have an account?{" "}
                <a className="goToRegister" onClick={goToRegister}>
                  Sign up
                </a>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Login;
