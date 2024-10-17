import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser, getBookings } from "../redux/dbSlice";
import "./userprofile.css";
import Loader from "./loader";

function UserProfile() {
  const dispatch = useDispatch();
  
  const { user } = useSelector((state) => state.auth); 
  const { data: userProfile, loading: userProfileLoading } = useSelector((state) => state.db); 
  // const { data: bookingHistory, loading: bookingHistoryLoading } = useSelector((state) => state.db); 

  useEffect(() => {
    if (user && user.uid) {
      dispatch(fetchUser(user.uid));
      // dispatch(getBookings(user.uid));
    }
  }, [dispatch, user]);

  const userDetails = userProfile.length > 0 
    ? userProfile[0] 
    : {
        firstName: "Name",
        lastName: "Surname",
        email: user?.email || "User@gmail.com",
      };

  // if (userProfileLoading || bookingHistoryLoading ) {
    if (userProfileLoading ) {
    return <Loader />
  }

  return (
    <div className="user-profile">
      <div className="profile-header">
        <h2>Profile</h2>
        <p>Email: {userDetails.email}</p>
      </div>

      <div className="profile-details">
        <h3>Profile Details</h3>
        <p>
          <strong>First Name:</strong> {userDetails.firstName}
        </p>
        <p>
          <strong>Last Name:</strong> {userDetails.lastName}
        </p>
        <p>
          <strong>Email:</strong> {userDetails.email}
        </p>
      </div>

      <div className="booking-history">
        <h3>Booking History</h3>
        {/* {bookingHistory.length > 0 ? (
          <table className="booking-table">
            <thead>
              <tr>
                <th>Room Name</th>
                <th>Check-In</th>
                <th>Check-Out</th>
                <th>Total Price</th>
                <th>Guests</th>
                <th>Nights</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {bookingHistory.map((booking, index) => (
                <tr key={index}>
                  <td>{booking.roomType}</td>
                  <td>{booking.checkin}</td>
                  <td>{booking.checkout}</td>
                  <td>R {booking.totalPrice}</td>
                  <td>{booking.guests}</td>
                  <td>{booking.nights}</td>
                  <td>{booking.paid}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No booking history available.</p>
        )} */}
      </div>
    </div>
  );
}

export default UserProfile;
