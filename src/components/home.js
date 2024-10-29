import React, { useState, useEffect } from "react";
import "./home.css";
import Navigation from "./navigation";
import Image1 from "./assets/Rectangle 19.png";
import Image2 from "./assets/Rectangle 21.png";
import Image3 from "./assets/Rectangle 22.png";
import Image4 from "./assets/Rectangle 20.png";
import Image5 from "./assets/Rectangle 26.png";
import Image6 from "./assets/Rectangle 31.png";
import Image7 from "./assets/Rectangle 33.png";
import Image8 from "./assets/Rectangle 42.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Footer from "./footer";
import { useNavigate } from "react-router-dom";
// import { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
import { addReviews, getReviews } from "../redux/dbSlice";
import { useDispatch, useSelector } from "react-redux";

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { reviews } = useSelector((state) => state.db);

  // const { reviews, loading, error } = useSelector((state) => state.db);

  // const dispatch = useDispatch();
  // const { user, logged } = useSelector((state) => state.auth);
  // console.log(logged);

  const [showReviewSection, setShowReviewSection] = useState(false);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [name, setName] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);

  const toggleReviewSection = () => {
    setShowReviewSection((prev) => !prev);
  };

  const goToNextReview = () => {
    setCurrentReviewIndex((prevIndex) => (prevIndex + 1) % reviews.length);
  };

  const goToPreviousReview = () => {
    setCurrentReviewIndex(
      (prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length
    );
  };

  const gotToAbout = () => {
    navigate("/about");
  };

  const goToFacilities = () => {
    navigate("/facilities");
  };

  useEffect(() => {
    dispatch(getReviews());
  }, [dispatch]);

  const handleSubmitReview = (e) => {
    e.preventDefault();
    dispatch(addReviews({ review, rating, name }));
    setReview("");
    setRating("");
    setName("");
    setSuccessMessage("Thank you for your review!");
  };

  // useEffect(() => {
  //   if (logged) {
  //    navigate("/")
  //     console.log("home page")
  //   } else {
  //     navigate("/login")
  //     console.log("login page")
  //   }
  // }, [logged, dispatch]);

  return (
    <div className="home-container">
      {/* NAVIGATION SECTION */}
      <div className="nav-section">
        <Navigation />
      </div>

      {/* SECTION A */}
      <div className="section-A">
        <div className="section-A-top">
          {/* You can add content here if needed */}
        </div>

        <div className="section-A-middle">
          <h2 className="section-A-middle-head-text">
            Helping You Find An Escape <br /> To A <br /> Comfortable Place
          </h2>
          <h4 className="section-A-middle-sub-text">
            It could be A quiet place for your journey ahead
          </h4>
        </div>

        <div className="section-A-bottom">
          {/* You can add additional content or images here */}
        </div>
      </div>

      {/* SECTION B */}
      <div className="section-B">
        {/* SECTION B TOP */}
        <div className="section-B-top">
          <div className="section-B-top-box1">
            <h2 className="section-B-top-box1-heading">
              Enjoy an unforgettable stay with the best charm
            </h2>
          </div>
          <div className="section-B-top-box2">
            <p className="section-B-top-box2-paragraph">
              Book your perfect stay, effortlessly. Find peace of mind with
              instant booking and exclusive offers.
            </p>
            <span className="section-B-top-box2-director">
              More info{" "}
              <FontAwesomeIcon
                className="section-B-top-box2-director-arrow"
                icon={faArrowRight}
                onClick={gotToAbout}
              />
            </span>
          </div>
        </div>

        {/* SECTION B BOTTOM */}
        <div className="section-B-bottom">
          <div className="image">
            <img className="outer-image" src={Image1} alt="image1" />
          </div>
          <div className="middle-image">
            <div className="inner-images">
              <img className="inner-image" src={Image2} alt="image2" />
            </div>
            <div className="inner-images">
              <img className="inner-image" src={Image3} alt="image3" />
            </div>
          </div>
          <div className="image">
            <img className="outer-image" src={Image4} alt="image4" />
          </div>
        </div>
      </div>

      {/* SECTION C */}
      <div className="section-C">
        <div className="section-C-top">
          <div className="section-C-top-info1">
            <h2 className="section-C-top-info1-heading">
              Enjoy the best of our quality facilities
            </h2>
          </div>
          <div className="section-C-top-info2">
            <button
              className="section-C-top-info2-button"
              onClick={goToFacilities}
            >
              See more
            </button>
          </div>
        </div>
        <div className="section-C-bottom">
          <div className="section-C-bottom-info">
            <div className="section-C-bottom-info-img">
              <img
                className="section-C-bottom-images"
                src={Image5}
                alt="image5"
              />
            </div>
            <div className="section-C-bottom-info-detail">
              <h3>The Spa</h3>
              <p>
                Relax and rejuvenate in our serene spa. Pamper yourself with our
                luxurious spa treatments.
              </p>
            </div>
          </div>
          <div className="section-C-bottom-info">
            <div className="section-C-bottom-info-img">
              <img
                className="section-C-bottom-images"
                src={Image6}
                alt="image6"
              />
            </div>
            <div className="section-C-bottom-info-detail">
              <h3>Indoor Swimming Pool</h3>
              <p>
                Escape to our tranquil indoor pool, where luxury meets leisure.
              </p>
            </div>
          </div>
          <div className="section-C-bottom-info">
            <div className="section-C-bottom-info-img">
              <img
                className="section-C-bottom-images"
                src={Image7}
                alt="image7"
              />
            </div>
            <div className="section-C-bottom-info-detail">
              <h3>Caffe & Restaurant</h3>
              <p>
                Experience world-class dining without leaving the hotel.
                Exquisite meals, crafted by our top chefs.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Section D */}
      <div className="section-D">
  {!showReviewSection ? (
    <div className="section-D-top">
      <div className="section-D-top-info1">
        <div className="next-btns">
          <FontAwesomeIcon
            className="next-btn"
            onClick={goToPreviousReview}
            icon={faArrowLeft}
          />
        </div>
        <div className="review-content">
                <h5>CLIENT REVIEW</h5>
                <p>
                  {reviews.length > 0 
                    ? reviews[currentReviewIndex]?.review
                    : "No reviews available."}
                  <br />
                  {reviews.length > 0 
                    ? `${reviews[currentReviewIndex]?.rating} Stars` 
                    : ""}
                </p>
                <h6 className="client-review">
                  {reviews.length > 0 ? reviews[currentReviewIndex]?.name : ""}
                </h6>
        </div>
        <div className="next-btns">
          <FontAwesomeIcon
            className="next-btn"
            onClick={goToNextReview}
            icon={faArrowRight}
          />
        </div>
      </div>
      <div className="section-D-top-info2">
        <img className="section-D-top-info2-image" src={Image8} alt="image1" />
      </div>
      <button onClick={toggleReviewSection} className="leave-review-btn">Leave a Review</button>
    </div>
  ) : (
    <div className="section-D-top-middle">
      <div className="section-D-top-middle-review-form">
        <h3 className="review-form-title">Submit Your Review</h3>
        <form className="review-form" onSubmit={handleSubmitReview}>
          <div className="review-form-group">
            <label htmlFor="review">Review:</label>
            <textarea
              id="review"
              name="review"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Write your review here..."
              required
            />
          </div>
          <div className="form-div">
            <label htmlFor="rating">Rating</label>
            <input
              type="number"
              name="rating"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              required
              min="1"
              max="5"
            />
          </div>
          <div className="form-div">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <button className="review-submit-btn" type="submit">
            Submit Review
          </button>
          {successMessage && <p className="success-message">{successMessage}</p>}
        </form>
      </div>
      <button className="feedback-btn" onClick={toggleReviewSection}>Back to Feedback</button>
    </div>
  )}
  <div className="section-D-bottom">
    <Footer />
  </div>
</div>

    </div>
  );
}

export default Home;
