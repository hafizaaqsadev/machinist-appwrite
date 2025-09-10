// src/Pages/PersonalCare.jsx
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import facial from "../assets/personalCare/facial.svg";
import hairCut from "../assets/personalCare/hairCut.svg";
import makeup from "../assets/personalCare/makeup.svg";
import manipedi from "../assets/personalCare/manipedi.svg";
import hairtreatment from "../assets/personalCare/hairtreatment.svg";
import waxing from "../assets/personalCare/waxing.svg";
import salonpkg from "../assets/personalCare/salonpkg.svg";
import massage from "../assets/personalCare/massage.svg";
import mehndi from "../assets/personalCare/mehndi.svg";
import monthlybeauty from "../assets/personalCare/monthlybeauty.svg";

const services = [
  { id: "facial", name: "Facial", image: facial },
  { id: "hairCut", name: "HairCut", image: hairCut },
  { id: "makeup", name: "Makeup", image: makeup },
  { id: "manipedi", name: "Manipedi", image: manipedi },
  { id: "hairtreatment", name: "Hairtreatment", image: hairtreatment },
  { id: "waxing", name: "Waxing", image: waxing },
  { id: "salon-package", name: "Salon Package", image: salonpkg },
  { id: "massage", name: "Massage", image: massage },
  { id: "mehndi", name: "Mehndi", image: mehndi },
  { id: "monthly-beauty", name: "Monthly Beauty", image: monthlybeauty },
];

// Single Service Card
const ServiceCard = ({ service }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/service-detail", { state: { service } }); // ✅ Pass service info to detail page
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

export default function PersonalCare() {
  return (
    <section className="px-4 sm:px-6 md:px-12 lg:px-20 py-12 space-y-10">
      <motion.h2
        className="text-3xl md:text-4xl font-extrabold text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Personal Care Services
      </motion.h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-6 justify-items-center">
        {services.map((service, idx) => (
          <ServiceCard key={idx} service={service} />
        ))}
      </div>
    </section>
  );
}
