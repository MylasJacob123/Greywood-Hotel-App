import React from "react";
import "./facilities.css";
import Navigation from "./navigation";
import TheSpa from "./assets/spa-setting-with-lit-candle-fluffy-towels-fragrant-flowers-promotes-relaxation.jpg";
import IndoorSwimmingPool from "./assets/Indoor Swimming Pool.png";
import Caffe from "./assets/elegant-wooden-dining-room-with-modern-lighting-generated-by-ai.jpg";
import Gym from "./assets/Luxury Training Gym-1.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Footer from "./footer";

function Facilities() {
  return (
    <div className="facilities-display">
    <div className="facilities-nav">
      <Navigation />
    </div>
      <div className="facilities-header">
        <h1>Our Facilities</h1>
        <div className="facilities-header-bottom">
          <div className="facilities-header-bottom1">
            <div className="facilities-header-bottom1-box1">
              <img src={TheSpa} />
            </div>
            <div className="facilities-header-bottom1-box2">
              <div className="box2-1">
                <h3>The Spa</h3>
                <p>
                  Relax and rejuvenate in our serene spa. Pamper yourself with
                  our luxurious spa treatments.
                </p>
              </div>
              <span className="section-B-top-box2-director"></span>
            </div>
          </div>
          <div className="facilities-header-bottom-line"></div>
          <div className="facilities-header-bottom2">
            <div className="facilities-header-bottom2-box1">
              <img src={IndoorSwimmingPool} />
            </div>
            <div className="facilities-header-bottom2-box2">
              <div class="box2-1">
                <h3>Indoor Swimming Pool</h3>
                <p>
                  Escape to our tranquil indoor pool, where luxury meets
                  leisure.
                </p>
              </div>
              <span className="section-B-top-box2-director"></span>
            </div>
          </div>
          <div className="facilities-header-bottom-line"></div>
        </div>
      </div>
      <div className="facilities-middle">
        <div className="facilities-header-bottom">
          <div className="facilities-header-bottom1">
            <div className="facilities-header-bottom1-box1">
              <img src={Caffe} />
            </div>
            <div className="facilities-header-bottom1-box2">
              <div className="box2-1">
                <h3>Caffe & Restaurant</h3>
                <p>
                  Experience world-class dining without leaving the hotel.
                  Exquisite meals, crafted by our top chefs.
                </p>
              </div>
              <span className="section-B-top-box2-director"></span>
            </div>
          </div>
          <div className="facilities-header-bottom-line"></div>
          <div className="facilities-header-bottom2">
            <div className="facilities-header-bottom2-box1">
              <img src={Gym} />
            </div>
            <div className="facilities-header-bottom2-box2">
              <div class="box2-1">
                <h3>Indoor Training Gym</h3>
                <p>
                  Elevate your fitness experience in our state-of-the-art indoor
                  gym, where luxury meets performance.
                </p>
              </div>
              <span className="section-B-top-box2-director"></span>
            </div>
          </div>
        </div>
      </div>
      <div className="facilities-footer">
        <Footer />
      </div>
    </div>
  );
}
export default Facilities;
