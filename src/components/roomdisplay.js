import React, { useState } from "react";
import "./roomdisplay.css";
import Navigation from "./navigation";
import Footer from "./footer";
import PrestigePresidential from "./assets/Prestige Presidential Suite in Room Display.png";
import PrestigePresidentialBathroom1 from "./assets/Prestige Presidential Suite Bathroom1.png";
import PrestigePresidentialBathroom2 from "./assets/Prestige Presidential Suite Bathroom2.png";
import PrestigePresidentialBedroom from "./assets/Prestige Presidential Suite Bedroom.png";
import PrestigePresidentialLounge from "./assets/Prestige Presidential Suite Lounge.png";
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
import { useNavigate } from "react-router-dom";

function RoomDisplay() {
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  const handleBookNowClick = () => {
    setShowForm(true);
  };

  const handleBackClick = () => {
    setShowForm(false);
  };

  const goToPaymentForm = () => {
    navigate("/paymentform");
  }

  return (
    <div className="rooms-display">
      {/* TOP SECTION */}
      <div className="rooms-display-top">
        <div className="rooms-display-top1">
          <Navigation />
          <div className="rooms-display-top-line"></div>
        </div>
        <div className="rooms-display-top2">
          <div>
            <h1 className="rooms-display-top2-heading">
              Prestige Presidential Suite
            </h1>
          </div>
          <div className="rooms-display-top2-image-display">
            <div className="rooms-display-top2-image-display-box1">
              <img
                className="presidential-suite-main-image"
                src={PrestigePresidential}
                alt="Prestige Presidential Suite in Room Display image"
              />
            </div>
            <div className="rooms-display-top2-image-display-box2">
              <div className="rooms-display-top2-image-display-box2-images-box">
                <div className="rooms-display-top2-image-display-box2-images-box-div">
                  <img
                    className="rooms-display-top2-image-display-box2-images-box-div-image"
                    src={PrestigePresidentialBathroom1}
                    alt="Prestige Presidential Suite Bathroom1 image"
                  />
                </div>
                <div className="rooms-display-top2-image-display-box2-images-box-div">
                  <img
                    className="rooms-display-top2-image-display-box2-images-box-div-image"
                    src={PrestigePresidentialBathroom2}
                    alt="Prestige Presidential Suite Bathroom2 image"
                  />
                </div>
              </div>
              <div className="rooms-display-top2-image-display-box2-images-box">
                <div className="rooms-display-top2-image-display-box2-images-box-div">
                  <img
                    className="rooms-display-top2-image-display-box2-images-box-div-image"
                    src={PrestigePresidentialBedroom}
                    alt="Prestige Presidential Suite Bedroom image"
                  />
                </div>
                <div className="rooms-display-top2-image-display-box2-images-box-div">
                  <img
                    className="rooms-display-top2-image-display-box2-images-box-div-image"
                    src={PrestigePresidentialLounge}
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
                  <span className="content-name">2-4 people</span>
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
                  79
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
              The Prestige Presidential Suite offers the pinnacle of luxury with
              its expansive layout, featuring elegant decor, a private terrace
              with breathtaking views, a spacious living area, and exclusive
              amenities. Ideal for those seeking unparalleled comfort and
              sophistication.
            </p>
          </div>
          <div className="rooms-display-bottom-top2">
            <div className="rooms-display-price">
              <h2>
                $885 <span className="stay">/ per night</span>
              </h2>
            </div>
            <div className="rooms-display-features">
              <div className="rooms-display-features-info">
                <h3>Features Include</h3>
                <span className="rooms-display-features-info-texts">
                  High-speed Wi-Fi
                </span>
                <span className="rooms-display-features-info-texts">
                  Private Terrace
                </span>
                <span className="rooms-display-features-info-texts">
                  Marble Bathroom
                </span>
                <span className="rooms-display-features-info-texts">
                  Fully stocked minibar
                </span>
                <span className="rooms-display-features-info-texts">
                  Luxury toiletries
                </span>
                <span className="rooms-display-features-info-texts">
                  24-hour room service
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="rooms-display-middle">
          {!showForm && (
            <button className="book-now-btn" onClick={handleBookNowClick}>
              Book now
              <svg className="icon" viewBox="0 0 24 24" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          )}

          {showForm && (
            <div className="booking-form">
              <div className="booking-form-back-arrow-div">
                <FontAwesomeIcon
                  icon={faArrowLeft}
                  className="booking-form-back-arrow"
                  onClick={handleBackClick}
                />
              </div>
              <div className="whats-the-price">
                <h2 className="whats-the-price-h">Price $885</h2>
                <h2 className="whats-the-price-h">Calculated Price</h2>
              </div>
              <form className="form">
                <label className="labels" htmlFor="name">
                  What is your name?
                </label>
                <input
                  className="name"
                  type="text"
                  name="name"
                  placeholder="Alex Ferguson"
                  required
                />

                <label className="labels" htmlFor="email">
                  What is your email?
                </label>
                <input
                  className="email"
                  type="email"
                  name="email"
                  placeholder="alex@gmail.com"
                  required
                />

                <label className="labels" htmlFor="checkIn">
                  Check-in Date
                </label>
                <input
                  className="check-in"
                  type="date"
                  name="checkIn"
                  required
                />

                <label className="labels" htmlFor="checkOut">
                  Check-out Date
                </label>
                <input
                  className="check-out"
                  type="date"
                  name="checkOut"
                  required
                />

                <button type="submit" onClick= {goToPaymentForm}>Book</button>
              </form>
            </div>
          )}
        </div>

        <Footer />
      </div>
    </div>
  );
}

export default RoomDisplay;
