import React from "react";
import "./paymentsummarypage.css";
import Footer from "./footer";

function PaymentPage() {
  return (
    <div className="payment-summary-container">

      <div className="main-content">
        <div className="summary-section">
          <h2>Booking Summary</h2>
          <div className="stay-details">
            <h3>Stay Details</h3>
            <p>Room: Deluxe Suite</p>
            <p>Check-in: Sept 21, 2024</p>
            <p>Check-out: Sept 25, 2024</p>
            <p>Nights: 4</p>
            <p>Guests: 2</p>
          </div>

          <div className="services">
            <h3>Additional Services</h3>
            <p>Spa: $100</p>
            <p>Breakfast: $50</p>
          </div>

          <div className="total-cost">
            <h3>Total Cost: $850</h3>
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
