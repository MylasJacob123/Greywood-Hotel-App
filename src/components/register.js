import React, { useState, useEffect } from "react";
import "./register.css";
import registerlogo from "./assets/Rectangle 2.png";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signUp } from "../redux/authSlice";
import Loader from "./loader";
import Alert from "@mui/material/Alert";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const { user, loading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      Swal.fire({
        title: "Registration Successful",
        text: "Welcome! You have successfully registered.",
        icon: "success",
        confirmButtonText: "Continue",
      }).then(() => {
        navigate("/");
      });
    }
  }, [user, navigate]);

  const validate = () => {
    const newErrors = {};
    if (!firstName) newErrors.firstName = "First name is required";
    if (!lastName) newErrors.lastName = "Last name is required";
    if (!email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email))
      newErrors.email = "Invalid email format";
    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters long";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const goToLoginPage = () => {
    navigate("/login");
  };

  const handleRegister = () => {
    if (validate()) {
      dispatch(signUp({ email, password, firstName, lastName }))
        .then(() => {
          Swal.fire({
            title: "Registration Successful",
            text: "You have successfully registered!",
            icon: "success",
            confirmButtonText: "Go to Home",
          }).then(() => {
            navigate("/");
          });
        })
        .catch((err) => {
          Swal.fire({
            title: "Error",
            text: err.message || "Registration failed. Please try again.",
            icon: "error",
            confirmButtonText: "Retry",
          });
        });
    }
  };

  const goToTermsAndConditions = () => {
    navigate("/terms-and-conditions");
  };

  return (
    <div className="register-container">
      <div className="register">
        {loading ? (
          <Loader />
        ) : (
          <>
            <div className="register-logo">
              <img className="register-logo-image" src={registerlogo} />
            </div>
            <div className="register-inputs">
              <div className="register-section-A">
                <h1>Create an account</h1>
                <p>
                  Already have an account?{" "}
                  <span className="register-login" onClick={goToLoginPage}>
                    Login
                  </span>
                </p>
              </div>
              <div className="register-section-B">
                <div>
                  <input
                    className="register-name-input"
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  {errors.firstName && (
                    <Alert severity="error" style={{ margin: "0.5rem 0" }}>
                      {errors.firstName}
                    </Alert>
                  )}
                </div>
                <div>
                  <input
                    className="register-name-input"
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                  {errors.lastName && (
                    <Alert severity="error" style={{ margin: "0.5rem 0" }}>
                      {errors.lastName}
                    </Alert>
                  )}
                </div>
              </div>
              <div className="register-section-C">
                <div>
                  <input
                    className="register-email-input"
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {errors.email && (
                    <Alert severity="error" style={{ margin: "0.5rem 0" }}>
                      {errors.email}
                    </Alert>
                  )}
                </div>
              </div>
              <div className="register-section-D">
                <div className="register-password-input-container">
                  <input
                    className="register-password-input"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <FontAwesomeIcon
                    icon={showPassword ? faEye : faEyeSlash} 
                    className="register-password-icon"
                    onClick={() => setShowPassword(!showPassword)} 
                  />
                  {errors.password && (
                    <Alert severity="error" style={{ margin: "0.5rem 0" }}>
                      {errors.password}
                    </Alert>
                  )}
                </div>
              </div>
              <div className="register-section-E">
                <input
                  className="register-section-E-text"
                  type="checkbox"
                  required
                  name="terms-and-conditions"
                />{" "}
                I agree to{" "}
                <span className="Ts-and-Cs" onClick={goToTermsAndConditions}>
                  Terms & Conditions
                </span>
              </div>
              <div className="register-section-F">
                <button className="register-button" onClick={handleRegister}>
                  Create account
                </button>

                {error && (
                  <Alert severity="error" style={{ margin: "0.5rem 0" }}>
                    {error}
                  </Alert>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Register;
