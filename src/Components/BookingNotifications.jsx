// src/components/BookingNotifications.jsx
import { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

const BookingNotifications = ({ booking }) => {
  const { user } = useAuth(); // get logged-in user
  const notifiedRef = useRef(false); // prevent multiple notifications

  useEffect(() => {
    // Only proceed if booking exists and notification hasn't been sent
    if (!booking?.serviceName || notifiedRef.current) return;

    // ✅ Only show frontend notification to the booking owner
    if (user && booking.userId === user.$id) {
      toast.info(
        `📢 Booking Done!\nService: ${booking.serviceName}\nDate: ${booking.bookingDate}`,
        { position: "top-right", autoClose: 5000 }
      );
    }

    notifiedRef.current = true;

    // ✅ Backend notification request (admin notification)
    const sendNotification = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/send-notification`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            serviceName: booking.serviceName,
            userEmail: booking.userEmail,
            bookingDate: booking.bookingDate,
          }),
        });

        const contentType = res.headers.get("content-type");
        let data = {};

        if (contentType && contentType.includes("application/json")) {
          data = await res.json();
        }

        if (res.ok && data.success) {
          toast.success("📨 Admin notified successfully!", {
            position: "top-right",
            autoClose: 5000,
          });
        } else {
          toast.error(data.message || "❌ Failed to notify admin.", {
            position: "top-right",
            autoClose: 5000,
          });
        }
      } catch (err) {
        console.error("❌ Notification API error:", err);
        toast.error("⚠️ Error sending notification.", {
          position: "top-right",
          autoClose: 5000,
        });
      }
    };

    sendNotification();
  }, [booking, user]);

  return null;
};

export default BookingNotifications;
