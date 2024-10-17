import React, { useState, useEffect } from "react";
import "./register.css";
import registerlogo from "./assets/Rectangle 2.png";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signUp } from "../redux/authSlice";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errors, setErrors] = useState({});

  const { user, loading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      alert("Registration Successful");
      navigate("/");
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
  }

  const handleRegister = () => {
    if (validate()) {
      dispatch(signUp({ email, password, firstName, lastName }));
    }
  };

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
              Already have an account?{" "}
              <span className="register-login" onClick={goToLoginPage}>Login</span>
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
                <p className="register-error">{errors.firstName}</p>
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
                <p className="register-error">{errors.lastName}</p>
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
              {errors.email && <p className="register-error">{errors.email}</p>}
            </div>
          </div>
          <div className="register-section-D">
            <div>
              <input
                className="register-password-input"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && (
                <p className="register-error">{errors.password}</p>
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
            I agree to <span className="Ts-and-Cs">Terms & Conditions</span>
          </div>
          <div className="register-section-F">
            <button className="register-button" onClick={handleRegister}>
              Create account
            </button>

            {loading ? <h1>Loading .....</h1> : null}
            {error && <p>Error: {error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;