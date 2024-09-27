import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./navigation.css";
import NavLogo from "./assets/Mandala_Royal_Resort_Logo_Minimalist__5_-removebg-preview.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

function Navigate() {
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Mock user data for now
  const user = {
    name: "Rethabile",
    email: "rc@gmail.com.com",
    loggedIn: true, // Toggle this for logged in/out state
  };

  const goToProfile = () => {
    navigate("/userprofile");
  };

  const handleProfileHover = () => {
    setIsProfileOpen(true);
  };

  const handleProfileLeave = () => {
    setIsProfileOpen(false);
  };

  return (
    <div className="navigation">
      <div className="navbar">
        <div className="logo">
          <img className="nav-Logo" src={NavLogo} alt="Logo" />
        </div>
        <ul className="nav-items">
          <li className="nav-list">
            <NavLink to="/" exact activeClassName="active">
              <span className="nav-list-routes">Home</span>
            </NavLink>
          </li>
          <li className="nav-list">
            <NavLink to="/rooms" activeClassName="active">
              <span className="nav-list-routes">Rooms</span>
            </NavLink>
          </li>
          <li className="nav-list">
            <NavLink to="/facilities" activeClassName="active">
              <span className="nav-list-routes">Facilities</span>
            </NavLink>
          </li>
          <li className="nav-list">
            <NavLink to="/about" activeClassName="active">
              <span className="nav-list-routes">About</span>
            </NavLink>
          </li>
          <li className="nav-list">
            <NavLink to="/contact" activeClassName="active">
              <span className="nav-list-routes">Contact</span>
            </NavLink>
          </li>
        </ul>

        <div 
          className="profile"
          onMouseEnter={handleProfileHover}
          onMouseLeave={handleProfileLeave}
        >
          <FontAwesomeIcon className="profile-icon" icon={faUserCircle} />
          {isProfileOpen && (
            <div className="profile-dropdown">
              {user.loggedIn ? (
                <>
                  <p>{user.name}</p>
                  <p>{user.email}</p>
                  <button onClick={goToProfile} className="nav-profile-btn">Profile</button>
                  <button className="nav-logout-btn">Logout</button>
                </>
              ) : (
                <>
                  <button className="nav-login-btn">Login</button>
                  <button className="nav-register-btn">Register</button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navigate;
