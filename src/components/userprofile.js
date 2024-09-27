import React from "react";
import "./userprofile.css";

const UserProfile = () => {
  // Mock user data
  const user = {
    name: "Rethabile",
    email: "rc@gmail.com",
    phone: "067 073 6224",
  };

  // Mock booking history
  const bookingHistory = [
    {
      id: 1,
      roomType: "Deluxe Suite",
      checkIn: "2024-09-10",
      checkOut: "2024-09-15",
      price: "R4500",
      status: "Paid",
    },
    {
      id: 2,
      roomType: "Standard Room",
      checkIn: "2024-10-05",
      checkOut: "2024-10-10",
      price: "R1700",
      status: "Pending",
    },
  ];

  return (
    <div className="user-profile">
      <div className="profile-header">
        <h2>{user.name}'s Profile</h2>
        <p>Email: {user.email}</p>
      </div>

      <div className="profile-details">
        <h3>Profile Details</h3>
        <p>
          <strong>Name:</strong> {user.name}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Phone:</strong> {user.phone ? user.phone : "Not available"}
        </p>
      </div>

      <div className="booking-history">
        <h3>Booking History</h3>
        {bookingHistory && bookingHistory.length > 0 ? (
          <table className="booking-table">
            <thead>
              <tr>
                <th>Room Type</th>
                <th>Check-In</th>
                <th>Check-Out</th>
                <th>Price</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {bookingHistory.map((booking) => (
                <tr key={booking.id}>
                  <td data-label="Room Type">{booking.roomType}</td>
                  <td data-label="Check-In">{booking.checkIn}</td>
                  <td data-label="Check-Out">{booking.checkOut}</td>
                  <td data-label="Price">{booking.price}</td>
                  <td data-label="Status">{booking.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No booking history available.</p>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
