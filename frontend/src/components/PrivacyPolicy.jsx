// import React from "react";
import { motion } from "framer-motion";
import { FaShieldAlt } from "react-icons/fa";

const policies = [
  {
    title: "Data Collection",
    description:
      "We collect personal information such as your name, email address, and resume details to enhance your job-seeking experience.",
  },
  {
    title: "Use of Information",
    description:
      "Your information is used solely to provide services, improve user experience, and communicate relevant job updates.",
  },
  {
    title: "Cookies",
    description:
      "We use cookies to track website usage, personalize content, and improve site functionality. You can disable cookies through your browser settings.",
  },
  {
    title: "Data Sharing",
    description:
      "We do not sell or share your personal data with third-party services, except as necessary to operate and improve JobSpot.",
  },
  {
    title: "Security",
    description:
      "We implement advanced security measures to protect your personal information from unauthorized access.",
  },
  {
    title: "Your Rights",
    description:
      "You have the right to access, edit, or delete your personal data at any time by contacting our support team.",
  },
];

const PrivacyPolicy = () => {
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
          Privacy Policy
        </h2>
        <p className="text-center text-gray-600 text-lg mb-12">
          Your data privacy and protection is our top priority.
        </p>

        <div className="space-y-8">
          {policies.map((policy, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg border-l-4 border-blue-600"
            >
              <div className="flex items-start gap-4">
                <FaShieldAlt className="text-blue-600 mt-1" size={20} />
                <div>
                  <h4 className="text-xl font-semibold mb-2">{policy.title}</h4>
                  <p className="text-gray-700">{policy.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default PrivacyPolicy;
