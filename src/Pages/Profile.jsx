// // src/Pages/Dashboard.jsx
// import { useEffect, useState } from "react";
// import { account, databases, Query } from "../appwrite";

// export default function Dashboard() {
//   const [user, setUser] = useState(null);
//   const [bookings, setBookings] = useState([]);
//   const [payments, setPayments] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editingBooking, setEditingBooking] = useState(null);
//   const [formData, setFormData] = useState({ serviceName: "", bookingDate: "" });

//   const DB_ID = import.meta.env.VITE_APPWRITE_BOOKING_DATABASE_ID;
//   const BOOKINGS_COLLECTION_ID = import.meta.env.VITE_APPWRITE_BOOKING_COLLECTION_ID;
//   const PAYMENTS_COLLECTION_ID = import.meta.env.VITE_APPWRITE_PAYMENTS_COLLECTION_ID;

//   // ---------------- FETCH DASHBOARD DATA ----------------
//   useEffect(() => {
//     const fetchDashboard = async () => {
//       try {
//         const currentUser = await account.get();
//         setUser(currentUser);

//         const bookingRes = await databases.listDocuments(DB_ID, BOOKINGS_COLLECTION_ID, [
//           Query.equal("userId", currentUser.$id),
//         ]);

//         const paymentRes = await databases.listDocuments(DB_ID, PAYMENTS_COLLECTION_ID);

//         setBookings(bookingRes.documents);
//         setPayments(paymentRes.documents);
//       } catch (err) {
//         console.error("❌ Error fetching dashboard data:", err);
//         alert("Failed to load dashboard. Please log in again.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDashboard();
//   }, []);

//   // ---------------- PAYMENT INFO ----------------
//   const getPaymentInfo = (bookingId) => {
//     const payment = payments.find((p) => p.bookingId === bookingId);
//     if (!payment) return { status: "Unpaid", amount: "-" };

//     const status =
//       payment.status === "paid" || payment.status === "completed"
//         ? "Paid"
//         : "Pending";

//     return {
//       status,
//       amount: payment.amount ? `$${payment.amount}` : "-",
//     };
//   };

//   // ---------------- EDIT BOOKING ----------------
//   const handleEdit = (booking) => {
//     setEditingBooking(booking);
//     setFormData({
//       serviceName: booking.serviceName,
//       bookingDate: new Date(booking.bookingDate).toISOString().slice(0, 16),
//     });
//     setIsModalOpen(true);
//   };

//   const handleSave = async () => {
//     if (!editingBooking) return;
//     try {
//       const updatedBooking = await databases.updateDocument(
//         DB_ID,
//         BOOKINGS_COLLECTION_ID,
//         editingBooking.$id,
//         {
//           serviceName: formData.serviceName,
//           bookingDate: new Date(formData.bookingDate).toISOString(),
//         }
//       );

//       setBookings((prev) =>
//         prev.map((b) => (b.$id === updatedBooking.$id ? updatedBooking : b))
//       );

//       setIsModalOpen(false);
//       setEditingBooking(null);
//       alert("Booking updated successfully!");
//     } catch (err) {
//       console.error("Error updating booking:", err);
//       alert("Failed to update booking. You may not have permission.");
//     }
//   };

//   // ---------------- CANCEL BOOKING ----------------
//   const handleCancel = async (bookingId) => {
//     if (!window.confirm("Are you sure you want to cancel this booking?")) return;

//     try {
//       await databases.deleteDocument(DB_ID, BOOKINGS_COLLECTION_ID, bookingId);
//       setBookings((prev) => prev.filter((b) => b.$id !== bookingId));
//       alert("Booking cancelled successfully!");
//     } catch (err) {
//       console.error("Error cancelling booking:", err);
//       alert(
//         "Failed to cancel booking. You may not be authorized or your session expired."
//       );
//     }
//   };

//   if (loading) {
//     return <p className="text-center py-10 text-gray-600">Loading your bookings...</p>;
//   }

//   return (
//     <section className="py-12 px-4 sm:px-6 lg:px-20 bg-gray-50 min-h-screen">
//       {/* ✅ User Info Top Right */}
//       {user && (
//         <div className="flex justify-end mb-4 text-sm text-gray-600">
//           Logged in as: <span className="ml-2 font-semibold">{user.email}</span>
//         </div>
//       )}

//       <h2 className="text-2xl sm:text-3xl font-bold text-blue-800 mb-8 text-center">
//         My Bookings
//       </h2>

