import React, { useState, useEffect } from "react";
import "./roomdisplay.css";
import Navigation from "./navigation";
import Footer from "./footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUtensils,
  faBed,
  faBath,
  faShower,
  faUser,
  faStar,
  faArrowLeft, 
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

function RoomDisplay() {
  const location = useLocation();
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);

  const user = useSelector((state) => state.auth.user);

  const pricePerNight = location.state.room.price;
  const today = new Date().toISOString().split("T")[0]; 

  useEffect(() => {
    handleTotalPrice();
  }, [checkin, checkout]);

  const handleTotalPrice = () => {
    const checkinDate = new Date(checkin);
    const checkoutDate = new Date(checkout);

    if (
      !isNaN(checkinDate.getTime()) &&
      !isNaN(checkoutDate.getTime()) &&
      checkinDate < checkoutDate
    ) {
      const time = checkoutDate - checkinDate;
      const numberOfDays = time / (1000 * 60 * 60 * 24);
      const price = numberOfDays * pricePerNight;
      setTotalPrice(price);
    } else {
      setTotalPrice(0);
    }
  };

  const handleBookNowClick = () => {
    if (!checkUser()) return;
    setShowForm(true);
  };

  const handleBackClick = () => {
    setShowForm(false);
  };

  const checkUser = () => {
    if (!user || !user.uid) {
      alert("User not logged in. Please login");
      navigate("/login");
      return false;
    }
    return true;
  };

  const goToPaymentFormSummary = (e) => {
    e.preventDefault();
    handleTotalPrice();

    if (checkUser()) {
      if (checkin && checkout && totalPrice > 0) {
        navigate("/paymentsummary", {
          state: {
            room: location.state.room,
            checkin,
            checkout,
            totalPrice,
            userId: user.uid,
          },
        });
      } else {
        alert("Please select valid check-in and check-out dates.");
      }
    }
  };

  return (
    <div className="rooms-display">
      {/* TOP SECTION */}
      <div className="room-display-nav">
        <Navigation />
      </div>
      <div className="rooms-display-top">
        <div className="rooms-display-top2">
          <div>
            <h1 className="rooms-display-top2-heading">
              {location.state.room.roomType}
            </h1>
          </div>
          <div className="rooms-display-top2-image-display">
            <div className="rooms-display-top2-image-display-box1">
              <img
                className="presidential-suite-main-image"
                src={location.state.room.images[0]}
                alt="Prestige Presidential Suite in Room Display image"
              />
            </div>
            <div className="rooms-display-top2-image-display-box2">
              <div className="rooms-display-top2-image-display-box2-images-box">
                <div className="rooms-display-top2-image-display-box2-images-box-div">
                  <img
                    className="rooms-display-top2-image-display-box2-images-box-div-image"
                    src={location.state.room.images[1]}
                    alt="Prestige Presidential Suite Bathroom1 image"
                  />
                </div>
                <div className="rooms-display-top2-image-display-box2-images-box-div">
                  <img
                    className="rooms-display-top2-image-display-box2-images-box-div-image"
                    src={location.state.room.images[2]}
                    alt="Prestige Presidential Suite Bathroom2 image"
                  />
                </div>
              </div>
              <div className="rooms-display-top2-image-display-box2-images-box">
                <div className="rooms-display-top2-image-display-box2-images-box-div">
                  <img
                    className="rooms-display-top2-image-display-box2-images-box-div-image"
                    src={location.state.room.images[3]}
                    alt="Prestige Presidential Suite Bedroom image"
                  />
                </div>
                <div className="rooms-display-top2-image-display-box2-images-box-div">
                  <img
                    className="rooms-display-top2-image-display-box2-images-box-div-image"
                    src={location.state.room.images[4]}
                    alt="Prestige Presidential Suite Lounge image"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="rooms-display-top2-info">
            <div className="rooms-display-top2-info-content-box">
              <div className="rooms-display-top2-info-content">
                <div>
                  <FontAwesomeIcon icon={faUtensils} className="content-icon" />
                  <span className="content-name">Breakfast</span>
                </div>
                <div>
                  <FontAwesomeIcon icon={faBed} className="content-icon" />
                  <span className="content-name">2 King-sized beds</span>
                </div>
                <div>
                  <FontAwesomeIcon icon={faBath} className="content-icon" />
                  <span className="content-name">1 Bathroom</span>
                </div>
                <div>
                  <FontAwesomeIcon icon={faShower} className="content-icon" />
                  <span className="content-name">1 Shower</span>
                </div>
                <div>
                  <FontAwesomeIcon icon={faUser} className="content-icon" />
                  <span className="content-name">
                    {location.state.room.guests}
                  </span>
                </div>
              </div>
            </div>
            <div className="rooms-display-top2-info-review-box">
              <div className="rooms-display-top2-info-review-box-rates">
                <span className="rooms-display-top2-info-review-box-rates-number">
                  5
                </span>
                <div className="rooms-display-top2-info-review-box-rates-icons">
                  <FontAwesomeIcon icon={faStar} className="rates-icon" />
                  <FontAwesomeIcon icon={faStar} className="rates-icon" />
                  <FontAwesomeIcon icon={faStar} className="rates-icon" />
                  <FontAwesomeIcon icon={faStar} className="rates-icon" />
                  <FontAwesomeIcon icon={faStar} className="rates-icon" />
                </div>
              </div>
              <div className="rooms-display-top2-info-review-box-spacer"></div>
              <div className="rooms-display-top2-info-review-box-reviews">
                <span className="rooms-display-top2-info-review-box-reviews-number">
                  {location.state.room.reviews}
                </span>
                <span className="reviews">Reviews</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM SECTION */}
      <div className="rooms-display-bottom">
  <div className="rooms-display-bottom-top">
    <div className="rooms-display-bottom-top1">
      <p className="rooms-display-bottom-paragraph">
        {location.state.room.description}
      </p>
    </div>
    <div className="rooms-display-bottom-top2">
      <div className="rooms-display-price">
        <h2>
          R{location.state.room.price}{" "}
          <span className="stay">/ per night</span>
        </h2>
      </div>
      <div className="rooms-display-features">
        <h3>Features Include:</h3>
        <ul className="features-list">
          {location.state.room.features.map((feature, index) => (
            <li key={index} className="feature-item">
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>

  {/* RESERVATION FORM */}
  {showForm ? (
    <div className="booking-form">
      <form className="form" onSubmit={goToPaymentFormSummary}>
        <div className="booking-form-top">
          <button className="back-button" onClick={handleBackClick}>
            <FontAwesomeIcon
              icon={faArrowLeft}
              className="booking-form-back-arrow"
            />
          </button>
          <h2>Reservation</h2>
        </div>
        <div className="form-inputs">
          <div className="form-div">
            <label className="labels" htmlFor="checkin">
              Check-in:
            </label>
            <input
              type="date"
              id="checkin"
              min={today}
              value={checkin}
              onChange={(e) => setCheckin(e.target.value)}
              required
              className="date-input"
            />
          </div>
          <div className="form-div">
            <label className="labels" htmlFor="checkout">
              Check-out:
            </label>
            <input
              type="date"
              id="checkout"
              min={today}
              value={checkout}
              onChange={(e) => setCheckout(e.target.value)}
              required
              className="date-input"
            />
          </div>
        </div>
        <div className="total-price">
          <h3>Total Price: R{totalPrice}</h3>
        </div>
        <button type="submit" className="book-now-btn">
          Book Now
        </button>
      </form>
    </div>
  ) : (
    <div className="room-display-reservation">
      <button className="book-now-btn" onClick={handleBookNowClick}>
        Book Now
      </button>
    </div>
  )}
</div>

      <Footer />
    </div>
  );
}

export default RoomDisplay;
