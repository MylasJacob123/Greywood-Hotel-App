import React from "react";
import './userprofile.css';

const UserProfile = () => {
  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <img
            src="https://via.placeholder.com/150"
            alt="Profile"
            className="profile-img"
          />
          <h2 className="profile-name">User Name</h2>
          <p className="profile-email">user@example.com</p>
        </div>
        <div className="profile-body">
          <div className="profile-section">
            <h3>Personal Information</h3>
            <p><strong>Phone:</strong> +27 81 007 1498</p>
            <p><strong>Address:</strong> 123 Main Street, City, Country</p>
          </div>
          <div className="profile-section">
            <h3>Booking History</h3>
            <ul>
              <li>Room 101 - Single Room Deluxe - Jan 2023</li>
              <li>Room 203 - Royal Double Haven - July 2023</li>
              <li>Room 405 - Single Room Deluxe Premium - Sep 2023</li>
            </ul>
          </div>
          <span></span>
          <span></span>
        </div>
        <div className="profile-footer">
          <button className="edit-profile-btn">Edit Profile</button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
