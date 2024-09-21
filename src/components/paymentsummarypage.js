import React from "react";
import "./paymentsummarypage.css";
import Footer from "./footer";
import { useLocation } from "react-router-dom";

function PaymentPage() {
  const location = useLocation();
  const { room, checkin, checkout, totalPrice } = location.state;

  return (
    <div className="payment-summary-container">
      <div className="main-content">
        <div className="summary-section">
          <h2>Booking Summary</h2>
          <div className="stay-details">
            <h3>Stay Details</h3>
            <p>Room: {room?.roomType}</p>
            <p>Check-in: {checkin}</p>
            <p>Check-out: {checkout}</p>
            <p>Nights: {Math.ceil((new Date(checkout) - new Date(checkin)) / (1000 * 60 * 60 * 24)) || 0}</p>
            <p>Guests: {room?.guests || 0}</p>
          </div>

          <div className="total-cost">
            <h3>Total Cost: R{totalPrice || 0}</h3>
          </div>
        </div>

        <div className="payment-section">
          <h2>Payment Details</h2>
          <form className="payment-form">
            <label>Name on Card:</label>
            <input type="text" placeholder="" />

            <label>Card Number:</label>
            <input type="text" placeholder="" />

            <label>Expiry Date:</label>
            <input type="text" placeholder="" />

            <label>CVV:</label>
            <input type="text" placeholder="123" />

            <label>Promo Code (Optional):</label>
            <input type="text" placeholder="Enter code" />

            <button className="pay-now-btn">Pay Now</button>
          </form>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default PaymentPage;