//       {bookings.length === 0 ? (
//         <p className="text-center text-gray-600 text-lg">You have no bookings yet.</p>
//       ) : (
//         <div className="overflow-x-auto bg-white shadow-lg rounded-xl">
//           <table className="min-w-full text-sm text-gray-700">
//             <thead className="bg-blue-600 text-white">
//               <tr>
//                 <th className="py-3 px-4 text-left">Service</th>
//                 <th className="py-3 px-4 text-left">Date/Time </th>
//                 <th className="py-3 px-4 text-left">Payment Status</th>
//                 <th className="py-3 px-4 text-left">Amount</th>
//                 <th className="py-3 px-4 text-left">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {bookings.map((booking) => {
//                 const { status, amount } = getPaymentInfo(booking.$id);
//                 return (
//                   <tr
//                     key={booking.$id}
//                     className="border-b hover:bg-gray-50 transition"
//                   >
//                     <td className="py-3 px-4 font-medium">{booking.serviceName}</td>
//                     <td className="py-3 px-4">
//                       {new Date(booking.bookingDate).toLocaleDateString()}{" "}
//                       {new Date(booking.bookingDate).toLocaleTimeString([], {
//                         hour: "2-digit",
//                         minute: "2-digit",
//                       })}
//                     </td>
//                     <td className="py-3 px-4">
//                       <span
//                         className={`px-3 py-1 rounded-full text-xs font-semibold ${
//                           status === "Paid"
//                             ? "bg-green-100 text-green-700"
//                             : status === "Pending"
//                             ? "bg-yellow-100 text-yellow-700"
//                             : "bg-red-100 text-red-700"
//                         }`}
//                       >
//                         {status}
//                       </span>
//                     </td>
//                     <td className="py-3 px-4">{amount}</td>
//                     <td className="py-3 px-4 flex gap-2">
//                       <button
//                         onClick={() => handleEdit(booking)}
//                         className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm transition"
//                       >
//                         Edit
//                       </button>
//                       <button
//                         onClick={() => handleCancel(booking.$id)}
//                         className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm transition"
//                       >
//                         Cancel
//                       </button>
//                     </td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {/* ------------------ EDIT MODAL ------------------ */}
//       {isModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//           <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 relative">
//             <h3 className="text-xl font-bold mb-4">Edit Booking</h3>

//             <label className="block mb-2 font-medium">Service Name</label>
//             <input
//               type="text"
//               value={formData.serviceName}
//               onChange={(e) =>
//                 setFormData((prev) => ({ ...prev, serviceName: e.target.value }))
//               }
//               className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />

//             <label className="block mb-2 font-medium">Booking Date & Time</label>
//             <input
//               type="datetime-local"
//               value={formData.bookingDate}
//               onChange={(e) =>
//                 setFormData((prev) => ({ ...prev, bookingDate: e.target.value }))
//               }
//               className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />

