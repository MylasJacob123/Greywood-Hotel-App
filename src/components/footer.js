import React from "react";
import "./footer.css";
import FooterLogo from "./assets/Mandala Royal Resort Logo Minimalist (5).png";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer">
      <div className="footer-top">
        <div className="footer-top1">
          <div className="footer-top1-logo-div">
            <div className="footer-top1-logo">
              <img src={FooterLogo} alt="Footer Logo" />
            </div>
            <h6>Pl. du Casino</h6>
            <h6>98000 Monaco</h6>
          </div>
          <div className="footer-top1-overview">
            <div>
              <h6><Link to="/rooms">Rooms</Link></h6>
              <h6><Link to="/facilities">Facilities</Link></h6>
              <h6><Link to="/about">About</Link></h6>
            </div>
            <div>
              <h6><a href="https://www.instagram.com/" >Instagram</a></h6>
              <h6><a href="https://x.com/?lang=en" >Twitter</a></h6>
              <h6><a href="https://www.youtube.com/" >YouTube</a></h6>
            </div>
          </div>
        </div>
        <div className="footer-top2">
          <h6>Contact Details</h6>
          <p className="footer-top2-contact-details">
            greywood@gmail.com
            <br />
            +377 98 06 30 00
          </p>
        </div>
        <div className="footer-top3">
          <div class="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d2882.6301925410094!2d7.4248895765583125!3d43.73900864687613!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sza!4v1726644357255!5m2!1sen!2sza"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="footer-bottom1"></div>
        <div className="footer-bottom2">
          <div className="footer-bottom2-box1">
            <h6>(c)2024Greywood. All rights reserved</h6>
          </div>
          <div className="footer-bottom2-box2">
            <h6>Terms & Conditions</h6>
            <h6>Privacy Policy</h6>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Footer;
