import React, { useState } from "react";
import "./rooms.css";
import Navigation from "./navigation";
import FooterImg from "./assets/Rectangle 77.png";
import SingleRoomDeluxe from "./assets/Single Room Deluxe Image.png";
import SingleRoomDeluxePremium from "./assets/Single Room Deluxe Premium.png";
import RegalPrestigeDouble from "./assets/Regal Prestige Double Room.png";
import TheRegalQueenEscape from "./assets/The Regal Queen Escape.png";
import OpulentKingRetreat from "./assets/Opulent King Retreat.png";
import PrestigePresidentialSuite from "./assets/Prestige Presidential Suite.png";
import RoyalDoubleHaven from "./assets/Royal Double Haven.png";
import OpalQueenRetreat from "./assets/Opal Queen Retreat.png";
import ImperialKingHaven from "./assets/Imperial King Haven.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Footer from "./footer";
import { useNavigate } from "react-router-dom";

function Rooms() {
  const navigate = useNavigate();

  const roomsData = [
    {
      name: "Single Room Deluxe",
      category: "Single Rooms",
      image: SingleRoomDeluxe,
      price: 350,
      people: "1-2 people",
    },
    {
      name: "Regal Prestige Double Room",
      category: "Double Rooms",
      image: RegalPrestigeDouble,
      price: 625,
      people: "2-4 people",
    },
    {
      name: "The Regal Queen Escape",
      category: "Queen Rooms",
      image: TheRegalQueenEscape,
      price: 685,
      people: "2-3 people",
    },
    {
      name: "Opulent King Retreat",
      category: "King Rooms",
      image: OpulentKingRetreat,
      price: 700,
      people: "2-3 people",
    },
    {
      name: "Prestige Presidential Suite",
      category: "Presidential Suite",
      image: PrestigePresidentialSuite,
      price: 885,
      people: "2-4 people",
    },
    {
      name: "Single Room Deluxe Premium",
      category: "Single Rooms",
      image: SingleRoomDeluxePremium,
      price: 425,
      people: "1-2 people",
    },
    {
      name: "Royal Double Haven",
      category: "Double Rooms",
      image: RoyalDoubleHaven,
      price: 630,
      people: "2-4 people",
    },
    {
      name: "Opal Queen Retreat",
      category: "Queen Rooms",
      image: OpalQueenRetreat,
      price: 705,
      people: "2-3 people",
    },
    {
      name: "Imperial King Haven",
      category: "King Rooms",
      image: ImperialKingHaven,
      price: 720,
      people: "2-3 people",
    },
  ];

  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredRooms =
    selectedCategory === "All"
      ? roomsData
      : roomsData.filter((room) => room.category === selectedCategory);

  const handleCardClick = () => {
    navigate("/roomdisplay");
  };

  return (
    <div className="rooms-display">
      {/* HEADER */}
      <div className="rooms-display-header">
        <div className="rooms-display-header-top">
          <Navigation />
        </div>
        <div className="rooms-display-header-bottom">
          <ul className="rooms-display-header-bottom-categories">
            {[
              "All",
              "Single Rooms",
              "Double Rooms",
              "Queen Rooms",
              "King Rooms",
              "Presidential Suite",
            ].map((category) => (
              <div
                className="rooms-display-header-bottom-categories-box"
                key={category}
              >
                <li>
                  <span
                    className={`rooms-display-header-bottom-categories-box-category ${
                      selectedCategory === category ? "active" : ""
                    }`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </span>
                </li>
                <div className="rooms-display-header-bottom-categories-box-category-hover"></div>
              </div>
            ))}
          </ul>
          <div className="rooms-display-header-bottom-categories-line"></div>
        </div>
      </div>

      {/* MIDDLE */}
      <div className="rooms-display-middle">
        <div className="rooms-display-middle-cards">
          {filteredRooms.map((room) => (
            <div
              className="room-display-card"
              key={room.name}
              onClick={handleCardClick}
            >
              <div className="room-display-card-image-div">
                <img
                  className="room-display-card-image"
                  src={room.image}
                  alt={`Image of ${room.name}`}
                />
              </div>
              <div className="room-display-card-info">
                <div className="room-display-card-info-heading-body">
                  <h4>{room.name}</h4>
                  <div className="room-display-card-info-heading-body-line"></div>
                </div>
                <div className="room-display-card-info-amenities">
                  <div className="room-display-card-info-amenity">
                    <div className="room-display-card-info-amenity-icon">
                      <FontAwesomeIcon icon={faUser} />
                    </div>
                    <div className="room-display-card-info-amenity-text">
                      <span>{room.people}</span>
                    </div>
                  </div>
                </div>
                <h5>
                  <span className="room-display-card-info-price">
                    ${room.price}
                  </span>{" "}
                  / per night
                </h5>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <div className="rooms-display-last">
        <div className="rooms-display-last-top">
          <p className="rooms-display-last-top-paragraph">
            Elevate your stay by discovering our full array of exquisite rooms
            and suites. Each one offers a unique blend of luxury and
            sophistication, meticulously designed to provide the ultimate in
            comfort and style. Click below to explore our exclusive selections
            and find the perfect retreat tailored to your desires.
          </p>
          <div className="rooms-display-last-top-image-div">
            <img
              src={FooterImg}
              alt="Image of a couple sharing laughter in a hotel bed"
            />
          </div>
        </div>
        <div className="rooms-display-last-middle">
          <div className="rooms-display-last-middle-btn-navigation"></div>
        </div>
        <div className="rooms-display-last-bottom">
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Rooms;
