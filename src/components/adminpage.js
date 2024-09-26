import React, { useState, useEffect } from "react";
import "./adminpage.css";
import { useSelector, useDispatch } from "react-redux";
import { getBookings, addBookings } from "../redux/dbSlice";

const AdminBookings = () => {
  const [view, setView] = useState("bookings");
  const [newBooking, setNewBooking] = useState({
    clientName: "",
    roomType: "",
    checkInDate: "",
    checkOutDate: "",
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState(""); // New state for status filter
  const dispatch = useDispatch();
  const bookings = useSelector((state) => state.db.data);

  useEffect(() => {
    dispatch(getBookings());
  }, [dispatch]);
  console.log(bookings);

  const change = (e) => {
    const { name, value } = e.target;
    setNewBooking((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddBooking = (e) => {
    e.preventDefault();
    dispatch(addBookings(newBooking));
    setNewBooking({
      roomType: "",
      firstName: "",
      lastName: "",
      email: "",
      checkInDate: "",
      checkOutDate: "",
      status: "",
      payerName: "",
      paid: "",
      transactionId: ""
    });
  };

  const filteredBookings =
    bookings
      ?.filter(
        (booking) =>
          (booking.clientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            booking.roomType?.toLowerCase().includes(searchTerm.toLowerCase())) &&
          (statusFilter === "" || booking.status === statusFilter)
      ) || [];

  return (
    <div className="admin-bookings">
      <h1 className="admin-bookings-heading">Bookings Dashboard</h1>

      <div className="split-screen">
        <div className="sidebar">
          <button
            className="admin-bookings-button"
            onClick={() => setView("bookings")}
          >
            View Bookings
          </button>
          <button
            className="admin-bookings-button"
            onClick={() => setView("addBookings")}
          >
            Add Rooms
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
                  <option value="">All Statuses</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="pending">Pending</option>
                  <option value="canceled">Canceled</option>
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
                      <th>Payer</th>
                      <th>Id</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBookings.map((booking) => (
                      <tr key={booking.id}>
                        <td>{booking.roomType || "N/A"}</td>
                        <td>{booking.firstName || "N/A"}</td>
                        <td>{booking.LastName || "N/A"}</td>
                        <td>{booking.email || "N/A"}</td>
                        <td>{booking.checkin || "N/A"}</td>
                        <td>{booking.checkout || "N/A"}</td>
                        <td>{booking.totalPrice || "N/A"}</td>
                        <td>{booking.paid || "N/A"}</td>
                        <td>{booking.transactionId || "N/A"}</td>
                        <td>{booking.payerName || "N/A"} </td>
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
              <h2>Add New Booking</h2>
              <form onSubmit={handleAddBooking}>
                <input
                  type="text"
                  name="clientName"
                  placeholder="Client Name"
                  value={newBooking.clientName}
                  onChange={change}
                  required
                />
                <input
                  type="text"
                  name="roomType"
                  placeholder="Room Type"
                  value={newBooking.roomType}
                  onChange={change}
                  required
                />
                <input
                  type="date"
                  name="checkInDate"
                  value={newBooking.checkInDate}
                  onChange={change}
                  required
                />
                <input
                  type="date"
                  name="checkOutDate"
                  value={newBooking.checkOutDate}
                  onChange={change}
                  required
                />
                <button type="submit">Add Booking</button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminBookings;
