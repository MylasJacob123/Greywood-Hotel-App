import React, { useEffect } from "react";
import Register from "./components/register";
import Login from "./components/login";
import ForgotPassword from "./components/forgotpassword";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import Facilities from "./components/facilities";
import Rooms from "./components/rooms";
import About from "./components/about";
import Contact from "./components/contact";
import "./App.css";
import RoomDisplay from "./components/roomdisplay";
import User from "./components/userprofile";
import PaymentPage from "./components/paymentsummarypage";
import AdminBookings from "./components/adminpage";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import Profile from "./components/userprofile";
import { useDispatch } from "react-redux";
import { initializeUser } from "./redux/authSlice";

function App() {
  
  const initialOptions = {
    "client-id":
      "AfIAqx5qwADS2y3HBA3G9jY9LTQxgY71yk1o5OT6ca0OwgiOfGQ2hUnNVYNRVYUDF3MgjtvljjF2m_iN",
    "enable-funding": "venmo",
    currency: "USD",
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeUser()); 
  }, [dispatch]);

  return (
    <div className="App">
      <BrowserRouter>
        <PayPalScriptProvider options={initialOptions}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/facilities" element={<Facilities />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/user" element={<User />} />
            <Route path="/admin" element={<AdminBookings />} />
            <Route path="/userprofile" element={<Profile />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot" element={<ForgotPassword />} />
            <Route path="/roomdisplay" element={<RoomDisplay />} />
            <Route path="/paymentsummary" element={<PaymentPage />} />
          </Routes>
        </PayPalScriptProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
