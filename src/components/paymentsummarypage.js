import React from "react";
import "./paymentsummarypage.css";
import Footer from "./footer";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"; 
import { addBookings } from "../redux/dbSlice";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../configure/firebase";

function PaymentPage() {
  const location = useLocation();
  const { room, checkin, checkout, totalPrice } = location.state;

  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);

  const bookingData = {
    firstName: user?.firstName || "Guest First Name",  
    lastName: user?.lastName || "Guest Last Name",
    email: user?.email || "",
    roomType: room?.roomType || "Standard",
    checkin: checkin,
    checkout: checkout,
    nights:
      Math.ceil(
        (new Date(checkout) - new Date(checkin)) / (1000 * 60 * 60 * 24)
      ) || 0,
    guests: room?.guests || 1,
    totalPrice: totalPrice || 0,
    paid: "No", 
    transactionId: null,
    payerName: null,
  };

  const addBookingToFirestore = async (bookingData) => {
    try {
      await addDoc(collection(db, "bookings"), bookingData);
      console.log("Booking added to Firestore");
    } catch (error) {
      console.error("Error adding booking: ", error);
    }
  };

  const handleApprove = (data, actions) => {
    return actions.order.capture().then((details) => {
      const updatedBookingData = {
        ...bookingData,
        paid: "Yes", 
        transactionId: details.id,
        payerName: details.payer.name.given_name,
        email: details.payer.email_address,
      };

      addBookingToFirestore(updatedBookingData);
      dispatch(addBookings(updatedBookingData));

      alert(`Transaction completed by ${details.payer.name.given_name}`);
    }).catch((err) => {
      console.error("Payment approval error: ", err);
      alert("An error occurred during the payment approval.");
    });
  };

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
            <p>
              Nights:{" "}
              {Math.ceil(
                (new Date(checkout) - new Date(checkin)) / (1000 * 60 * 60 * 24)
              ) || 0}
            </p>
            <p>Guests: {room?.guests || 1}</p>
          </div>

          <div className="total-cost">
            <h3>Total Cost: R{totalPrice || 0}</h3>
          </div>
        </div>

        <div className="payment-section">
          <h2>Payment Details</h2>
          <PayPalScriptProvider
            options={{ "client-id": "Ac5BE6LbIeYHZYca62eZjpI8DlcGBprKXhwMd89igjzVzzqU1CtTfNL-ZNQ6-qq405c8YsdK-SvMpPk4" }}
          >
            <PayPalButtons
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: totalPrice.toString(),
                      },
                    },
                  ],
                });
              }}
              onApprove={handleApprove}
              onError={(err) => {
                console.error(err);
                alert("An error occurred during the transaction.");
              }}
            />
          </PayPalScriptProvider>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default PaymentPage;
