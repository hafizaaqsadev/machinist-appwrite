// src/Pages/Services.jsx
import { motion } from "framer-motion";
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
  { name: "AC", image: ac },
  { name: "Carpenter", image: carpenter },
  { name: "Electrician", image: electrician },
  { name: "Geyser", image: geyser },
  { name: "Handyman", image: handyman },
  { name: "Home Repair", image: applianceRepair },
  { name: "Inspection", image: houseInspection },
  { name: "Painter", image: painter },
  { name: "Pest Control", image: pestControl },
  { name: "Plumber", image: plumber },
];

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

      {/* Responsive Grid of Services */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-6 justify-items-center">
        {services.map((service, idx) => (
          <motion.div
            key={idx}
            className="p-4 rounded-xl hover:shadow-xl transition-shadow bg-white w-full max-w-[160px] sm:max-w-none"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: idx * 0.08 }}
          >
            <img src={service.image} alt={service.name} className="h-20 mx-auto mb-3" />
            <p className="text-center font-medium text-gray-700">{service.name}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
