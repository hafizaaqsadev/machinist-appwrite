import { motion } from "framer-motion";

export default function Info() {
  return (
    <section className="px-6 md:px-20 py-12 space-y-10">
      <motion.div
        className="space-y-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-4xl font-extrabold">Market Competitive Prices</h2>
        <p className="text-gray-700 text-lg">
          <strong>Are you looking for home maintenance services in Lahore?</strong> Look no further!
          Machinist Company provides the most affordable, reliable, and quickest services in the city. Our
          prices are market competitive, and there are no hidden charges.
        </p>
        <p className="text-gray-700 text-lg">
          Still, if you want to ensure that you are booking cost-effective services, you are more than welcome to
          cross-check online prices.
        </p>
      </motion.div>

      <motion.div
        className="space-y-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h3 className="text-2xl font-bold">High-quality Service</h3>
        <p className="text-gray-700 text-lg">
          There is no match for Machinist Company in the country when it comes to customer satisfaction and
          reliability. We have trained technicians who know how to get the job done professionally.
        </p>
        <p className="text-gray-700 text-lg">
          Unlike fraudsters, who do more harm than good,
          <strong> we provide the most dependable home repair services in Lahore.</strong> We fix your furniture,
          appliances, and wiring right the first time. No Complaints!!!
        </p>
      </motion.div>

      <motion.div
        className="space-y-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h3 className="text-2xl font-bold">Reliable Safety</h3>
        <p className="text-gray-700 text-lg">
          With us, you will feel safe as we verify our professionals during the registration process. We took this
          measure because, to us, the well-being and safety of your family matter the most.
        </p>
        <p className="text-gray-700 text-lg">
          And we go a step further to provide you with convenience by giving proper training to our technicians.
        </p>
        <p className="text-gray-700 text-lg">
          Now, after the verification and training, you can expect unrivaled responsiveness from our technicians. There
          will be no complaints… just encouraging reviews from our happy clients.
        </p>
      </motion.div>

      <motion.div
        className="space-y-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <h3 className="text-2xl font-bold">Impeccable Customer Service</h3>
        <p className="text-gray-700 text-lg">
          In case there are any complaints we do not leave you struggling, instead,
          <strong>
            our customer support team will resolve the issue with a 7 days warranty.
          </strong>
          Yes, we know it’s the real deal!! With us, you will never have to worry about the skillfulness of our
          technicians or the professionalism of our customer service.
        </p>
        <p className="text-gray-700 text-lg">
          <strong>
            Book Machinist Company's professional home maintenance services in Lahore through our website,
            WhatsApp, app, or just give us a call at
          </strong>{" "}
          <span className="text-machinistBlue font-bold">0309-999-9999</span>.
        </p>
      </motion.div>
    </section>
  );
}