//             <div className="flex justify-end gap-3">
//               <button
//                 onClick={() => setIsModalOpen(false)}
//                 className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-md text-sm transition"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleSave}
//                 className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm transition"
//               >
//                 Save
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </section>
//   );
// }
// src/Pages/Dashboard.jsx
import { useEffect, useState } from "react";
import { account, databases, Query } from "../appwrite";
import { toast } from "react-toastify";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState(null); // Initially null
  const [payments, setPayments] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBooking, setEditingBooking] = useState(null);
  const [formData, setFormData] = useState({ serviceName: "", bookingDate: "" });

  const [confirmCancelId, setConfirmCancelId] = useState(null);

  const DB_ID = import.meta.env.VITE_APPWRITE_BOOKING_DATABASE_ID;
  const BOOKINGS_COLLECTION_ID = import.meta.env.VITE_APPWRITE_BOOKING_COLLECTION_ID;
  const PAYMENTS_COLLECTION_ID = import.meta.env.VITE_APPWRITE_PAYMENTS_COLLECTION_ID;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const currentUser = await account.get();
        setUser(currentUser);

        const bookingRes = await databases.listDocuments(DB_ID, BOOKINGS_COLLECTION_ID, [
          Query.equal("userId", currentUser.$id),
        ]);

        const paymentRes = await databases.listDocuments(DB_ID, PAYMENTS_COLLECTION_ID);

        setBookings(bookingRes.documents || []);
        setPayments(paymentRes.documents || []);
      } catch (err) {
        console.error("❌ Error fetching profile data:", err);
        toast.error("Failed to load profile. Please log in again.");
        setBookings([]); // fallback so table renders
      }
    };

    fetchProfile();
  }, []);

  const getPaymentInfo = (bookingId) => {
    const payment = payments.find((p) => p.bookingId === bookingId);
    if (!payment) return { status: "Unpaid", amount: "-" };

    const status =
      payment.status === "paid" || payment.status === "completed"
        ? "Paid"
        : "Pending";

    return { status, amount: payment.amount ? `$${payment.amount}` : "-" };
  };

  const handleEdit = (booking) => {
    setEditingBooking(booking);
    setFormData({
      serviceName: booking.serviceName,
      bookingDate: new Date(booking.bookingDate).toISOString().slice(0, 16),
    });
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    if (!editingBooking) return;
    try {
      const updatedBooking = await databases.updateDocument(
        DB_ID,
        BOOKINGS_COLLECTION_ID,
        editingBooking.$id,
        {
          serviceName: formData.serviceName,
          bookingDate: new Date(formData.bookingDate).toISOString(),
        }
      );

      setBookings((prev) =>
        prev.map((b) => (b.$id === updatedBooking.$id ? updatedBooking : b))
      );

      setIsModalOpen(false);
      setEditingBooking(null);
      toast.success("Booking updated successfully!");
    } catch (err) {
      console.error("Error updating booking:", err);
      toast.error("Failed to update booking. You may not have permission.");
    }
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-20 bg-gray-100 min-h-screen">
      {user && (
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-2xl font-bold text-white">
            {user.name ? user.name.charAt(0).toUpperCase() : "U"}
          </div>
          <div>
            <h1 className="text-3xl font-semibold text-gray-800">{user.name || "User Name"}</h1>
            <p className="text-gray-500 text-sm">Profile</p>
          </div>
        </div>
      )}

      <h2 className="text-2xl font-bold text-blue-800 mb-4">Your Bookings</h2>

      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="py-3 px-4 text-left">Service</th>
              <th className="py-3 px-4 text-left">Date/Time</th>
              <th className="py-3 px-4 text-left">Payment Status</th>
              <th className="py-3 px-4 text-left">Amount</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings === null ? null : bookings.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-4 text-gray-600">
                  You have no bookings yet.
                </td>
              </tr>
            ) : (
              bookings.map((booking) => {
                const { status, amount } = getPaymentInfo(booking.$id);
                return (
                  <tr key={booking.$id} className="border-b hover:bg-gray-50 transition">
                    <td className="py-3 px-4 font-medium">{booking.serviceName}</td>
                    <td className="py-3 px-4">
                      {new Date(booking.bookingDate).toLocaleDateString()}{" "}
                      {new Date(booking.bookingDate).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          status === "Paid"
                            ? "bg-green-100 text-green-700"
                            : status === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {status}
                      </span>
                    </td>
                    <td className="py-3 px-4">{amount}</td>
                    <td className="py-3 px-4 flex gap-2">
                      <button
                        onClick={() => handleEdit(booking)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => setConfirmCancelId(booking.$id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm transition"
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
{/* Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 relative">
            <h3 className="text-xl font-bold mb-4">Edit Booking</h3>
            <label className="block mb-2 font-medium">Service Name</label>
            <input
              type="text"
              value={formData.serviceName}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, serviceName: e.target.value }))
              }
              className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <label className="block mb-2 font-medium">Booking Date & Time</label>
            <input
              type="datetime-local"
              value={formData.bookingDate}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, bookingDate: e.target.value }))
              }
              className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-md text-sm transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm transition"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Confirmation Modal */}
      {confirmCancelId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-sm p-6">
            <h3 className="text-lg font-semibold mb-4">Confirm Cancellation</h3>
            <p className="mb-6">Are you sure you want to cancel this booking?</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setConfirmCancelId(null)}
                className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-md text-sm"
              >
                No
              </button>
              <button
                onClick={async () => {
                  try {
                    await databases.deleteDocument(DB_ID, BOOKINGS_COLLECTION_ID, confirmCancelId);
                    setBookings((prev) =>
                      prev.filter((b) => b.$id !== confirmCancelId)
                    );
                    toast.success("Booking cancelled successfully!");
                  } catch (err) {
                    console.error("Error cancelling booking:", err);
                    toast.error("Failed to cancel booking. Try again!");
                  } finally {
                    setConfirmCancelId(null);
                  }
                }}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

