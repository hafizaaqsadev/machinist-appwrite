// src/components/BookingNotifications.jsx
import React, { useEffect } from "react";
import { toast } from "react-toastify";

const BookingNotifications = ({ booking }) => {
  useEffect(() => {
    if (!booking?.serviceName) return;

    // ✅ Frontend notification
    toast.info(
      `📢 Booking Done!\nService: ${booking.serviceName}\nUser: ${booking.userEmail}\nDate: ${booking.bookingDate}`,
      { position: "top-right", autoClose: 5000 }
    );

    // ✅ Backend notification request (WhatsApp + Email)
    const sendNotification = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/send-notification`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              serviceName: booking.serviceName,
              userEmail: booking.userEmail,
              bookingDate: booking.bookingDate,
            }),
          }
        );

        let data = {};
        try {
          data = await res.json();
        } catch (err) {
          console.warn("Response is not JSON:", err);
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
  }, [booking]);

  return null;
};

export default BookingNotifications;
