// src/Components/PaymentForm.jsx
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { databases, account, ID } from "../appwrite";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

function CheckoutForm({ amount, bookingId, service, onSuccess }) {
  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cashDetails, setCashDetails] = useState({ phone: "", address: "", city: "" });
  const [mobileNumber, setMobileNumber] = useState("");
  const [testMode, setTestMode] = useState(true); // ✅ default enabled for simulation

  const handlePay = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      // ✅ TEST MODE: simulate instant success
      if (testMode) {
        await databases.createDocument(
          import.meta.env.VITE_APPWRITE_BOOKING_DATABASE_ID,
          import.meta.env.VITE_APPWRITE_PAYMENTS_COLLECTION_ID,
          ID.unique(),
          {
            bookingId,
            service: service?.name || "Unknown",
            amount,
            status: "test_payment_success",
            paymentMethod,
            paidAt: new Date().toISOString(),
          }
        );
        setMessage("✅ Payment simulated successfully (Test Mode).");
        if (onSuccess) onSuccess("test_" + bookingId);
        return;
      }

      // ---- CASH PAYMENT ----
      if (paymentMethod === "cash") {
        await databases.createDocument(
          import.meta.env.VITE_APPWRITE_BOOKING_DATABASE_ID,
          import.meta.env.VITE_APPWRITE_PAYMENTS_COLLECTION_ID,
          ID.unique(),
          {
            bookingId,
            service: service?.name || "Unknown",
            amount,
            status: "cash_on_delivery",
            phone: cashDetails.phone,
            address: cashDetails.address,
            city: cashDetails.city,
            paidAt: new Date().toISOString(),
          }
        );
        setMessage("✅ Cash on Delivery booking confirmed.");
        if (onSuccess) onSuccess("cash_" + bookingId);
        return;
      }

      // ---- JAZZCASH / EASYPAISA ----
      if (paymentMethod === "mobile") {
        await databases.createDocument(
          import.meta.env.VITE_APPWRITE_BOOKING_DATABASE_ID,
          import.meta.env.VITE_APPWRITE_PAYMENTS_COLLECTION_ID,
          ID.unique(),
          {
            bookingId,
            service: service?.name || "Unknown",
            amount,
            status: "mobile_payment",
            mobileNumber,
            paidAt: new Date().toISOString(),
          }
        );
        setMessage("✅ JazzCash/EasyPaisa payment saved.");
        if (onSuccess) onSuccess("mobile_" + bookingId);
        return;
      }

      // ---- CARD PAYMENT ----
      if (paymentMethod === "card") {
        if (!stripe || !elements) {
          setMessage("Stripe is still loading. Please wait.");
          setLoading(false);
          return;
        }

        const jwt = await account.createJWT();

        const res = await fetch(
          `${import.meta.env.VITE_CREATE_PAYMENT_FUNCTION_URL}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-Appwrite-Project": import.meta.env.VITE_APPWRITE_PROJECT_ID,
              "X-Appwrite-JWT": jwt.jwt,
            },
            body: JSON.stringify({ amount }),
          }
        );

        if (!res.ok) throw new Error("Failed to create payment intent.");
        const { clientSecret } = await res.json();

        const card = elements.getElement(CardElement);
        const paymentResult = await stripe.confirmCardPayment(clientSecret, {
          payment_method: { card },
        });

        if (paymentResult.error) {
          setMessage("⚠️ " + paymentResult.error.message);
        } else if (paymentResult.paymentIntent.status === "succeeded") {
          await databases.createDocument(
            import.meta.env.VITE_APPWRITE_BOOKING_DATABASE_ID,
            import.meta.env.VITE_APPWRITE_PAYMENTS_COLLECTION_ID,
            ID.unique(),
            {
              bookingId,
              service: service?.name || "Unknown",
              amount,
              status: "paid",
              stripeId: paymentResult.paymentIntent.id,
              paidAt: new Date().toISOString(),
            }
          );
          setMessage("✅ Card payment successful.");
          if (onSuccess) onSuccess(paymentResult.paymentIntent.id);
        }
      }
    } catch (err) {
      console.error(err);
      setMessage("⚠️ Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handlePay}
      className="max-w-md mx-auto mt-4 p-4 border rounded shadow space-y-4"
    >
      {/* ✅ Test Mode toggle */}
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={testMode}
          onChange={(e) => setTestMode(e.target.checked)}
          className="mr-2"
        />
        <label>Enable Test Mode (simulate success)</label>
      </div>

      {/* ✅ Payment Method Radio */}
      <div className="space-y-2">
        <label className="flex items-center">
          <input
            type="radio"
            value="card"
            checked={paymentMethod === "card"}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="mr-2"
          />
          Pay with Card
        </label>

        <label className="flex items-center">
          <input
            type="radio"
            value="cash"
            checked={paymentMethod === "cash"}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="mr-2"
          />
          Cash on Delivery
        </label>

        <label className="flex items-center">
          <input
            type="radio"
            value="mobile"
            checked={paymentMethod === "mobile"}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="mr-2"
          />
          JazzCash / EasyPaisa
        </label>
      </div>

      {/* ✅ Card Payment */}
      {paymentMethod === "card" && !testMode && (
        <CardElement className="border p-3 rounded mb-4" />
      )}

      {/* ✅ Cash Details */}
      {paymentMethod === "cash" && (
        <div className="space-y-2">
          <input
            type="text"
            placeholder="Phone Number"
            value={cashDetails.phone}
            onChange={(e) =>
              setCashDetails({ ...cashDetails, phone: e.target.value })
            }
            className="border p-2 rounded w-full"
            required
          />
          <input
            type="text"
            placeholder="Address"
            value={cashDetails.address}
            onChange={(e) =>
              setCashDetails({ ...cashDetails, address: e.target.value })
            }
            className="border p-2 rounded w-full"
            required
          />
          <input
            type="text"
            placeholder="City"
            value={cashDetails.city}
            onChange={(e) =>
              setCashDetails({ ...cashDetails, city: e.target.value })
            }
            className="border p-2 rounded w-full"
            required
          />
        </div>
      )}

      {/* ✅ Mobile Payment */}
      {paymentMethod === "mobile" && (
        <input
          type="text"
          placeholder="JazzCash/EasyPaisa Number"
          value={mobileNumber}
          onChange={(e) => setMobileNumber(e.target.value)}
          className="border p-2 rounded w-full"
          required
        />
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:opacity-50"
      >
        {loading ? "Processing..." : `Pay $${amount}`}
      </button>

      {message && <p className="mt-2 text-center">{message}</p>}
    </form>
  );
}

export default function PaymentForm(props) {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm {...props} />
    </Elements>
  );
}
