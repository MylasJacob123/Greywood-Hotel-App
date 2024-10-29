import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./navigation.css";
import NavLogo from "./assets/Mandala_Royal_Resort_Logo_Minimalist__5_-removebg-preview.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser } from "../redux/dbSlice";
import { userLogout } from "../redux/authSlice";

function Navigate() {
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const profileRef = useRef(null);

  const { user } = useSelector((state) => state.auth);
  const { data: userProfile } = useSelector((state) => state.db);

  useEffect(() => {
    if (user && user.uid) {
      dispatch(fetchUser(user.uid));
    }
  }, [dispatch, user]);

  const userDetails =
    userProfile.length > 0
      ? userProfile[0]
      : {
          firstName: "Name",
          lastName: "Surname",
          email: user?.email || "user@gmail.com",
        };

  const goToProfile = () => {
    navigate("/userprofile");
  };

  const handleProfileClick = () => {
    setIsProfileOpen((prevState) => !prevState);
  };

  const handleMenuToggle = () => {
    setIsMenuOpen((prevState) => !prevState); 
  };

  const handleLogout = () => {
    dispatch(userLogout());
    alert("User logged out");
    navigate("/");
  };

  // Detect clicks outside the profile dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="navigation">
      <div className="navbar">
        <div className="logo">
          <img className="nav-Logo" src={NavLogo} alt="Logo" />
        </div>

        {/* Menu Button for smaller screens */}
        <button className="menu-btn" onClick={handleMenuToggle}>
          ☰
        </button>

        {/* Nav Items with conditional class for showing/hiding */}
        <ul className={`nav-items ${isMenuOpen ? "active" : ""}`}>
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

        {/* Profile Icon and Dropdown */}
        <div className="profile" onClick={handleProfileClick} ref={profileRef}>
          <FontAwesomeIcon className="profile-icon" icon={faUserCircle} />
          {isProfileOpen && (
            <div className="profile-dropdown">
              {user ? (
                <>
                  <p>{`${userDetails.firstName} ${userDetails.lastName}`}</p>
                  <p>{userDetails.email}</p>
                  <button onClick={goToProfile} className="nav-profile-btn">
                    Profile
                  </button>
                  <button onClick={handleLogout} className="nav-logout-btn">
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="nav-login-btn"
                    onClick={() => navigate("/login")}
                  >
                    Login
                  </button>
                  <button
                    className="nav-register-btn"
                    onClick={() => navigate("/register")}
                  >
                    Register
                  </button>
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
