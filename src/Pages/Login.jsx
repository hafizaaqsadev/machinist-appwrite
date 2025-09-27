// // src/Pages/Login.jsx
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { X } from "lucide-react";
// import { account, databases, ID } from "../appwrite";
// import { useAuth } from "../context/AuthContext";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// export default function Login() {
//   const [form, setForm] = useState({ email: "", password: "" });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const navigate = useNavigate();
//   const { user, setUser } = useAuth();

//   const handleChange = (e) =>
//     setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

//   // ✅ Logout current session if exists
//   const logoutIfLoggedIn = async () => {
//     try {
//       await account.deleteSession("current");
//       console.log("✅ Previous session cleared");
//     } catch {
//       // No active session, ignore
//     }
//   };

//   // ✅ Record login in UserLogins collection
//   const logUserLogin = async (currentUser) => {
//     try {
//       const res = await databases.createDocument(
//         import.meta.env.VITE_APPWRITE_BOOKING_DATABASE_ID,
//         import.meta.env.VITE_APPWRITE_USERLOGINS_COLLECTION_ID,
//         ID.unique(),
//         {
//           userId: currentUser.$id,
//           email: currentUser.email,
//           loginTime: new Date().toISOString(),
//         }
//       );
//       console.log("✅ User login recorded:", res);
//     } catch (err) {
//       console.error("❌ Failed to record login:", err);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     try {
//       // ✅ Logout existing session
//       await logoutIfLoggedIn();

//       // ✅ Login with email & password
//       await account.createEmailPasswordSession(form.email, form.password);

//       // ✅ Fetch current user
//       const currentUser = await account.get();

//       // ✅ Generate JWT for secure API calls
//       const jwt = await account.createJWT();
//       localStorage.setItem("authToken", jwt.jwt); // 👈 save token in localStorage
//       console.log("✅ JWT stored:", jwt.jwt);

//       // ✅ Update context
//       setUser(currentUser);

//       // ✅ Record login in Appwrite
//       await logUserLogin(currentUser);

//       toast.success("✅ Login successful!", { position: "top-right", autoClose: 3000 });

//       // ✅ Redirect home
//       navigate("/");
//     } catch (err) {
//       console.error("Login error:", err);

//       if (err.code === 401) {
//         setError("⚠️ Session already active or invalid credentials.");
//         toast.error("⚠️ Session already active or invalid credentials.", {
//           position: "top-right",
//           autoClose: 4000,
//         });
//       } else {
//         setError(err?.message || "Login failed. Please check your credentials.");
//         toast.error(err?.message || "Login failed. Please check your credentials.", {
//           position: "top-right",
//           autoClose: 4000,
//         });
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ Redirect if already logged in
//   useEffect(() => {
//     if (user) {
//       navigate("/");
//     }
//   }, [user, navigate]);

//   return (
//     <div className="relative min-h-[80vh] bg-black flex items-center justify-center sm:pt-16">
//       <ToastContainer />
//       {/* Close Button */}
//       <div className="flex justify-end items-center px-4 sm:px-6">
//         <button
//           onClick={() => navigate("/")}
//           className="absolute top-4 right-4 text-white rounded-full p-1 hover:bg-gray-800"
//         >
//           <X size={30} />
//         </button>
//       </div>

//       {/* Login Form */}
//       <div className="bg-white min-h-[80vh] rounded-3xl flex items-center justify-center w-full max-w-md mx-auto p-6 shadow-lg">
//         <div className="w-full space-y-6">
//           <div className="text-center">
//             <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
//               Welcome Back!
//             </h2>
//             <p className="text-sm text-gray-500 mt-2">Login to continue</p>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-4">
//             <input
//               type="email"
//               name="email"
//               placeholder="Email"
//               value={form.email}
//               onChange={handleChange}
//               className="w-full px-4 py-3 border border-gray-300 rounded-full text-center focus:outline-none focus:ring-2 focus:ring-black"
//               required
//             />

//             <input
//               type="password"
//               name="password"
//               placeholder="Password"
//               value={form.password}
//               onChange={handleChange}
//               className="w-full px-4 py-3 border border-gray-300 rounded-full text-center focus:outline-none focus:ring-2 focus:ring-black"
//               required
//             />

