import { motion } from "framer-motion";

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
  { name: "Car Wash Services", icon: carWash },
  { name: "Curtain Cleaning Services", icon: curtain },
  { name: "Sofa Cleaning Services", icon: sofa },
  { name: "Mattress Cleaning Services", icon: mattress },
  { name: "Carpet Cleaning Services", icon: carpet },
    { name: "Commercial Deep Cleaning", icon: commercialDeep },
  { name: "Car Detailing Services", icon: carDetailing },
  { name: "Solar Panel Cleaning Services", icon: solarPanel },
  { name: "Cement Water Tank Cleaning", icon: cementTank },
  { name: "Plastic Water Tank Cleaning", icon: plasticTank },
    { name: "Chair Cleaning Services", icon: chair },
  { name: "Deep Cleaning Services", icon: deepClean },
];

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
          <motion.div
            key={idx}
            className="p-4 rounded-xl hover:shadow-xl transition-shadow bg-white w-full max-w-[180px]"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: idx * 0.08 }}
          >
            <img
              src={service.icon}
              alt={service.name}
              className="h-20 mx-auto mb-3"
            />
            <p className="text-center font-medium text-gray-700">{service.name}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
