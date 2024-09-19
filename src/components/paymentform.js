import React from "react";
import "./paymentform.css";

const PaymentForm = () => {
  return (
    <div className="payment-container">
      <h2>Payment Information</h2>
      <form className="payment-form">
        <div className="input-group">
          <label htmlFor="name">Name on Card</label>
          <input type="text" id="name" placeholder="Alex Ferguson" />
        </div>

        <div className="input-group">
          <label htmlFor="cardNumber">Card Number</label>
          <input
            type="text"
            id="cardNumber"
            placeholder="1234 5678 9101 1121"
          />
        </div>

        <div className="card-details">
          <div className="input-group">
            <label htmlFor="expiryDate">Expiry Date</label>
            <input type="text" id="expiryDate" placeholder="MM/YY" />
          </div>
          <div className="input-group">
            <label htmlFor="cvv">CVV</label>
            <input type="text" id="cvv" placeholder="123" />
          </div>
        </div>

        <div className="input-group">
          <label htmlFor="billingAddress">Billing Address</label>
          <input type="text" id="billingAddress" placeholder="1234 Main St" />
        </div>

        <div className="input-group">
          <label htmlFor="zip">ZIP Code</label>
          <input type="text" id="zip" placeholder="12345" />
        </div>

        <div className="summary">
          <h3>Charges Summary</h3>
          <p>Room Charges: $200</p>
          <p>Taxes: $40</p>
          <p>Total: $240</p>
        </div>

        <button type="submit" className="submit-btn">
          Submit Payment
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;
