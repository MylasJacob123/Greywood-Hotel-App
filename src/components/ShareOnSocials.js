import React from "react";
import { FaFacebook, FaTwitter, FaTelegram } from "react-icons/fa";
import "./ShareOnSocials.css";

function ShareRoom({ room }) {
  // Function to handle share URLs
  const handleShare = (room) => {
    const { roomName, descriptions, price, id } = room;

    const encodedRoomName = encodeURIComponent(roomName);
    const encodedDescription = encodeURIComponent(descriptions);
    const encodedPrice = encodeURIComponent(`Price: R${price}`);
    const shareUrl = `http://localhost:3000/room/${id}`; 

    return {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}&quote=${encodedRoomName} - ${encodedDescription} - ${encodedPrice}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodedRoomName} - ${encodedDescription} - ${encodedPrice}&url=${shareUrl}`,
      whatsapp: `https://wa.me/?text=${encodedRoomName} - ${encodedDescription} - ${encodedPrice} ${shareUrl}`,
      instagram: `https://www.instagram.com/`, // Instagram does not support sharing URLs directly
      telegram: `https://telegram.me/share/url?url=${shareUrl}&text=${encodedRoomName} - ${encodedDescription} - ${encodedPrice}`,
    };
  };

  // Get share URLs
  const shareUrls = handleShare(room);
  
  return (
    <div className="room-display-share-icons">
      {/* Facebook Share */}
      <a
        href={shareUrls.facebook}
        target="_blank"
        rel="noopener noreferrer"
        className="icon facebook"
      >
        <FaFacebook className="room-display-share-icon" />
      </a>

      {/* Twitter Share */}
      <a
        href={shareUrls.twitter}
        target="_blank"
        rel="noopener noreferrer"
        className="icon twitter"
      >
        <FaTwitter className="room-display-share-icon" />
      </a>

      {/* Telegram Share */}
      <a
        href={shareUrls.telegram}
        target="_blank"
        rel="noopener noreferrer"
        className="icon telegram"
      >
        <FaTelegram className="room-display-share-icon" />
      </a>
    </div>
  );
}

export default ShareRoom;
