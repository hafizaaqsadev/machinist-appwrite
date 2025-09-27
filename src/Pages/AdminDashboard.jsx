// import { useEffect, useState } from "react";
// import { databases } from "../appwrite";
// import { toast } from "react-toastify";
// import { useAuth } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";

// const DB_ID = import.meta.env.VITE_APPWRITE_BOOKING_DATABASE_ID;
// const USERS_COLLECTION = "userlogins";
// const BOOKINGS_COLLECTION = "bookings";
// const PAYMENTS_COLLECTION = "payments";

// export default function AdminDashboard() {
//   const [users, setUsers] = useState([]);
//   const [bookings, setBookings] = useState([]);
//   const [payments, setPayments] = useState([]);
//   const { user, logout, setUser, setRole } = useAuth(); // Ensure logout resets state
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!user) return navigate("/admin"); // redirect if not logged in

//     const fetchData = async () => {
//       try {
//         const [usersRes, bookingsRes, paymentsRes] = await Promise.all([
//           databases.listDocuments(DB_ID, USERS_COLLECTION),
//           databases.listDocuments(DB_ID, BOOKINGS_COLLECTION),
//           databases.listDocuments(DB_ID, PAYMENTS_COLLECTION),
//         ]);

//         setUsers(usersRes.documents);
//         setBookings(bookingsRes.documents);
//         setPayments(paymentsRes.documents);
//       } catch (err) {
//         toast.error("Error fetching data. Check Appwrite permissions.");
//         console.error("Admin fetch error:", err);
//       }
//     };

//     fetchData();
//   }, [user, navigate]);

//   // Delete a document
//   const deleteDocument = async (collection, id, setter) => {
//     if (!window.confirm("Are you sure?")) return;

//     try {
//       await databases.deleteDocument(DB_ID, collection, id);
//       setter((prev) => prev.filter((d) => d.$id !== id));
//       toast.success("Deleted successfully ✅");
//     } catch (err) {
//       toast.error("Failed to delete. Admin may not have permission ❌");
//       console.error("Delete error:", err);
//     }
//   };

//   // Toggle booking/payment status
//   const toggleStatus = async (collection, id, currentStatus, setter) => {
//     const newStatus = currentStatus === "Pending" ? "Paid" : "Pending";
//     try {
//       await databases.updateDocument(DB_ID, collection, id, {
//         status: newStatus,
//       });
//       setter((prev) =>
//         prev.map((d) => (d.$id === id ? { ...d, status: newStatus } : d))
//       );
//       toast.info(`Status updated to ${newStatus}`);
//     } catch (err) {
//       toast.error("Failed to update status. Admin may not have permission ❌");
//       console.error("Status update error:", err);
//     }
//   };

//   // Unique users
//   const uniqueUsers = Array.from(
//     new Map(users.map((u) => [u.email, u])).values()
//   );

//   const handleLogout = () => {
//     logout();
//     setUser(null);
//     setRole(null);
//     navigate("/admin"); // go to admin login
//   };

//   return (
//     <div className="p-6 min-h-screen bg-gray-100">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
//         <div className="flex gap-2">
//           <button
//             onClick={() => {
//               // ✅ Logout user and reset state
//               logout(); // Clear any auth session
//               setUser(null); // Reset context user
//               setRole(null); // Reset context role
//               navigate("/"); // Go to Home page
//             }}
//             className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md shadow-sm transition"
//           >
//             Home
//           </button>
//           <button
//             onClick={handleLogout}
//             className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-md shadow-sm transition"
//           >
//             Logout
//           </button>
//         </div>
//       </div>

//       <h2 className="text-2xl font-bold text-blue-800 mb-4">
//         Users & Bookings
//       </h2>
//       <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
//         <table className="min-w-full text-sm text-gray-700">
//           <thead className="bg-blue-600 text-white">
//             <tr>
//               <th className="py-3 px-4 text-left">User Email</th>
//               <th className="py-3 px-4 text-left">Bookings</th>
//               <th className="py-3 px-4 text-left">Payments</th>
//               <th className="py-3 px-4 text-left">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {uniqueUsers.map((u) => {
//               const userBookings = bookings.filter(
//                 (b) => b.userEmail === u.email
//               );
//               const userPayments = payments.filter(
//                 (p) => p.userEmail === u.email
//               );

