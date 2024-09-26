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
  faShare,
  faShareAlt,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";

import { useNavigate, useLocation } from "react-router-dom";
import {
  EmailShareButton,
  FacebookShareButton,
  GabShareButton,
  HatenaShareButton,
  InstapaperShareButton,
  LineShareButton,
  LinkedinShareButton,
  LivejournalShareButton,
  MailruShareButton,
  OKShareButton,
  PinterestShareButton,
  PocketShareButton,
  RedditShareButton,
  TelegramShareButton,
  TumblrShareButton,
  TwitterShareButton,
  ViberShareButton,
  VKShareButton,
  WhatsappShareButton,
  WorkplaceShareButton,
} from "react-share";

function RoomDisplay() {
  const location = useLocation();
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);

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

      console.log("Number of days:", numberOfDays);
      console.log("Price per night:", pricePerNight);
      setTotalPrice(price);
    } else {
      setTotalPrice(0);
    }
  };

  const handleBookNowClick = () => {
    setShowForm(true);
  };

  const handleBackClick = () => {
    setShowForm(false);
  };

  const goToPaymentFormSummary = (e) => {
    e.preventDefault();
    handleTotalPrice();
    if (checkin && checkout && totalPrice > 0) {
      navigate("/paymentsummary", {
        state: {
          room: location.state.room,
          checkin,
          checkout,
          totalPrice,
        },
      });
    }
    // } else {
    //   alert("Please select valid check-in and check-out dates.");
    // }
  };

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
              {location.state.room.roomType}
            </h1>
          </div>
          <div>
            <div>
              <FontAwesomeIcon icon={faShareAlt} className="content-icon" />
              <span className="content-name">Share</span>
            </div>
            <div>
              <FontAwesomeIcon icon={faHeart} className="content-icon" />
              <span className="content-name">Save</span>
            </div>
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
              <div className="rooms-display-features-info">
                <h3>Features Include</h3>
                <span className="rooms-display-features-info-texts">
                  {location.state.room.features[0]}
                </span>
                <span className="rooms-display-features-info-texts">
                  {location.state.room.features[1]}
                </span>
                <span className="rooms-display-features-info-texts">
                  {location.state.room.features[2]}
                </span>
                <span className="rooms-display-features-info-texts">
                  {location.state.room.features[3]}
                </span>
                <span className="rooms-display-features-info-texts">
                  {location.state.room.features[4]}
                </span>
                <span className="rooms-display-features-info-texts">
                  {location.state.room.features[5]}
                </span>
              </div>
            </div>
          </div>
          <div className="rooms-display-bottom-top3">
            {!showForm && (
              <button className="book-now-btn" onClick={handleBookNowClick}>
                Reserve
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
                <div className="booking-form-top">
                  <div className="booking-form-back-arrow-div">
                    <FontAwesomeIcon
                      icon={faArrowLeft}
                      className="booking-form-back-arrow"
                      onClick={handleBackClick}
                    />
                  </div>
                  <div>
                    <h3>Total Price: {totalPrice}</h3>
                  </div>
                </div>
                <form className="form">
                  <div class="form-inputs">
                    <div className="form-div">
                      <label className="labels" htmlFor="checkIn">
                        Check-in Date
                      </label>
                      <input
                        className="check-in"
                        type="date"
                        name="checkIn"
                        min={today}
                        value={checkin}
                        onChange={(e) => {
                          console.log("Check-in date:", e.target.value);
                          setCheckin(e.target.value);
                        }}
                        required
                      />
                    </div>
                    <div className="form-div">
                      <label className="labels" htmlFor="checkOut">
                        Check-out Date
                      </label>
                      <input
                        className="check-out"
                        type="date"
                        name="checkOut"
                        min={today}
                        value={checkout}
                        onChange={(e) => {
                          console.log("Check-out date:", e.target.value);
                          setCheckout(e.target.value);
                        }}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <button
                      className="check-in-button"
                      type="submit"
                      onClick={goToPaymentFormSummary}
                    >
                      Check-In
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}

export default RoomDisplay;
