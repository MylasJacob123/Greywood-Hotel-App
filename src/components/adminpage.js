import React, { useState } from 'react';
import "./adminpage.css";

const AdminBookings = () => {
  const [view, setView] = useState('bookings');
  const [bookings, setBookings] = useState([]);
  
  const [newBooking, setNewBooking] = useState({
    clientName: "",
    roomType: "",
    checkInDate: "",
    checkOutDate: "",
  });

  const [searchTerm, setSearchTerm] = useState("");

  const change = (e) => {
    const { name, value } = e.target;
    setNewBooking((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddBooking = (e) => {
    e.preventDefault();
    const newId = bookings.length ? bookings[bookings.length - 1].id + 1 : 1;
    setBookings((prev) => [
      ...prev,
      { id: newId, ...newBooking, status: "Confirmed" },
    ]);
    setNewBooking({ clientName: "", roomType: "", checkInDate: "", checkOutDate: "" });
  };

  const filteredBookings = bookings.filter(booking =>
    booking.clientName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-bookings">
      <h1 className="admin-bookings-heading">Bookings Dashboard</h1>

      <div className="split-screen">
        <div className="sidebar">
          <button className="admin-bookings-button" onClick={() => setView("bookings")}>View Bookings</button>
          <button className="admin-bookings-button" onClick={() => setView("addBookings")}>Add Booking</button>
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
                <select>
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
                      <th>Client Name</th>
                      <th>Room</th>
                      <th>Check-in</th>
                      <th>Check-out</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBookings.map((booking) => (
                      <tr key={booking.id}>
                        <td>{booking.clientName}</td>
                        <td>{booking.roomType}</td>
                        <td>{booking.checkInDate}</td>
                        <td>{booking.checkOutDate}</td>
                        <td>{booking.status}</td>
                        <td>
                          <button>Edit</button>
                          <button>Delete</button>
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
                  placeholder="Room Name" 
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
