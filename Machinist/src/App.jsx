import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header.jsx";
import Footer from "./Components/Footer.jsx";
import Copyright from "./Components/Copyright.jsx";
import Home from "./Pages/Home.jsx";
import Services from "./Pages/Service.jsx";
import Cleaning from "./Pages/Cleaning.jsx";
import PersonalCare from "./Pages/PersonalCare.jsx";
import Info from "./Pages/Info.jsx";
import Areas from "./Pages/Areas.jsx";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";



export default function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/cleaning" element={<Cleaning />} />
        <Route path="/personal-care" element={<PersonalCare />} />
        <Route path="/info" element={<Info />} />
        <Route path="/areas" element={<Areas />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Footer />
      <Copyright />
    </Router>
  );
}