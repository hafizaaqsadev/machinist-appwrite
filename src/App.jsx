// // src/App.jsx
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import Header from "./Components/Header.jsx";
// import Footer from "./Components/Footer.jsx";
// import Copyright from "./Components/Copyright.jsx";

// import Home from "./Pages/Home.jsx";
// import Services from "./Pages/Service.jsx";
// import Cleaning from "./Pages/Cleaning.jsx";
// import PersonalCare from "./Pages/PersonalCare.jsx";
// import Info from "./Pages/Info.jsx";
// import Areas from "./Pages/Areas.jsx";
// import Login from "./Pages/Login.jsx";
// import Signup from "./Pages/Signup.jsx";
// import ServiceDetails from "./Pages/ServiceDetails.jsx"; 
// import Checkout from "./Pages/Checkout.jsx";
// import Profile from "./Pages/Profile.jsx";

// import { useAuth } from "./context/AuthContext.jsx"; 

// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// export default function App() {
//   const { user } = useAuth();

//   return (
//     <Router>
//       <Header />

//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/services" element={<Services />} />
//         <Route path="/cleaning" element={<Cleaning />} />
//         <Route path="/personal-care" element={<PersonalCare />} />
//         <Route path="/info" element={<Info />} />
//         <Route path="/areas" element={<Areas />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/service-detail" element={<ServiceDetails />} /> 
//         <Route path="/checkout" element={<Checkout />} />

//         {/* Profile route: redirect to login if not logged in */}
//         <Route
//           path="/profile"
//           element={user ? <Profile /> : <Navigate to="/login" replace />}
//         />

//         {/* Optional: redirect /dashboard to /profile */}
//         <Route path="/dashboard" element={<Navigate to="/profile" replace />} />
//       </Routes>

//       <Footer />
//       <Copyright />

//       <ToastContainer
//         position="top-right"
//         autoClose={5000}
//         hideProgressBar={false}
//         newestOnTop={true}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//       />
//     </Router>
//   );
// }



import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Header from "./Components/Header.jsx";
import Footer from "./Components/Footer.jsx";
import Copyright from "./Components/Copyright.jsx";

import Home from "./Pages/Home.jsx";
import Services from "./Pages/Service.jsx";
import Cleaning from "./Pages/Cleaning.jsx";
import PersonalCare from "./Pages/PersonalCare.jsx";
import Info from "./Pages/Info.jsx";
import Areas from "./Pages/Areas.jsx";
import Login from "./Pages/Login.jsx";
import Signup from "./Pages/Signup.jsx";
import ServiceDetails from "./Pages/ServiceDetails.jsx"; 
import Checkout from "./Pages/Checkout.jsx";
import Profile from "./Pages/Profile.jsx";
import AdminLogin from "./Pages/AdminLogin.jsx";
import AdminDashboard from "./Pages/AdminDashboard.jsx";

import { useAuth } from "./context/AuthContext.jsx"; 
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  const location = useLocation();
  const { user, role } = useAuth();

  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && <Header />}

      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/cleaning" element={<Cleaning />} />
        <Route path="/personal-care" element={<PersonalCare />} />
        <Route path="/info" element={<Info />} />
        <Route path="/areas" element={<Areas />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/service-detail" element={<ServiceDetails />} /> 
        <Route path="/checkout" element={<Checkout />} />

        {/* Normal User Profile */}
        <Route
          path="/profile"
          element={user && role === "user" ? <Profile /> : <Navigate to="/login" replace />}
        />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={user && role === "admin" ? <AdminDashboard /> : <Navigate to="/admin" replace />}
        />
      </Routes>

      {!isAdminRoute && <Footer />}
      {!isAdminRoute && <Copyright />}

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}