//               return (
//                 <tr
//                   key={u.$id}
//                   className="border-b hover:bg-gray-50 transition"
//                 >
//                   <td className="py-3 px-4 font-medium align-top">{u.email}</td>

//                   {/* Bookings */}
//                   <td className="py-3 px-4">
//                     {userBookings.length ? (
//                       userBookings.map((b) => (
//                         <div
//                           key={b.$id}
//                           className="flex items-center justify-between bg-blue-50 p-2 rounded mb-1"
//                         >
//                           <span className="flex-1">{b.serviceName}</span>
//                           <span
//                             className={`px-2 py-1 rounded-full text-xs font-semibold ${
//                               b.status === "Paid"
//                                 ? "bg-green-100 text-green-700"
//                                 : "bg-yellow-100 text-yellow-700"
//                             }`}
//                           >
//                             {b.status}
//                           </span>
//                           <button
//                             onClick={() =>
//                               toggleStatus(
//                                 BOOKINGS_COLLECTION,
//                                 b.$id,
//                                 b.status,
//                                 setBookings
//                               )
//                             }
//                             className="ml-2 bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-sm"
//                           >
//                             Update
//                           </button>
//                           <button
//                             onClick={() =>
//                               deleteDocument(
//                                 BOOKINGS_COLLECTION,
//                                 b.$id,
//                                 setBookings
//                               )
//                             }
//                             className="ml-2 bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-sm"
//                           >
//                             Delete
//                           </button>
//                         </div>
//                       ))
//                     ) : (
//                       <span className="text-gray-400">No bookings</span>
//                     )}
//                   </td>

//                   {/* Payments */}
//                   <td className="py-3 px-4">
//                     {userPayments.length ? (
//                       userPayments.map((p) => (
//                         <div
//                           key={p.$id}
//                           className="flex items-center justify-between bg-green-50 p-2 rounded mb-1"
//                         >
//                           <span className="flex-1">{p.amount} PKR</span>
//                           <span
//                             className={`px-2 py-1 rounded-full text-xs font-semibold ${
//                               p.status === "Paid"
//                                 ? "bg-green-100 text-green-700"
//                                 : "bg-yellow-100 text-yellow-700"
//                             }`}
//                           >
//                             {p.status}
//                           </span>
//                           <button
//                             onClick={() =>
//                               toggleStatus(
//                                 PAYMENTS_COLLECTION,
//                                 p.$id,
//                                 p.status,
//                                 setPayments
//                               )
//                             }
//                             className="ml-2 bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-sm"
//                           >
//                             Update
//                           </button>
//                         </div>
//                       ))
//                     ) : (
//                       <span className="text-gray-400">No payments</span>
//                     )}
//                   </td>

//                   {/* User Actions */}
//                   <td className="py-3 px-4 flex flex-col gap-2 items-start">
//                     <button
//                       onClick={() =>
//                         deleteDocument(USERS_COLLECTION, u.$id, setUsers)
//                       }
//                       className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md shadow-sm transition w-full"
//                     >
//                       Delete User
//                     </button>
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }



import { useEffect, useState } from "react";
import { databases } from "../appwrite";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

