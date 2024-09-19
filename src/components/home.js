import React from "react";
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
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Footer from "./footer";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const gotToAbout = () => {
    navigate("/about");
  };

  const goToFacilities = () => {
    navigate("/facilities");
  }
  return (
    <div className="home-container">
      {/* SECTION A */}
      <div className="section-A">
        <div className="section-A-top">
          <Navigation />
        </div>
        <div className="section-A-middle">
          <h2 className="section-A-middle-head-text">
            Helping You Find An Escape <br></br>To A <br></br>Comfortable Place
          </h2>
          <h4 className="section-A-middle-sub-text">
            It could be A quiet place for your journey ahead
          </h4>
        </div>
        <div className="section-A-bottom"></div>
      </div>

      {/* SECTION B */}
      <div className="section-B">
        <div className="section-B-top">
          <div className="section-B-top-box1">
            <h2 className="section-B-top-box1-heading">
              Enjoy a unforgettable stay with the best charm
            </h2>
          </div>
          <div className="section-B-top-box2">
            <p className="section-B-top-box2-paragraph">
              Book your perfect stay, effortlessly. Find peace of mind with
              instant booking and exclusive offers.
            </p>
            <span className="section-B-top-box2-director">
              More info{" "}
              <FontAwesomeIcon icon={faArrowRight} onClick={gotToAbout} />
            </span>
          </div>
        </div>

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
            <button className="section-C-top-info2-button" onClick={goToFacilities}>See more</button>
          </div>
        </div>
        <div className="section-C-bottom">
          <div className="section-C-bottom-info1">
            <div className="section-C-bottom-info1-img">
              <img
                className="section-C-bottom-images"
                src={Image5}
                alt="image5"
              />
            </div>
            <div className="section-C-bottom-info1-detail">
              <div className="section-C-bottom-info1-detail-text">
                <h3>The Spa</h3>
                <p>
                  Relax and rejuvenate in our serene spa. Pamper yourself with
                  our luxurious spa treatments.
                </p>
              </div>
              <div className="section-C-bottom-info1-detail-arrow"></div>
            </div>
          </div>
          <div className="section-C-bottom-info2">
            <div className="section-C-bottom-info2-img">
              <img
                className="section-C-bottom-images"
                src={Image6}
                alt="image6"
              />
            </div>
            <div className="section-C-bottom-info2-detail">
              <div className="section-C-bottom-info2-detail-text">
                <h3>Indoor Swimming Pool</h3>
                <p>
                  Escape to our tranquil indoor pool, where luxury meets
                  leisure.
                </p>
              </div>
              <div className="section-C-bottom-info2-detail-arrow"></div>
            </div>
          </div>
          <div className="section-C-bottom-info3">
            <div className="section-C-bottom-info3-img">
              <img
                className="section-C-bottom-images"
                src={Image7}
                alt="image7"
              />
            </div>
            <div className="section-C-bottom-info3-detail">
              <div className="section-C-bottom-info3-detail-text">
                <h3>Caffe & Restaurant</h3>
                <p>
                  Experience world-class dining without leaving the hotel.
                  Exquisite meals, crafted by our top chefs.
                </p>
              </div>
              <div className="section-C-bottom-info3-detail-arrow"></div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION D */}
      <div className="section-D">
        <div className="section-D-top">
          <div className="section-D-top-info1">
            <div>
              <h5>CLIENT FEEDBACK</h5>
              <p>
                “My stay was outstanding. The luxurious but comforting, the
                exceptional service and top-notch amenities made it a truly
                unforgettable experience.”
              </p>
              <h6 className="client-review">Rebecca Stacy</h6>
            </div>
          </div>
          <div className="section-D-top-info2">
            <img
              className="section-D-top-info2-image"
              src={Image8}
              alt="image1"
            />
          </div>
        </div>
        <div className="section-D-bottom">
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Home;
