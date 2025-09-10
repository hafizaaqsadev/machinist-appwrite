// src/Pages/ServiceDetail.jsx
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
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
  const [booking, setBooking] = useState(null);

  // Redirect if no service selected
  useEffect(() => {
    if (!service) {
      toast.error("❌ No service selected!", { autoClose: 3000 });
      navigate("/services");
    }
  }, [service, navigate]);

  const handleBooking = async () => {
    if (!user) {
      toast.warning("⚠️ Please login first!", { position: "top-right", autoClose: 3000 });
      navigate("/login");
      return;
    }

    if (!date) {
      toast.warning("⚠️ Please select a date", { position: "top-right", autoClose: 3000 });
      return;
    }

    setLoading(true);

    try {
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
      setBooking(bookingData);

      toast.success("✅ Booking successful! Admin will be notified.", {
        position: "top-right",
        autoClose: 5000,
      });

      setDate(""); // Reset date
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

  if (!service) {
    return <p className="text-center mt-20 text-gray-600">Redirecting...</p>;
  }

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-start py-12 px-4 sm:px-6 md:px-12 lg:px-20 bg-gray-50">
      <ToastContainer />

      <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">{service.name}</h2>

      {/* Service Image */}
      <div className="w-full max-w-md">
        <img
          src={service.image || service.icon}
          alt={service.name}
          className="w-full h-48 md:h-56 lg:h-60 object-contain rounded-lg shadow-md mb-6"
        />
      </div>

      {/* Booking Form */}
      <div className="flex flex-col items-center w-full max-w-sm">
        <label className="mb-2 font-medium w-full text-left">Select Booking Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border p-2 rounded mb-4 w-full text-center focus:outline-none focus:ring-2 focus:ring-black"
        />

        <button
          onClick={handleBooking}
          disabled={loading}
          className="bg-black text-white px-6 py-2 rounded hover:bg-gray-900 transition disabled:opacity-50 w-full"
        >
          {loading ? "Booking..." : "Book Now"}
        </button>
      </div>

      {/* Booking Notification */}
      {booking && <BookingNotifications booking={booking} />}
    </div>
  );
}
