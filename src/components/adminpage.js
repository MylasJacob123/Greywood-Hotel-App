import React, { useState, useEffect } from "react";
import "./adminpage.css";
import { useSelector, useDispatch } from "react-redux";
import { getAllBookings, addRooms } from "../redux/dbSlice"; // Updated import for getAllBookings

const AdminBookings = () => {
  const [view, setView] = useState("bookings");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
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
  const bookings = useSelector((state) => state.db.bookings); // Adjusted selector for bookings
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getAllBookings()); // Fetch all bookings
  }, [dispatch]);

  const handleRoomChange = (e) => {
    setRoomData({ ...roomData, [e.target.name]: e.target.value });
  };

  const handleRoomSubmit = (e) => {
    e.preventDefault();
    const updatedRoomData = {
      ...roomData,
      features: roomData.features.split(',').map((feature) => feature.trim()),
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

  const filteredBookings =
    bookings?.filter(
      (booking) =>
        (booking.clientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          booking.roomType?.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (statusFilter === "" || booking.status === statusFilter)
    ) || [];

  return (
    <div className="admin-bookings">
      <h1 className="admin-bookings-heading">Admin Dashboard</h1>

      <div className="split-screen">
        <div className="sidebar">
          <button
            className="admin-bookings-button"
            onClick={() => setView("bookings")}
          >
            View Bookings
          </button>
          <button
            className="admin-rooms-button"
            onClick={() => setView("addRooms")}
          >
            Add Rooms
          </button>
          <button className="admin-logout-button">
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
                <table>
                  <thead>
                    <tr>
                      <th>Room</th>
                      <th>First Name</th>
                      <th>Last Name</th>
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
                        <td>{booking.firstName || "N/A"}</td>
                        <td>{booking.lastName || "N/A"}</td>
                        <td>{booking.email || "N/A"}</td>
                        <td>{booking.checkin || "N/A"}</td>
                        <td>{booking.checkout || "N/A"}</td>
                        <td>{booking.totalPrice || "N/A"}</td>
                        <td>{booking.status || "N/A"}</td>
                        <td>{booking.transactionId || "N/A"}</td>
                        <td>{booking.payerName || "N/A"}</td>
                        <td className="table-container-actions">
                          <button className="admin-edit">Edit</button>
                          <button className="admin-delete">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
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

                  <button type="submit">Add Room</button>
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
