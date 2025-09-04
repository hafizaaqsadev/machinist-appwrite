// src/Pages/Cleaning.jsx
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import carWash from "../assets/cleaning/carWash.svg";
import curtain from "../assets/cleaning/curtain.svg";
import sofa from "../assets/cleaning/sofa.svg";
import mattress from "../assets/cleaning/mattress.svg";
import carpet from "../assets/cleaning/carpet.svg";
import commercialDeep from "../assets/cleaning/commercialDeep.svg";
import carDetailing from "../assets/cleaning/carDetailing.svg";
import solarPanel from "../assets/cleaning/solarPanel.svg";
import cementTank from "../assets/cleaning/cementTank.svg";
import plasticTank from "../assets/cleaning/plasticTank.svg";
import chair from "../assets/cleaning/chair.svg";
import deepClean from "../assets/cleaning/deepClean.svg";

const services = [
  { id: "car-wash", name: "Car Wash Services", image: carWash },
  { id: "curtain", name: "Curtain Cleaning Services", image: curtain },
  { id: "sofa", name: "Sofa Cleaning Services", image: sofa },
  { id: "mattress", name: "Mattress Cleaning Services", image: mattress },
  { id: "carpet", name: "Carpet Cleaning Services", image: carpet },
  { id: "commercial-deep", name: "Commercial Deep Cleaning", image: commercialDeep },
  { id: "car-detailing", name: "Car Detailing Services", image: carDetailing },
  { id: "solar-panel", name: "Solar Panel Cleaning Services", image: solarPanel },
  { id: "cement-tank", name: "Cement Water Tank Cleaning", image: cementTank },
  { id: "plastic-tank", name: "Plastic Water Tank Cleaning", image: plasticTank },
  { id: "chair", name: "Chair Cleaning Services", image: chair },
  { id: "deep-clean", name: "Deep Cleaning Services", image: deepClean },
];

// Single Service Card
const ServiceCard = ({ service }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/service-detail", { state: { service } }); // ✅ pass service info
  };

  return (
    <motion.div
      className="p-4 rounded-xl hover:shadow-xl transition-shadow bg-white w-full max-w-[180px] cursor-pointer"
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

export default function Cleaning() {
  return (
    <section className="px-4 sm:px-6 md:px-12 lg:px-20 py-12 space-y-10">
      <motion.h2
        className="text-3xl md:text-4xl font-extrabold text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Cleaning Services in Lahore
      </motion.h2>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
        {services.map((service, idx) => (
          <ServiceCard key={idx} service={service} />
        ))}
      </div>
    </section>
  );
}
