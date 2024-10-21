import React, { useState, useEffect } from "react";
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
import { faUser, faShareAlt, faHeart } from "@fortawesome/free-solid-svg-icons";
import Footer from "./footer";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchData } from "../redux/dbSlice";
import { FaFacebook, FaTwitter, FaTelegram } from "react-icons/fa";
import ShareRoom from "./ShareOnSocials";
import { addFavorite } from "../redux/dbSlice";


function Rooms() {
  const navigate = useNavigate();

  const { data, loading, error } = useSelector((state) => state.db);
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const [showShareIcons, setShowShareIcons] = useState(null);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  const handleAddToFavorite = (room) => {
    if (!user) {
      alert("You must be logged in to add favorites.");
      return;
    }
    const uid = user.uid; 
    const favoriteData = {
      roomType: room.roomType,
      description: room.description,
      price: room.price,
      guests: room.guests,
      images: room.images[0],
    };

    dispatch(addFavorite(uid, favoriteData));
  };
  

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

  const handleCardClick = (room) => {
    navigate("/roomdisplay", {
      state: {
        room,
      },
    });
  };

  const toggleShareIcons = (roomIndex) => {
    setShowShareIcons((prev) => (prev === roomIndex ? null : roomIndex));
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
          {data.map((room, index) => (
            <div
              className="room-display-card"
              key={room.nameType}
              onClick={() => handleCardClick(room)}
            >
              <div className="room-display-card-image-div">
                <img
                  className="room-display-card-image"
                  src={
                    room.images && room.images.length > 0
                      ? room.images[0]
                      : "default-image-url.jpg"
                  }
                  alt={`Image of ${room.name}`}
                />
              </div>
              <div className="room-display-card-info">
                <div className="room-display-card-info-heading-body">
                  <h4>{room.roomType}</h4>
                  <div className="room-display-card-info-heading-body-line"></div>
                </div>
                <div className="room-display-card-info-amenities">
                  <div className="room-display-card-info-amenity">
                    <div className="room-display-card-info-amenity-icon">
                      <FontAwesomeIcon icon={faUser} />
                    </div>
                    <div className="room-display-card-info-amenity-text">
                      <span>{room.guests}</span>
                    </div>
                  </div>
                </div>
                <h5>
                  <span className="room-display-card-info-price">
                    R{room.price}
                  </span>{" "}
                  / per night
                </h5>
                <div className="room-display-card-user-icons">
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleShareIcons(index);
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faShareAlt}
                      className="room-display-card-user-icons-content-name"
                    />
                  </div>
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToFavorite(room);
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faHeart}
                      className="room-display-card-user-icons-content-name"
                    />
                  </div>
                </div>
                {showShareIcons === index && <ShareRoom room={room} />}
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