//             {error && <p className="text-red-600 text-center text-sm">{error}</p>}

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-black text-white py-3 rounded-full hover:bg-gray-900 disabled:opacity-50 transition"
//             >
//               {loading ? "Logging in..." : "Continue"}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }



// src/Pages/Login.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { account, databases, ID, Query } from "../appwrite"; // 👈 Query import add
import { useAuth } from "../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { user, setUser, setRole } = useAuth(); // 👈 role ko bhi context me set karna hoga

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  // ✅ Logout current session if exists
  const logoutIfLoggedIn = async () => {
    try {
      await account.deleteSession("current");
      console.log("✅ Previous session cleared");
    } catch {
      // No active session, ignore
    }
  };

  // ✅ Record login in UserLogins collection
  const logUserLogin = async (currentUser) => {
    try {
      const res = await databases.createDocument(
        import.meta.env.VITE_APPWRITE_BOOKING_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_USERLOGINS_COLLECTION_ID,
        ID.unique(),
        {
          userId: currentUser.$id,
          email: currentUser.email,
          loginTime: new Date().toISOString(),
        }
      );
      console.log("✅ User login recorded:", res);
    } catch (err) {
      console.error("❌ Failed to record login:", err);
    }
  };

  // ✅ Fetch role from Users collection
  const fetchUserRole = async (currentUser) => {
    try {
      const res = await databases.listDocuments(
        import.meta.env.VITE_APPWRITE_BOOKING_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID,
        [Query.equal("email", currentUser.email)]
      );

      if (res.documents.length > 0) {
        const userDoc = res.documents[0];
        return userDoc.role || "user"; // default user
      }
      return "user";
    } catch (err) {
      console.error("❌ Failed to fetch role:", err);
      return "user";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // ✅ Logout existing session
      await logoutIfLoggedIn();

      // ✅ Login with email & password
      await account.createEmailPasswordSession(form.email, form.password);

      // ✅ Fetch current user
      const currentUser = await account.get();

      // ✅ Generate JWT for secure API calls
      const jwt = await account.createJWT();
      localStorage.setItem("authToken", jwt.jwt); // 👈 save token in localStorage
      console.log("✅ JWT stored:", jwt.jwt);

      // ✅ Fetch role from Users collection
      const role = await fetchUserRole(currentUser);

      // ✅ Update context
      setUser(currentUser);
      setRole(role);

      // ✅ Record login in Appwrite
      await logUserLogin(currentUser);

      toast.success("✅ Login successful!", { position: "top-right", autoClose: 3000 });

      // ✅ Redirect based on role
      if (role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err) {
      console.error("Login error:", err);

      if (err.code === 401) {
        setError("⚠️ Session already active or invalid credentials.");
        toast.error("⚠️ Session already active or invalid credentials.", {
          position: "top-right",
          autoClose: 4000,
        });
      } else {
        setError(err?.message || "Login failed. Please check your credentials.");
        toast.error(err?.message || "Login failed. Please check your credentials.", {
          position: "top-right",
          autoClose: 4000,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  // ✅ Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="relative min-h-[80vh] bg-black flex items-center justify-center sm:pt-16">
      <ToastContainer />
      {/* Close Button */}
      <div className="flex justify-end items-center px-4 sm:px-6">
        <button
          onClick={() => navigate("/")}
          className="absolute top-4 right-4 text-white rounded-full p-1 hover:bg-gray-800"
        >
          <X size={30} />
        </button>
      </div>

      {/* Login Form */}
      <div className="bg-white min-h-[80vh] rounded-3xl flex items-center justify-center w-full max-w-md mx-auto p-6 shadow-lg">
        <div className="w-full space-y-6">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Welcome Back!
            </h2>
            <p className="text-sm text-gray-500 mt-2">Login to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-full text-center focus:outline-none focus:ring-2 focus:ring-black"
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-full text-center focus:outline-none focus:ring-2 focus:ring-black"
              required
            />

            {error && <p className="text-red-600 text-center text-sm">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-3 rounded-full hover:bg-gray-900 disabled:opacity-50 transition"
            >
              {loading ? "Logging in..." : "Continue"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

