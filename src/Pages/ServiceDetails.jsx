// src/Pages/ServiceDetails.jsx
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { databases, ID } from "../appwrite";
import { Permission, Role } from "appwrite";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ServiceDetails() {
  const { state } = useLocation();
  const service = state?.service;
  const navigate = useNavigate();
  const { user } = useAuth();

  const [date, setDate] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [nearestPlace, setNearestPlace] = useState("");

  if (!service)
    return <p className="text-center mt-20">No service selected!</p>;

  const handleBookNow = async () => {
    if (!user) {
      toast.warning("⚠️ Please login first!");
      navigate("/login");
      return;
    }
    if (!date || !phone || !address || !city) {
      toast.warning("⚠️ Please fill all required fields!");
      return;
    }

    try {
      // ✅ Booking create with extra fields
      const booking = await databases.createDocument(
        import.meta.env.VITE_APPWRITE_BOOKING_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_BOOKING_COLLECTION_ID,
        ID.unique(),
        {
          serviceName: service.name,
          userId: user.$id,
          userEmail: user.email,
          bookingDate: date,
          phone,
          address,
          city,
          nearestPlace,
          status: "pending",
          serviceId: service.id || null,
        },
        [
          Permission.read(Role.user(user.$id)),
          Permission.update(Role.user(user.$id)),
          Permission.delete(Role.user(user.$id)),
        ]
      );

      toast.success("Booking created! Proceed to payment.");
      navigate("/checkout", {
        state: {
          service,
          date,
          user,
          bookingId: booking.$id,
          amount: service.price || 0,
        },
      });
    } catch (err) {
      console.error("Booking error:", err);
      toast.error("Booking failed. Try again.");
    }
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-start px-4 sm:px-6 md:px-12 lg:px-20 pb-20 pt-16">
      <ToastContainer />
      <h2 className="text-3xl font-bold mb-6 text-center">{service.name}</h2>

      {/* Service Image */}
      <img
        src={service.image || service.icon}
        alt={service.name}
        className="h-32 w-auto mb-6 object-contain sm:h-40 md:h-48"
      />

      {/* Booking Form */}
      <label className="mb-2 font-medium">Select Booking Date:</label>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="border p-2 rounded mb-4 text-center w-full max-w-sm"
        min={new Date().toISOString().split("T")[0]} // ✅ Disable past dates
      />

      <label className="mb-2 font-medium">Phone Number:</label>
      <input
        type="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="border p-2 rounded mb-4 w-full max-w-sm"
        placeholder="Enter phone number"
      />

      <label className="mb-2 font-medium">Address:</label>
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="border p-2 rounded mb-4 w-full max-w-sm"
        placeholder="Enter your address"
      />

      <label className="mb-2 font-medium">City:</label>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="border p-2 rounded mb-4 w-full max-w-sm"
        placeholder="Enter your city"
      />

      <label className="mb-2 font-medium">Nearest Place (Optional):</label>
      <input
        type="text"
        value={nearestPlace}
        onChange={(e) => setNearestPlace(e.target.value)}
        className="border p-2 rounded mb-6 w-full max-w-sm"
        placeholder="e.g. Near Mall Road"
      />

      <button
        onClick={handleBookNow}
        className="bg-black text-white px-6 py-2 rounded hover:bg-gray-900 transition"
      >
        Book Now
      </button>
    </div>
  );
}
