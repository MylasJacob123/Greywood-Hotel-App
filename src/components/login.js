import React, { useState, useEffect } from "react";
import "./login.css";
import loginlogo from "./assets/Rectangle 2.png";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signIn } from "../redux/authSlice";
import Loader from "./loader";
import Alert from "@mui/material/Alert";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false); 

  const { user, loading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      Swal.fire({
        title: "Login Successful",
        text: "Welcome back! You have successfully logged in.",
        icon: "success",
        confirmButtonText: "Continue",
      }).then(() => {
        navigate("/");
      });
    }
  }, [user, navigate]);

  const goToForgotPassword = () => {
    navigate("/forgot");
  };

  const goToRegister = () => {
    navigate("/register");
  };

  const goToHome = () => {
    navigate("/");
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

      if (result && result.error) {
        Swal.fire({
          title: "Login Failed",
          text: "Invalid email or password. Please try again.",
          icon: "error",
          confirmButtonText: "Retry",
        });
      } else if (result && result.isAdmin) {
        Swal.fire({
          title: "Login Successful",
          text: "Welcome, Admin! Redirecting to the dashboard.",
          icon: "success",
          confirmButtonText: "Continue",
        }).then(() => {
          navigate("/admin");
        });
      } else if (result && !result.error) {
        Swal.fire({
          title: "Login Successful",
          text: "Welcome back! Redirecting to the homepage.",
          icon: "success",
          confirmButtonText: "Continue",
        }).then(() => {
          navigate("/");
        });
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
            <FontAwesomeIcon
              className="login-back-arrow"
              icon={faArrowLeft}
              onClick={goToHome}
            />
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
                  <Alert
                    severity="error"
                    style={{ margin: "0.6rem auto", width: "98%" }}
                  >
                    {emailError}
                  </Alert>
                )}
              </div>
              <div className="login-section-C">
                <div className="login-password-input-container">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={passwordError ? "login-input-error" : ""}
                  />
                  <FontAwesomeIcon
                    className="login-password-toggle-icon"
                    icon={showPassword ? faEye : faEyeSlash}
                    onClick={() => setShowPassword(!showPassword)}
                  />
                </div>
                {passwordError && (
                  <Alert
                    severity="error"
                    style={{ margin: "0.6rem auto", width: "98%" }}
                  >
                    {passwordError}
                  </Alert>
                )}
              </div>
              <div className="login-section-D">
                <span>
                  <a
                    className="goToForgotPassword"
                    onClick={goToForgotPassword}
                  >
                    Forgot password?
                  </a>
                </span>
              </div>
              <div className="login-section-E">
                <button className="login-button" onClick={handleLogin}>
                  Login
                </button>
              </div>

              {error && (
                <Alert
                  severity="error"
                  style={{ margin: "0.6rem auto", width: "98%" }}
                >
                  Error: {error}
                </Alert>
              )}

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
