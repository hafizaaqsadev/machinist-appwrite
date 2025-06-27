import { motion } from "framer-motion";

import facial from "../assets/personalCare/facial.svg";
// import hairCut from "../assets/personalCare/haircut.svg";
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
  { name: "Facial", image: facial },
  { name: "HairCut", image: hairCut },
  { name: "Makeup", image: makeup },
  { name: "Manipedi", image: manipedi },
  { name: "Hairtreatment", image: hairtreatment },
  { name: "Waxing", image: waxing },
  { name: "Salon Package", image: salonpkg },
  { name: "Massage", image: massage },
  { name: "Mehndi", image: mehndi },
  { name: "Monthly Beauty", image: monthlybeauty },
];

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
