const sendWhatsAppBackend = async (phoneNumber, serviceName, bookingDate) => {
  try {
    const res = await fetch("http://localhost:5000/send-whatsapp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        to: phoneNumber,
        message: `📌 New booking: ${serviceName} on ${bookingDate}`,
      }),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.error || "Failed to send WhatsApp message");

    console.log("📱 WhatsApp sent to admin:", data);

    toast.success("📱 WhatsApp notification sent to admin!", {
      position: "top-right",
      autoClose: 5000,
    });
  } catch (err) {
    console.error("⚠️ WhatsApp backend error:", err);
    toast.error("⚠️ Could not send WhatsApp notification.", {
      position: "top-right",
      autoClose: 5000,
    });
  }
};
