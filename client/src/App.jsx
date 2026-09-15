import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import Menu from "./pages/Menu.jsx";
import Location from "./pages/Location.jsx";
import Contact from "./pages/Contact.jsx";
import BookingPage from "./pages/BookingPage.jsx";
import DetailsForm from "./pages/DetailsForm.jsx";
import ConfirmationPage from "./pages/ConfirmationPage.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";

function BookingFlow() {
  const [slot, setSlot] = useState(null);
  const [reservation, setReservation] = useState(null);

  const reset = () => {
    setSlot(null);
    setReservation(null);
  };

  if (reservation) {
    return <ConfirmationPage reservation={reservation} onBookAnother={reset} />;
  }
  if (slot) {
    return (
      <DetailsForm slot={slot} onBack={() => setSlot(null)} onConfirmed={setReservation} />
    );
  }
  return <BookingPage onSlotChosen={setSlot} />;
}

function Admin() {
  const [token, setToken] = useState(() => localStorage.getItem("adminToken"));

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setToken(null);
  };

  if (!token) {
    return <AdminLogin onLoggedIn={setToken} />;
  }
  return <AdminDashboard token={token} onLogout={handleLogout} />;
}

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/location" element={<Location />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/reserve" element={<BookingFlow />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Layout>
  );
}
