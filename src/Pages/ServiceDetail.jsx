// src/Pages/ServiceDetail.jsx
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { databases, ID } from "../appwrite";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BookingNotifications from "../Components/BookingNotifications";

export default function ServiceDetail() {
  const { state } = useLocation();
  const service = state?.service;
  const navigate = useNavigate();
  const { user } = useAuth();

  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [booking, setBooking] = useState(null); // ✅ store booking for notifications

  if (!service) return <p className="text-center mt-20">No service selected!</p>;

  const handleBooking = async () => {
    if (!user) {
      alert("Please login first!");
      navigate("/login");
      return;
    }
    if (!date) {
      alert("Please select a date");
      return;
    }

    setLoading(true);

    try {
      // 1️⃣ Save booking in Appwrite database
      const bookingData = {
        serviceName: service.name,
        userId: user.$id,
        userEmail: user.email,
        bookingDate: date,
        status: "pending",
      };

      const result = await databases.createDocument(
        import.meta.env.VITE_APPWRITE_BOOKING_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_BOOKING_COLLECTION_ID,
        ID.unique(),
        bookingData
      );

      console.log("✅ Booking saved:", result);

      // 2️⃣ Set booking for notifications
      setBooking(bookingData);

      // 3️⃣ Optional: frontend toast for immediate feedback
      toast.success("✅ Booking saved! Notifications will be sent.", {
        position: "top-right",
        autoClose: 5000,
      });
    } catch (err) {
      console.error("❌ Booking error:", err);
      toast.error("❌ Booking failed. Try again later.", {
        position: "top-right",
        autoClose: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 sm:px-6 md:px-12 lg:px-20">
      <ToastContainer />

      <h2 className="text-3xl font-bold mb-6">{service.name}</h2>
      <img
        src={service.image || service.icon}
        alt={service.name}
        className="h-40 mb-6"
      />

      <label className="mb-2 font-medium">Select Booking Date:</label>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="border p-2 rounded mb-4 text-center"
      />

      <button
        onClick={handleBooking}
        disabled={loading}
        className="bg-black text-white px-6 py-2 rounded hover:bg-gray-900 transition disabled:opacity-50"
      >
        {loading ? "Booking..." : "Book Now"}
      </button>

      {/* ✅ Booking notifications component */}
      {booking && <BookingNotifications booking={booking} />}
    </div>
  );
}