const DB_ID = import.meta.env.VITE_APPWRITE_BOOKING_DATABASE_ID;
const USERS_COLLECTION = "userlogins";
const BOOKINGS_COLLECTION = "bookings";
const PAYMENTS_COLLECTION = "payments";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [payments, setPayments] = useState([]);
  const { user, logout, setUser, setRole } = useAuth();

  // Fetch data from Appwrite
  useEffect(() => {
    if (!user) {
      // Agar user nahi hai to directly admin login page ya home page redirect
      window.location.href = "/admin";
      return;
    }

    const fetchData = async () => {
      try {
        const [usersRes, bookingsRes, paymentsRes] = await Promise.all([
          databases.listDocuments(DB_ID, USERS_COLLECTION),
          databases.listDocuments(DB_ID, BOOKINGS_COLLECTION),
          databases.listDocuments(DB_ID, PAYMENTS_COLLECTION),
        ]);

        setUsers(usersRes.documents);
        setBookings(bookingsRes.documents);
        setPayments(paymentsRes.documents);
      } catch (err) {
        toast.error("Error fetching data. Check Appwrite permissions.");
        console.error("Admin fetch error:", err);
      }
    };

    fetchData();
  }, [user]);

  // Common logout function
  const performLogout = () => {
    logout();
    setUser(null);
    setRole(null);
  };

  // Home button click
  const goHome = () => {
    performLogout();
    window.location.href = "/"; // full page reload, Home page khulega
  };

  // Logout button click
  const handleLogout = () => {
    performLogout();
    window.location.href = "/"; // full page reload
  };

  // Toggle booking/payment status
  const toggleStatus = async (collection, id, currentStatus, setter) => {
    const newStatus = currentStatus === "Pending" ? "Paid" : "Pending";
    try {
      await databases.updateDocument(DB_ID, collection, id, { status: newStatus });
      setter((prev) => prev.map((d) => (d.$id === id ? { ...d, status: newStatus } : d)));
      toast.info(`Status updated to ${newStatus}`);
    } catch (err) {
      toast.error("Failed to update status ❌");
      console.error("Status update error:", err);
    }
  };

  // Delete document
  const deleteDocument = async (collection, id, setter) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await databases.deleteDocument(DB_ID, collection, id);
      setter((prev) => prev.filter((d) => d.$id !== id));
      toast.success("Deleted successfully ✅");
    } catch (err) {
      toast.error("Failed to delete ❌");
      console.error("Delete error:", err);
    }
  };

  // Unique users
  const uniqueUsers = Array.from(new Map(users.map((u) => [u.email, u])).values());

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <div className="flex gap-2">
          <button
            onClick={goHome}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md shadow-sm transition"
          >
            Home
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-md shadow-sm transition"
          >
            Logout
          </button>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-blue-800 mb-4">Users & Bookings</h2>
      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="py-3 px-4 text-left">User Email</th>
              <th className="py-3 px-4 text-left">Bookings</th>
              <th className="py-3 px-4 text-left">Payments</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {uniqueUsers.map((u) => {
              const userBookings = bookings.filter((b) => b.userEmail === u.email);
              const userPayments = payments.filter((p) => p.userEmail === u.email);

              return (
                <tr key={u.$id} className="border-b hover:bg-gray-50 transition">
                  <td className="py-3 px-4 font-medium align-top">{u.email}</td>

                  {/* Bookings */}
                  <td className="py-3 px-4">
                    {userBookings.length ? (
                      userBookings.map((b) => (
                        <div
                          key={b.$id}
                          className="flex items-center justify-between bg-blue-50 p-2 rounded mb-1"
                        >
                          <span className="flex-1">{b.serviceName}</span>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              b.status === "Paid"
                                ? "bg-green-100 text-green-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {b.status}
                          </span>
                          <button
                            onClick={() => toggleStatus(BOOKINGS_COLLECTION, b.$id, b.status, setBookings)}
                            className="ml-2 bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-sm"
                          >
                            Update
                          </button>
                          <button
                            onClick={() => deleteDocument(BOOKINGS_COLLECTION, b.$id, setBookings)}
                            className="ml-2 bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-sm"
                          >
                            Delete
                          </button>
                        </div>
                      ))
                    ) : (
                      <span className="text-gray-400">No bookings</span>
                    )}
                  </td>

                  {/* Payments */}
                  <td className="py-3 px-4">
                    {userPayments.length ? (
                      userPayments.map((p) => (
                        <div
                          key={p.$id}
                          className="flex items-center justify-between bg-green-50 p-2 rounded mb-1"
                        >
                          <span className="flex-1">{p.amount} PKR</span>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              p.status === "Paid"
                                ? "bg-green-100 text-green-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {p.status}
                          </span>
                          <button
                            onClick={() => toggleStatus(PAYMENTS_COLLECTION, p.$id, p.status, setPayments)}
                            className="ml-2 bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-sm"
                          >
                            Update
                          </button>
                        </div>
                      ))
                    ) : (
                      <span className="text-gray-400">No payments</span>
                    )}
                  </td>

                  {/* User Actions */}
                  <td className="py-3 px-4 flex flex-col gap-2 items-start">
                    <button
                      onClick={() => deleteDocument(USERS_COLLECTION, u.$id, setUsers)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md shadow-sm transition w-full"
                    >
                      Delete User
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
