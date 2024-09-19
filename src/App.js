import Register from "./components/register";
import Login from "./components/login";
import ForgotPassword from "./components/forgotpassword";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import Facilities from "./components/facilities"
import Rooms from "./components/rooms";
import About from "./components/about";
import Contact from "./components/contact"
import './App.css';
import RoomDisplay from "./components/roomdisplay";
import User from "./components/userprofile";
import PaymentForm from "./components/paymentform";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/facilities" element={<Facilities />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/user" element={<User />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot" element={<ForgotPassword />} />
          <Route path="/roomdisplay" element={<RoomDisplay />} />
          <Route path="/paymentform" element={<PaymentForm />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
