// import React from "react";
import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";

const ContactUs = () => {
  return (
    <section className="bg-gradient-to-br from-white to-blue-50 py-20 px-6 md:px-16 text-gray-800">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center"
      >
        {/* Left Section: Info & Icons */}
        <div>
          <h2 className="text-4xl font-extrabold text-blue-700 mb-6">
            Let’s Connect!
          </h2>
          <p className="text-gray-700 mb-6">
            Have questions, feedback, or opportunities? Feel free to reach out —
            I’d love to hear from you.
          </p>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <FaPhoneAlt className="text-green-600" />
              <span className="text-gray-800 text-lg">+91 6205001632</span>
            </div>
            <div className="flex items-center gap-4">
              <FaEnvelope className="text-blue-600" />
              <span className="text-gray-800 text-lg">bm0655868@gmail.com</span>
            </div>
            <div className="flex items-center gap-4">
              <FaMapMarkerAlt className="text-red-500" />
              <span className="text-gray-800 text-lg">
                Dhanbad, Jharkhand India
              </span>
            </div>

            {/* Social Links */}
            <div className="flex gap-6 mt-6">
              <a
                href="https://linkedin.com/in/your-linkedin"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 hover:text-blue-900 text-2xl"
              >
                <FaLinkedin size={39} />
              </a>
              <a
                href="https://github.com/your-github"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-800 hover:text-black text-2xl"
              >
                <FaGithub size={39} />
              </a>
            </div>
          </div>
        </div>

        {/* Right Section: Form */}
        <motion.form
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="bg-white shadow-xl rounded-2xl p-8 space-y-6 border-t-4 border-blue-600"
        >
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Message</label>
            <textarea
              rows="4"
              placeholder="Write your message..."
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-md transition"
          >
            Send Message
          </button>
        </motion.form>
      </motion.div>
    </section>
  );
};

export default ContactUs;
