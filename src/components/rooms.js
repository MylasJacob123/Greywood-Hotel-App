import React, { useState, useEffect } from "react";
import "./rooms.css";
import Navigation from "./navigation";
import FooterImg from "./assets/Rectangle 77.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faShareAlt, faHeart } from "@fortawesome/free-solid-svg-icons";
import Footer from "./footer";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchData } from "../redux/dbSlice";
import ShareRoom from "./ShareOnSocials";
import { addFavorite } from "../redux/dbSlice";
import Loader from "./loader";
import Swal from "sweetalert2";

function Rooms() {
  const navigate = useNavigate();
  const { data, loading, error } = useSelector((state) => state.db);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [showShareIcons, setShowShareIcons] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [favoriteStatus, setFavoriteStatus] = useState({});

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const handleAddToFavorite = async (room) => {
    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "You must be logged in to add favorites.",
      });
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
  
    try {
      await dispatch(addFavorite({ uid, favoriteData }));
  
      setFavoriteStatus((prevStatus) => ({
        ...prevStatus,
        [room.nameType]: !prevStatus[room.nameType],
      }));
  
      Swal.fire({
        icon: "success",
        title: "Added to Favorites!",
        text: `${room.roomType} has been added to your favorites.`,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed to Add Favorite",
        text: error.message || "Something went wrong.",
      });
    }
  };
  

  const filteredRooms =
    selectedCategory === "All"
      ? data
      : data.filter((room) => room.category === selectedCategory);

  const handleCardClick = (room) => {
    navigate("/roomdisplay", {
      state: { room },
    });
  };

  const toggleShareIcons = (roomIndex) => {
    setShowShareIcons((prev) => (prev === roomIndex ? null : roomIndex));
  };

  return (
    <div className="rooms-display">
      {/* HEADER */}
      <div className="navigation-in-rooms">
        <Navigation />
      </div>
      <div className="rooms-display-header">
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

      {loading ? (
        <Loader />
      ) : (
        <>
          {/* MIDDLE */}
          <div className="rooms-display-middle">
            <div className="rooms-display-middle-cards">
              {filteredRooms.map((room, index) => (
                <div
                  className="room-display-card"
                  key={room.nameType}
                  onClick={() => handleCardClick(room)}
                >
                  <div className="room-display-card-image-div">
                    <img
                      className="room-display-card-image"
                      src={room.images?.[0] || "default-image-url.jpg"}
                      alt={room.roomType}
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
                      <div className="room-display-card-user-icon1"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleShareIcons(index);
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faHeart}
                          className={`room-display-card-user-icons-content-name ${
                            favoriteStatus[room.nameType] ? "favorite" : ""
                          }`}
                          onClick={() => handleAddToFavorite(room)}
                        />
                        <FontAwesomeIcon
                          icon={faShareAlt}
                          className="room-display-card-user-icons-content-name"
                        />
                      </div>
                      <div
                        // onClick={(e) => {
                        //   e.stopPropagation();
                        //   handleAddToFavorite(room);
                        // }}
                      >
                        {/* <FontAwesomeIcon
                          icon={faHeart}
                          className={`room-display-card-user-icons-content-name ${
                            favoriteStatus[room.nameType] ? "favorite" : ""
                          }`}
                        /> */}
                      </div>
                    </div>
                    {showShareIcons === index && <ShareRoom room={room} />}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

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
        <div className="rooms-display-last-bottom">
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Rooms;
