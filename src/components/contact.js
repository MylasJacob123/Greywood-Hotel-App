import React, { useState } from "react";
import "./contact.css";
import Navigation from "./navigation";
import Footer from "./footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Add logic to send the form data to your server
  };

  return (
    <div className="contact-page">
      <div className="contact-nav">
        <Navigation />
      </div>

      <div className="contact-container">
        {/* HEADER */}
        <div className="contact-header">
          <h1>Contact Us</h1>
          <p>We'd love to hear from you! Feel free to reach out with any inquiries, bookings, or feedback.</p>
        </div>

        {/* CONTACT INFO */}
        <div className="contact-info">
          <div className="contact-info-item">
            <FontAwesomeIcon icon={faPhone} />
            <p>+377 98 06 30 00</p>
          </div>
          <div className="contact-info-item">
            <FontAwesomeIcon icon={faEnvelope} />
            <p>greywood@gmail.com</p>
          </div>
          <div className="contact-info-item">
            <FontAwesomeIcon icon={faMapMarkerAlt} />
            <p>Pl. du Casino, 98000 Monaco</p>
          </div>
        </div>

        {/* CONTACT FORM */}
        <div className="contact-form-container">
          <h2>Send Us a Message</h2>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows="6"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button type="submit" className="contact-submit-btn">Submit</button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default ContactUs;
