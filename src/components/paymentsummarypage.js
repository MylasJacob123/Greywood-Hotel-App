import React from "react";
import "./paymentsummarypage.css";
import Footer from "./footer";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addBookings } from "../redux/dbSlice";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import axios from "axios"; 
import Swal from 'sweetalert2';

function PaymentPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { room, checkin, checkout, totalPrice } = location.state;

  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const bookingData = {
    firstName: user?.firstName || "Name",
    lastName: user?.lastName || "Surname",
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
    paid: "Pending",
    transactionId: null,
    payerName: null,
  };

  const handleApprove = (data, actions) => {
    return actions.order
      .capture()
      .then(async (details) => {
        const updatedBookingData = {
          ...bookingData,
          paid: "Paid",
          transactionId: details.id,
          payerName: details.payer.name.given_name,
          email: details.payer.email_address,
        };
  
        if (user?.uid) {
          try {
            dispatch(addBookings(user.uid, updatedBookingData));
          } catch (error) {
            console.error("Error while dispatching addBookings: ", error);
          }
        } else {
          console.error("User is not logged in, cannot add booking");
        }
  
        try {
          await axios.post("https://hotel-app-payment-backend-1.onrender.com/send-confirmation", {
            email: updatedBookingData.email,
            firstName: updatedBookingData.firstName,
            lastName: updatedBookingData.lastName,
            bookingData: updatedBookingData,
          });
  
          Swal.fire({
            icon: 'success',
            title: 'Payment Successful!',
            text: `Transaction completed by ${details.payer.name.given_name}. A confirmation email has been sent.`,
            confirmButtonText: 'Ok',
          });
        } catch (error) {
          console.error("Error sending confirmation email: ", error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'An error occurred while sending the confirmation email.',
            confirmButtonText: 'Ok',
          });
        }
      })
      .catch((err) => {
        console.error("Payment approval error: ", err);
        Swal.fire({
          icon: 'error',
          title: 'Payment Error',
          text: 'An error occurred during the payment approval.',
          confirmButtonText: 'Ok',
        });
      });
  };
  

  return (
    <div className="payment-summary-container">
      <FontAwesomeIcon className="payment-summary-back-arrow" icon={faArrowLeft} onClick={() => navigate(-1)} />
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
            options={{
              "client-id":
                "Ac5BE6LbIeYHZYca62eZjpI8DlcGBprKXhwMd89igjzVzzqU1CtTfNL-ZNQ6-qq405c8YsdK-SvMpPk4",
            }}
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
