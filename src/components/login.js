import React, { useState, useEffect } from "react";
import "./login.css";
import loginlogo from "./assets/Rectangle 2.png";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signIn } from "../redux/authSlice";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { user, loading, error } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() =>{
    if (user) {
      alert("Login Successful")
      navigate("/");
    }
  }, [user, navigate])

  const goToForgotPassword = () => {
    navigate("/forgot");
  };

  const goToRegister = () => {
    navigate("/register");
  };

  const handleLogin = () => {
    console.log(email, password);
    dispatch(signIn({ email: email, password: password }));
    // navigate("/");
  };

  return (
    <div className="login-container">
      <div className="login">
        <div className="login-logo">
          <img src={loginlogo} />
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
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="login-section-C">
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
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

          {loading ? <h1>Loading .....</h1> : <h1></h1>}
          {error && <p>Error: {error}</p>}

          <p className="login-section-F">
            Don't have an account?{" "}
            <a className="goToRegister" onClick={goToRegister}>
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
export default Login;
