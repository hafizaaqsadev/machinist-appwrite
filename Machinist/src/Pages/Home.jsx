import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import bannerImage from "../assets/BannerImg.svg";

export default function Home() {
  return (
    <div className="bg-white text-gray-800">
      {/* Hero Section */}
      <section className="bg-hero-gradient text-white py-20 md:py-28 px-4 sm:px-6 lg:px-20">
        <div className="flex justify-between items-center px-4 sm:px-6 lg:px-2 flex-col-reverse md:flex-row items-center gap-10">
          {/* Left text content */}
          <div className="w-full md:w-1/2 text-center md:text-left">
            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Market Competitive Prices
            </motion.h1>
            <motion.p
              className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto md:mx-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Affordable, reliable, and quickest home services in Lahore.
              Verified and trained professionals.
            </motion.p>
          </div>

          {/* Right side image */}
          <motion.div
            className="w-full md:w-1/2 flex justify-center md:justify-end"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <img
              src={bannerImage}
              alt="Banner"
              className="w-72 sm:w-80 md:w-[350px] lg:w-[400px]"
            />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10 px-4 sm:px-6 lg:px-20 py-14">
        {[
          {
            title: "AC Services",
            desc: "Reliable cooling solutions for your comfort.",
          },
          {
            title: "Electrician",
            desc: "Expert electrical fixes without hassle.",
          },
          {
            title: "Plumber",
            desc: "Get pipes fixed and leaks sealed quickly.",
          },
          {
            title: "Home Cleaning",
            desc: "Fresh and hygienic homes at your convenience.",
          },
        ].map((feature, idx) => (
          <motion.div
            key={idx}
            className="bg-blue-100 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-lg sm:text-xl font-semibold text-blue-800 mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-700 text-sm sm:text-base">{feature.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* Call to Action */}
      <motion.section
        className="bg-machinistBlue text-white text-center py-14 px-4 sm:px-6 lg:px-20"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
          Book Your Service Now!
        </h2>
        <p className="mb-6 text-sm sm:text-base">
          Safe, reliable, and affordable home maintenance at your fingertips.
        </p>
        <Link
          to="/services"
          className="inline-block bg-white text-blue-800 px-6 py-2 rounded-full font-semibold hover:bg-blue-100 transition"
        >
          View All Services
        </Link>
      </motion.section>
    </div>
  );
}
