import React from "react";
import "./about.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSpa,
  faUtensils,
  faSwimmer,
  faConciergeBell,
  faDumbbell,
} from "@fortawesome/free-solid-svg-icons";
import Navigation from "./navigation";
import Footer from "./footer"

function About() {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="nav">
          <Navigation />
        </div>
        <div className="hero-heading">
          <h1>Welcome to Greywood Hotel</h1>
          <p>Where your comfort is our priority</p>
        </div>
      </section>

      {/* History Section */}
      <section className="history">
        <h2>Our History</h2>
        <p>
          Founded in 1990, Greywood Hotel has been the epitome of luxury and
          comfort for over three decades. Our commitment to providing excellent
          service has made us a beloved destination for travelers worldwide.
        </p>
      </section>

      {/* Mission Statement */}
      <section className="mission">
        <h2>Our Mission</h2>
        <p>
          To offer an unparalleled experience of luxury, comfort, and
          hospitality. We believe in making every guest feel at home with
          personalized services and attention to detail.
        </p>
      </section>

      {/* Services Section */}
      <section className="services">
        <h2>Our Services</h2>
        <div className="services-list">
          <div className="service-item">
            <FontAwesomeIcon icon={faSpa} className="service-icon" />
            <h3>Spa & Wellness</h3>
            <p>Relax and rejuvenate in our world-class spa.</p>
          </div>
          <div className="service-item">
            <FontAwesomeIcon icon={faUtensils} className="service-icon" />
            <h3>Fine Dining</h3>
            <p>
              Experience gourmet dining with cuisines from around the world.
            </p>
          </div>
          <div className="service-item">
            <FontAwesomeIcon icon={faSwimmer} className="service-icon" />
            <h3>Indoor Swimming Pool</h3>
            <p>Enjoy a refreshing swim in our luxurious pool.</p>
          </div>
          <div className="service-item">
            <FontAwesomeIcon icon={faConciergeBell} className="service-icon" />
            <h3>24/7 Concierge</h3>
            <p>Our staff is here to assist you anytime, day or night.</p>
          </div>
          <div className="service-item">
            <FontAwesomeIcon icon={faDumbbell} className="service-icon" />
            <h3>Gym Facility</h3>
            <p>
              Fully equipped gym available 24/7 to keep you fit during your
              stay.
            </p>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <section>
        <Footer />
      </section>
    </div>
  );
}

export default About;
