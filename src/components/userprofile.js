import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUser, getBookings, getUserFavorites } from "../redux/dbSlice";
import Loader from "./loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "./userprofile.css";

function UserProfile() {
  const [activeTab, setActiveTab] = useState("details");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { user } = useSelector((state) => state.auth);
  const { data: userProfile, bookings, favorites, loading: userProfileLoading } = useSelector((state) => state.db);

  useEffect(() => {
    if (user && user.uid) {
      dispatch(fetchUser(user.uid));
      dispatch(getBookings(user.uid));
      dispatch(getUserFavorites(user.uid));
    }
  }, [dispatch, user]);

  const userDetails = userProfile.length > 0
    ? userProfile[0]
    : { firstName: "Name", lastName: "Surname", email: user?.email || "User@gmail.com" };

  if (userProfileLoading) {
    return <Loader />;
  }

  return (
    <div className="user-profile">
      <FontAwesomeIcon
          className="profile-back-arrow"
          icon={faArrowLeft}
          onClick={() => navigate(-1)}
        />
      <div className="profile-header">
        <h2>Profile</h2>
        <p>Email: {userDetails.email}</p>
      </div>

      <div className="tabs">
        <button onClick={() => setActiveTab("details")} className={activeTab === "details" ? "active" : ""}>
          Personal Details
        </button>
        <button onClick={() => setActiveTab("bookings")} className={activeTab === "bookings" ? "active" : ""}>
          Booking History
        </button>
        <button onClick={() => setActiveTab("favorites")} className={activeTab === "favorites" ? "active" : ""}>
          Favorites
        </button>
      </div>

      {activeTab === "details" && (
        <div className="profile-details">
          <h3>Profile Details</h3>
          <p><strong>First Name:</strong> {userDetails.firstName}</p>
          <p><strong>Last Name:</strong> {userDetails.lastName}</p>
        </div>
      )}

      {activeTab === "bookings" && (
        <div className="booking-history">
          <h3>Booking History</h3>
          {bookings.length > 0 ? (
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
                {bookings.map((booking, index) => (
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
          )}
        </div>
      )}

      {activeTab === "favorites" && (
        <div className="favorites">
          <h3>Favorite Items</h3>
          {favorites.length > 0 ? (
            <div className="favorites-list">
              {favorites.map((favorite, index) => (
                <div className="favorite-room-display-card" key={index}>
                  <div className="favorite-room-display-card-image-div">
                    <img
                      className="favorite-room-display-card-image"
                      src={favorite.images || "default-image-url.jpg"}
                  alt={favorite.roomType}
                    />
                  </div>
                  <div className="favorite-room-display-card-info">
                    <h4>{favorite.roomType || "N/A"}</h4>
                    <p>Guests: {favorite.guests || "N/A"}</p>
                    <h5>R{favorite.price || "0.00"} / per night</h5>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No favorites available.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default UserProfile;
