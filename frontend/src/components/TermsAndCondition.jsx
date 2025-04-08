// import React from "react";
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";

const terms = [
  {
    title: "Acceptance of Terms",
    description:
      "By accessing and using JobSpot, you accept and agree to be bound by the terms and provision of this agreement.",
  },
  {
    title: "User Responsibilities",
    description:
      "You are responsible for maintaining the confidentiality of your login credentials and for all activities under your account.",
  },
  {
    title: "Data Privacy",
    description:
      "We respect your privacy. Your data is collected and used only as outlined in our Privacy Policy.",
  },
  {
    title: "Service Usage",
    description:
      "You agree not to misuse our services or help anyone else to do so.",
  },
  {
    title: "Modifications",
    description:
      "We reserve the right to update or modify these terms at any time without prior notice.",
  },
  {
    title: "Termination",
    description:
      "JobSpot holds the right to terminate accounts that violate our terms without prior notice.",
  },
];

const TermsAndConditions = () => {
  return (
    <section className="bg-gradient-to-br from-white to-blue-50 py-20 px-6 md:px-16 text-gray-800">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="max-w-5xl mx-auto"
      >
        <h2 className="text-4xl font-extrabold text-blue-700 text-center mb-4">
          Terms & Conditions
        </h2>
        <p className="text-center text-gray-600 text-lg mb-12">
          Please read our terms and conditions carefully before using JobSpot.
        </p>

        <div className="space-y-8">
          {terms.map((term, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg border-l-4 border-blue-600"
            >
              <div className="flex items-start gap-4">
                <FaCheckCircle className="text-blue-600 mt-1" size={20} />
                <div>
                  <h4 className="text-xl font-semibold mb-2">{term.title}</h4>
                  <p className="text-gray-700">{term.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default TermsAndConditions;
