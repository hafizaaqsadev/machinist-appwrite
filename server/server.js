// server/server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import twilio from "twilio";
import nodemailer from "nodemailer";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

app.post("/send-notification", async (req, res) => {
  const { serviceName, userEmail, bookingDate } = req.body;

  try {
    const message = `New Booking:\nService: ${serviceName}\nDate: ${bookingDate}\nUser: ${userEmail}`;

    // ✅ Send WhatsApp
    let whatsappSid = null;
    try {
      const whatsappResponse = await twilioClient.messages.create({
        from: process.env.TWILIO_WHATSAPP_NUMBER,
        to: process.env.ADMIN_WHATSAPP,
        body: message,
      });
      whatsappSid = whatsappResponse.sid;
    } catch (err) {
      console.error("❌ WhatsApp error:", err);
    }

    // ✅ Send Email
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.NOTIFY_EMAIL,
          pass: process.env.NOTIFY_PASS,
        },
      });

      await transporter.sendMail({
        from: process.env.NOTIFY_EMAIL,
        to: process.env.ADMIN_EMAIL,
        subject: `New Booking: ${serviceName}`,
        text: message,
      });
    } catch (err) {
      console.error("❌ Email error:", err);
    }

    res.json({
      success: true,
      message: "Notifications attempted (check logs for errors)",
      whatsappSid,
    });
  } catch (err) {
    console.error("❌ /send-notification error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`🚀 Notification server running at http://localhost:${process.env.PORT || 5000}`);
});
