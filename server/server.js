// server/server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import twilio from "twilio";
import nodemailer from "nodemailer";
import Stripe from "stripe";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Twilio client
const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// ✅ Stripe client
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// ------------------- Notifications -------------------
app.post("/send-notification", async (req, res) => {
  const { serviceName, userEmail, bookingDate } = req.body;

  try {
    const message = `New Booking:\nService: ${serviceName}\nDate: ${bookingDate}\nUser: ${userEmail}`;

    // --- WhatsApp ---
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

    // --- Email ---
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

// ------------------- Stripe Payment -------------------
app.post("/create-payment-intent", async (req, res) => {
  const { amount } = req.body;

  if (!amount || amount <= 0) {
    return res.status(400).json({ error: "Invalid amount" });
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // USD to cents
      currency: "usd",
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error("❌ Stripe error:", err);
    res.status(500).json({ error: err.message });
  }
});

// ------------------- Start Server -------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
