// // server/routes/admin.js
// import express from "express";
// import fetch from "node-fetch"; // agar Node 18+ hai to optional

// const router = express.Router();

// // ✅ Load environment variables
// const APPWRITE_ENDPOINT = "https://cloud.appwrite.io/v1"; // tumhara Appwrite Cloud endpoint
// const APPWRITE_PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID; // ya tumhari project ID
// const APPWRITE_API_KEY = import.meta.env.VITE_APPWRITE_ADMIN_KEY; // admin API key for server

// // ---------------- Users ----------------
// router.get("/users", async (req, res) => {
//   try {
//     const response = await fetch(
//       `${APPWRITE_ENDPOINT}/databases/${import.meta.env.VITE_APPWRITE_BOOKING_DATABASE_ID}/collections/userlogins/documents`,
//       {
//         headers: {
//           "X-Appwrite-Project": APPWRITE_PROJECT_ID,
//           "X-Appwrite-Key": APPWRITE_API_KEY,
//         },
//       }
//     );
//     const data = await response.json();
//     res.json(data.documents || []);
//   } catch (err) {
//     console.error("❌ /admin/users error:", err);
//     res.status(500).json({ error: err.message });
//   }
// });

// // ---------------- Bookings ----------------
// router.get("/bookings", async (req, res) => {
//   try {
//     const response = await fetch(
//       `${APPWRITE_ENDPOINT}/databases/${import.meta.env.VITE_APPWRITE_BOOKING_DATABASE_ID}/collections/bookings/documents`,
//       {
//         headers: {
//           "X-Appwrite-Project": APPWRITE_PROJECT_ID,
//           "X-Appwrite-Key": APPWRITE_API_KEY,
//         },
//       }
//     );
//     const data = await response.json();
//     res.json(data.documents || []);
//   } catch (err) {
//     console.error("❌ /admin/bookings error:", err);
//     res.status(500).json({ error: err.message });
//   }
// });

// // ---------------- Payments ----------------
// router.get("/payments", async (req, res) => {
//   try {
//     const response = await fetch(
//       `${APPWRITE_ENDPOINT}/databases/${import.meta.env.VITE_APPWRITE_BOOKING_DATABASE_ID}/collections/payments/documents`,
//       {
//         headers: {
//           "X-Appwrite-Project": APPWRITE_PROJECT_ID,
//           "X-Appwrite-Key": APPWRITE_API_KEY,
//         },
//       }
//     );
//     const data = await response.json();
//     res.json(data.documents || []);
//   } catch (err) {
//     console.error("❌ /admin/payments error:", err);
//     res.status(500).json({ error: err.message });
//   }
// });

// // ---------------- Delete Document ----------------
// router.delete("/delete/:collection/:id", async (req, res) => {
//   const { collection, id } = req.params;
//   try {
//     const response = await fetch(
//       `${APPWRITE_ENDPOINT}/databases/${import.meta.env.VITE_APPWRITE_BOOKING_DATABASE_ID}/collections/${collection}/documents/${id}`,
//       {
//         method: "DELETE",
//         headers: {
//           "X-Appwrite-Project": APPWRITE_PROJECT_ID,
//           "X-Appwrite-Key": APPWRITE_API_KEY,
//         },
//       }
//     );
//     if (!response.ok) throw new Error("Failed to delete");
//     res.json({ success: true });
//   } catch (err) {
//     console.error("❌ /admin/delete error:", err);
//     res.status(500).json({ error: err.message });
//   }
// });

// // ---------------- Update Status ----------------
// router.patch("/update-status/:collection/:id", async (req, res) => {
//   const { collection, id } = req.params;
//   const { status } = req.body;
//   try {
//     const response = await fetch(
//       `${APPWRITE_ENDPOINT}/databases/${import.meta.env.VITE_APPWRITE_BOOKING_DATABASE_ID}/collections/${collection}/documents/${id}`,
//       {
//         method: "PATCH",
//         headers: {
//           "X-Appwrite-Project": APPWRITE_PROJECT_ID,
//           "X-Appwrite-Key": APPWRITE_API_KEY,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ status }),
//       }
//     );
//     if (!response.ok) throw new Error("Failed to update status");
//     res.json({ success: true });
//   } catch (err) {
//     console.error("❌ /admin/update-status error:", err);
//     res.status(500).json({ error: err.message });
//   }
// });

// export default router;
