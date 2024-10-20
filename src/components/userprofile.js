import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser, getBookings, getUserFavorites } from "../redux/dbSlice";
import "./userprofile.css";
import Loader from "./loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

function UserProfile() {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const {
    data: userProfile,
    bookings,
    favorites,
    loading: userProfileLoading,
  } = useSelector((state) => state.db);

  useEffect(() => {
    if (user && user.uid) {
      dispatch(fetchUser(user.uid));
      dispatch(getBookings(user.uid));
      dispatch(getUserFavorites(user.uid));
    }
  }, [dispatch, user]);

  const userDetails =
    userProfile.length > 0
      ? userProfile[0]
      : {
          firstName: "Name",
          lastName: "Surname",
          email: user?.email || "User@gmail.com",
        };

  if (userProfileLoading) {
    return <Loader />;
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
      </div>

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

      {/* Favorites Section */}
      <div className="favorites">
        <h3>Favorite Items</h3>
        {favorites.length > 0 ? (
          <div className="favorites-list">
            {favorites.map((favorite, index) => (
              <div
                className="favorite-room-display-card"
                key={favorite.roomType}
              >
                <div className="favorite-room-display-card-image-div">
                  <img
                    className="favorite-room-display-card-image"
                    src={
                      favorite.images && favorite.images.length > 0
                        ? favorite.images[0]
                        : "default-image-url.jpg"
                    }
                    alt={`Image of ${favorite.roomType}`}
                  />
                </div>
                <div className="favorite-room-display-card-info">
                  <div className="favorite-room-display-card-info-heading-body">
                    <h4>{favorite.roomType || "N/A"}</h4>
                    <div className="favorite-room-display-card-info-heading-body-line"></div>
                  </div>
                  <div className="favorite-room-display-card-info-amenities">
                    <div className="favorite-room-display-card-info-amenity">
                      <div className="favorite-room-display-card-info-amenity-icon">
                        <FontAwesomeIcon icon={faUser} />
                      </div>
                      <div className="favorite-room-display-card-info-amenity-text">
                        <span>{favorite.guests || "N/A"}</span>
                      </div>
                    </div>
                  </div>
                  <h5>
                    <span className="favorite-room-display-card-info-price">
                      R{favorite.price || "0.00"}
                    </span>{" "}
                    / per night
                  </h5>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No favorites available.</p>
        )}
      </div>
    </div>
  );
}

export default UserProfile;
