import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

import Home from "./components/home";
import Rooms from "./components/rooms";
import Facilities from "./components/facilities";
import About from "./components/about";
import Contact from "./components/contact";
import RoomDisplay from "./components/roomdisplay";
import User from "./components/userprofile";
import PaymentPage from "./components/paymentsummarypage";
import AdminBookings from "./components/adminpage";
import Profile from "./components/userprofile";
import Register from "./components/register";
import Login from "./components/login";
import ForgotPassword from "./components/forgotpassword";
import TermsAndConditions from "./components/TermsAndConditions";
import { initializeUser } from "./redux/authSlice";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.logged);

  const initialOptions = {
    "client-id":
      "AfIAqx5qwADS2y3HBA3G9jY9LTQxgY71yk1o5OT6ca0OwgiOfGQ2hUnNVYNRVYUDF3MgjtvljjF2m_iN",
    "enable-funding": "venmo",
    currency: "USD",
  };

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
            <Route path="/roomdisplay" element={<RoomDisplay />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot" element={<ForgotPassword />} />
            <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
            <Route
              path="/user"
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <User />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <AdminBookings />
                </PrivateRoute>
              }
            />
            <Route
              path="/userprofile"
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route
              path="/paymentsummary"
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <PaymentPage />
                </PrivateRoute>
              }
            />
          </Routes>
        </PayPalScriptProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
