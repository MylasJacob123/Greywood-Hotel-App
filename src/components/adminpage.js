import React, { useState, useEffect } from "react";
import "./adminpage.css";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllBookings,
  addRooms,
  fetchData,
  deleteRoom,
  updateRoom,
  deleteBooking
} from "../redux/dbSlice";
import { userLogout } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Loader from "./loader";

const AdminBookings = () => {
  const [view, setView] = useState("bookings");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [loading, setLoading] = useState(false); 
  const [roomData, setRoomData] = useState({
    description: "",
    features: [],
    guests: "",
    images: [],
    price: "",
    ratings: "",
    reviews: "",
    roomType: "",
  });

  const dispatch = useDispatch();
  const bookings = useSelector((state) => state.db.bookings);
  const rooms = useSelector((state) => state.db.data);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    dispatch(getAllBookings());
    dispatch(fetchData());
    dispatch(deleteRoom());
    dispatch(updateRoom());
    dispatch(deleteBooking());
    setLoading(false);
  }, [dispatch]);

  const handleRoomChange = (e) => {
    setRoomData({ ...roomData, [e.target.name]: e.target.value });
  };

  const handleRoomSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const updatedRoomData = {
      ...roomData,
      features: roomData.features.split(",").map((feature) => feature.trim()),
    };
    dispatch(addRooms(updatedRoomData));
    setRoomData({
      description: "",
      features: [],
      guests: "",
      images: [],
      price: "",
      ratings: "",
      reviews: "",
      roomType: "",
    });
  };

  const handleDeleteRoom = (uid) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to delete this room. This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        setLoading(true); 
        dispatch(deleteRoom(uid))
          .then(() => {
            setLoading(false);
            Swal.fire({
              title: "Success",
              text: "Room deleted successfully!",
              icon: "success",
              confirmButtonText: "Ok",
            });
          })
          .catch(() => {
            setLoading(false);
            Swal.fire({
              title: "Error",
              text: "Failed to delete room!",
              icon: "error",
              confirmButtonText: "Try Again",
            });
          });
      }
    });
  };

  const handleCancelBooking = (uid) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to cancel this booking. This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, cancel it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        setLoading(true); 
        dispatch(deleteBooking(uid))
          .then(() => {
            setLoading(false); 
            dispatch(getAllBookings());
  
            Swal.fire({
              title: "Booking Cancelled",
              text: "The booking has been successfully cancelled.",
              icon: "success",
              confirmButtonText: "Ok",
            });
          })
          .catch((error) => {
            setLoading(false); 
            Swal.fire({
              title: "Error",
              text: `Failed to cancel the booking! ${error.message}`,
              icon: "error",
              confirmButtonText: "Try Again",
            });
          });
      }
    });
  };
  
  
  const handleUpdateRoom = (uid, room) => {
    if (!room) {
      console.error("Room object is undefined", room);
      return;
    }
  
    setRoomData({
      id: uid,
      description: room.description || "",
      features: room.features.join(", "),  
      guests: room.guests || "",
      images: room.images || [],
      price: room.price || "",
      ratings: room.ratings || "",
      reviews: room.reviews || "",
      roomType: room.roomType || "",
    });
    setView("addRooms");
  };
  
  const filteredBookings =
    bookings?.filter(
      (booking) =>
        (booking.clientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          booking.roomType?.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (statusFilter === "" || booking.status === statusFilter)
    ) || [];

    const handleLogout = () => {
      Swal.fire({
        title: 'Are you sure?',
        text: 'You will be logged out of your account.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, log me out',
        cancelButtonText: 'Cancel',
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(userLogout());
          Swal.fire({
            title: 'Logged Out',
            text: 'You have been logged out successfully.',
            icon: 'success',
            confirmButtonText: 'Ok',
          });
          navigate("/");
        }
      });
    };

  return (
    <div className="admin-bookings">
      <h1 className="admin-bookings-heading">Admin Dashboard</h1>

      <div className="split-screen">
        <div className="sidebar">
          <button
            className="admin-rooms-button"
            onClick={() => setView("addRooms")}
          >
            Add Rooms
          </button>
          <button
            className="admin-rooms-button"
            onClick={() => setView("viewRooms")}
          >
            View Rooms
          </button>
          <button
            className="admin-bookings-button"
            onClick={() => setView("bookings")}
          >
            View Bookings
          </button>
          <button className="admin-logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>

        <div className="admin-bookings-main-content">
          {view === "bookings" ? (
            <>
              <div className="filters">
                <input
                  type="text"
                  placeholder="Search by name or reference"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="">Select Status</option>
                  <option value="Paid">Paid</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>

              <div className="table-container">
              {loading ? (
  <Loader /> 
) : (
                <table>
                  <thead>
                    <tr>
                      <th>Room</th>
                      {/* <th>First Name</th>
                      <th>Last Name</th> */}
                      <th>Name</th>
                      <th>Email</th>
                      <th>Check-in</th>
                      <th>Check-out</th>
                      <th>Total Price</th>
                      <th>Status</th>
                      <th>Transaction ID</th>
                      <th>Payer</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBookings.map((booking) => (
                      <tr key={booking.id}>
                        <td>{booking.roomType || "N/A"}</td>
                        <td>{booking.payerName || "N/A"}</td>
                        {/* <td>{booking.firstName || "N/A"}</td>
                        <td>{booking.lastName || "N/A"}</td> */}
                        <td>{booking.email || "N/A"}</td>
                        <td>{booking.checkin || "N/A"}</td>
                        <td>{booking.checkout || "N/A"}</td>
                        <td>{booking.totalPrice || "N/A"}</td>
                        <td>{booking.status || "N/A"}</td>
                        <td>{booking.transactionId || "N/A"}</td>
                        <td>{booking.payerName || "N/A"}</td>
                        <td className="table-container-actions">
                          {/* <button
                            className="admin-edit"
                            onClick={() => handleUpdateRoom(booking)}
                          >
                            Edit
                          </button> */}
                          <button
                            className="admin-delete"
                            onClick={() => handleCancelBooking(booking.id)}
                          >
                            Cancel Booking
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                )}
              </div>
            </>
          ) : view === "viewRooms" ? (
            <div>
              <h2>View Rooms</h2>
              <div className="rooms-list">
                {rooms?.length ? (
                  rooms.map((room, index) => (
                    <div key={index} className="room-card">
                      <img
                        className="room-card-image"
                        src={
                          room.images && room.images.length > 0
                            ? room.images[0]
                            : "default-image-url.jpg"
                        }
                        alt={`${room.roomType} image`}
                      />
                      <div className="room-card-content">
                        <h3>{room.roomType}</h3>
                        <p>{room.description}</p>
                        <p>
                          <strong>Price:</strong> ${room.price} per night
                        </p>
                        <p>
                          <strong>Features:</strong> {room.features.join(", ")}
                        </p>
                        <button className="edit-room-btn" onClick={() => handleUpdateRoom(room.id, room)}>
                          Edit
                        </button>
                        <button className="delete-room-btn" onClick={() => handleDeleteRoom(room.id)}>
                          Delete
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No rooms available</p>
                )}
              </div>
            </div>
          ) : (
            <div>
              <h2>Add New Room</h2>
              <div className="admin-form-container">
                <form className="admin-form" onSubmit={handleRoomSubmit}>
                  <div>
                    <label>Description:</label>
                    <textarea
                      className="admin-inputs"
                      placeholder="Room Description"
                      name="description"
                      value={roomData.description}
                      onChange={handleRoomChange}
                    />
                  </div>

                  <div>
                    <label>Features:</label>
                    <textarea
                      className="admin-inputs"
                      placeholder="Features (comma-separated)"
                      name="features"
                      value={roomData.features}
                      onChange={handleRoomChange}
                    />
                  </div>

                  <div>
                    <label>Guests:</label>
                    <input
                      className="admin-inputs"
                      type="text"
                      placeholder="Number of guests"
                      name="guests"
                      value={roomData.guests}
                      onChange={handleRoomChange}
                    />
                  </div>

                  <div>
                    <label>Images:</label>
                    <textarea
                      className="admin-inputs"
                      placeholder="Image URLs (comma-separated)"
                      name="images"
                      value={roomData.images}
                      onChange={handleRoomChange}
                    />
                  </div>

                  <div>
                    <label>Price:</label>
                    <input
                      className="admin-inputs"
                      type="number"
                      placeholder="Price per night"
                      name="price"
                      value={roomData.price}
                      onChange={handleRoomChange}
                    />
                  </div>

                  <div>
                    <label>Ratings:</label>
                    <input
                      className="admin-inputs"
                      type="text"
                      placeholder="Ratings"
                      name="ratings"
                      value={roomData.ratings}
                      onChange={handleRoomChange}
                    />
                  </div>

                  <div>
                    <label>Reviews:</label>
                    <input
                      className="admin-inputs"
                      type="text"
                      placeholder="Number of reviews"
                      name="reviews"
                      value={roomData.reviews}
                      onChange={handleRoomChange}
                    />
                  </div>

                  <div>
                    <label>Room Type:</label>
                    <input
                      className="admin-inputs"
                      type="text"
                      placeholder="Room Type"
                      name="roomType"
                      value={roomData.roomType}
                      onChange={handleRoomChange}
                    />
                  </div>

                  <button type="submit">
                    {roomData.id ? "Update Room" : "Add Room"}
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminBookings;
