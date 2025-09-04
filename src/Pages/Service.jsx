// src/Pages/Services.jsx
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import ac from "../assets/service/ac.svg";
import carpenter from "../assets/service/carpenter.svg";
import electrician from "../assets/service/electrician.svg";
import geyser from "../assets/service/geyser.svg";
import handyman from "../assets/service/handyman.svg";
import applianceRepair from "../assets/service/applianceRepair.svg";
import houseInspection from "../assets/service/houseInspection.svg";
import painter from "../assets/service/painter.svg";
import pestControl from "../assets/service/pestControl.svg";
import plumber from "../assets/service/plumber.svg";

const services = [
  { id: "ac", name: "AC", image: ac },
  { id: "carpenter", name: "Carpenter", image: carpenter },
  { id: "electrician", name: "Electrician", image: electrician },
  { id: "geyser", name: "Geyser", image: geyser },
  { id: "handyman", name: "Handyman", image: handyman },
  { id: "home-repair", name: "Home Repair", image: applianceRepair },
  { id: "inspection", name: "Inspection", image: houseInspection },
  { id: "painter", name: "Painter", image: painter },
  { id: "pest-control", name: "Pest Control", image: pestControl },
  { id: "plumber", name: "Plumber", image: plumber },
];

// Single Service Card Component
const ServiceCard = ({ service }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    // Navigate to ServiceDetail page with service data
    navigate("/service-detail", { state: { service } });
  };

  return (
    <motion.div
      className="p-4 rounded-xl hover:shadow-xl transition-shadow bg-white w-full max-w-[160px] sm:max-w-none cursor-pointer"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      onClick={handleClick}
    >
      <img src={service.image} alt={service.name} className="h-20 mx-auto mb-3" />
      <p className="text-center font-medium text-gray-700">{service.name}</p>
    </motion.div>
  );
};

export default function Services() {
  return (
    <section className="px-4 sm:px-6 md:px-12 lg:px-20 py-12 space-y-10">
      <motion.h2
        className="text-3xl md:text-4xl font-extrabold text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Our Popular Services
      </motion.h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-6 justify-items-center">
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </section>
  );
}
