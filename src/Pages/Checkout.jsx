// src/Pages/Checkout.jsx
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import PaymentForm from "../Components/PaymentForm";
import { databases } from "../appwrite";
import { toast } from "react-toastify";

export default function Checkout() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { service, date, user, amount: passedAmount, bookingId } = state || {};

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cashPhone, setCashPhone] = useState("");
  const [cashAddress, setCashAddress] = useState("");
  const [cashCity, setCashCity] = useState("");
  const [jazzNumber, setJazzNumber] = useState("");
  const [processing, setProcessing] = useState(false);

  const DB_ID = import.meta.env.VITE_APPWRITE_BOOKING_DATABASE_ID;
  const BOOKINGS_COLLECTION_ID = import.meta.env.VITE_APPWRITE_BOOKING_COLLECTION_ID;

  // Redirect to home if no service selected
  useEffect(() => {
    if (!service) {
      const timer = setTimeout(() => navigate("/"), 2000);
      return () => clearTimeout(timer);
    }
  }, [service, navigate]);

  if (!service) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <p className="text-gray-600 text-center">No service selected. Redirecting...</p>
      </div>
    );
  }

  // Compute amount to pay
  const computeAmount = () => {
    if (typeof passedAmount === "number" && passedAmount > 0) return passedAmount;
    if (service?.price && Number(service.price) > 0) return Number(service.price);

    const seed = (service?.id || service?.name || "default")
      .toString()
      .split("")
      .reduce((s, ch) => s + ch.charCodeAt(0), 0);

    const min = 50;
    const max = 200;
    return min + (seed % (max - min + 1));
  };

  const amountToPay = computeAmount();

  // Update booking in Appwrite
  const updateBookingPayment = async (updates) => {
    if (!bookingId) return null;
    try {
      const updated = await databases.updateDocument(
        DB_ID,
        BOOKINGS_COLLECTION_ID,
        bookingId,
        updates
      );
      return updated;
    } catch (err) {
      console.error("Failed to update booking:", err);
      toast.error("⚠️ Could not update booking record. Please contact support.");
      return null;
    }
  };

  // Handle cash / jazzcash booking
  const handleConfirmNonCard = async () => {
    if (processing) return;

    if (paymentMethod === "cash") {
      if (!cashPhone || !cashAddress || !cashCity) {
        toast.warning("⚠️ Please fill phone, address and city for Cash on Delivery.");
        return;
      }
    }
    if (paymentMethod === "jazzcash" && !jazzNumber) {
      toast.warning("⚠️ Please enter your JazzCash / EasyPaisa number.");
      return;
    }

    setProcessing(true);
    try {
      let updates = { paymentMethod };

      if (paymentMethod === "cash") {
        updates = {
          ...updates,
          phone: cashPhone,
          address: cashAddress,
          city: cashCity,
          status: "pending",
        };
      } else if (paymentMethod === "jazzcash") {
        updates = {
          ...updates,
          phone: jazzNumber,
          status: "pending",
        };
      }

      const updated = await updateBookingPayment(updates);

      if (updated) {
        toast.success("✅ Booking recorded successfully!");
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Payment process failed:", err);
    } finally {
      setProcessing(false);
    }
  };

  // Handle card success (Stripe / test mode)
  const handleCardSuccess = async (paymentId) => {
    toast.success(`✅ Payment Successful! ID: ${paymentId}`);
    setProcessing(true);
    try {
      const updated = await updateBookingPayment({
        paymentMethod: "card",
        status: "paid",
        phone: user?.phone || "",
        stripePaymentId: paymentId || "test_txn_id",
      });

      if (updated) {
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Card payment saving failed:", err);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 sm:px-6 md:px-12 lg:px-20 py-12">
      <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">Checkout</h2>

      {/* Service Info */}
      <div className="bg-white rounded-lg shadow-md p-6 max-w-md w-full mb-6">
        <p className="mb-2"><strong>Service:</strong> {service?.name}</p>
        <p className="mb-2"><strong>Date:</strong> {date}</p>
        <p className="mb-2"><strong>Amount:</strong> ${amountToPay}</p>
      </div>

      {/* Payment Options */}
      <div className="bg-white rounded-lg shadow-md p-6 max-w-md w-full">
        <h3 className="text-xl font-semibold mb-4">Payment Method</h3>

        {/* Select Method */}
        <div className="space-y-3">
          <label className="flex items-center gap-3">
            <input
              type="radio"
              name="payment"
              value="cash"
              checked={paymentMethod === "cash"}
              onChange={() => setPaymentMethod("cash")}
            />
            <span className="ml-1 font-medium">Cash on Delivery</span>
          </label>

          <label className="flex items-center gap-3">
            <input
              type="radio"
              name="payment"
              value="card"
              checked={paymentMethod === "card"}
              onChange={() => setPaymentMethod("card")}
            />
            <span className="ml-1 font-medium">Card (Stripe)</span>
          </label>

          <label className="flex items-center gap-3">
            <input
              type="radio"
              name="payment"
              value="jazzcash"
              checked={paymentMethod === "jazzcash"}
              onChange={() => setPaymentMethod("jazzcash")}
            />
            <span className="ml-1 font-medium">JazzCash / EasyPaisa</span>
          </label>
        </div>

        {/* Cash Fields */}
        {paymentMethod === "cash" && (
          <div className="mt-4 space-y-3">
            <input
              type="tel"
              placeholder="Phone Number"
              value={cashPhone}
              onChange={(e) => setCashPhone(e.target.value)}
              className="border p-2 rounded w-full"
            />
            <input
              type="text"
              placeholder="Address"
              value={cashAddress}
              onChange={(e) => setCashAddress(e.target.value)}
              className="border p-2 rounded w-full"
            />
            <input
              type="text"
              placeholder="City"
              value={cashCity}
              onChange={(e) => setCashCity(e.target.value)}
              className="border p-2 rounded w-full"
            />
            <div className="flex justify-end">
              <button
                disabled={processing}
                onClick={handleConfirmNonCard}
                className="mt-4 bg-black text-white px-6 py-2 rounded hover:bg-gray-900 disabled:opacity-50"
              >
                {processing ? "Processing..." : "Confirm Cash Booking"}
              </button>
            </div>
          </div>
        )}

        {/* Card Payment */}
        {paymentMethod === "card" && (
          <div className="mt-4">
            <PaymentForm
              amount={amountToPay}
              bookingId={bookingId}
              service={service}
              onSuccess={handleCardSuccess}
            />
          </div>
        )}

        {/* JazzCash Fields */}
        {paymentMethod === "jazzcash" && (
          <div className="mt-4">
            <input
              type="tel"
              placeholder="JazzCash / EasyPaisa Number"
              value={jazzNumber}
              onChange={(e) => setJazzNumber(e.target.value)}
              className="border p-2 rounded w-full"
            />
            <div className="flex justify-end">
              <button
                disabled={processing}
                onClick={handleConfirmNonCard}
                className="mt-4 bg-black text-white px-6 py-2 rounded hover:bg-gray-900 disabled:opacity-50"
              >
                {processing ? "Processing..." : "Confirm Payment Info"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


