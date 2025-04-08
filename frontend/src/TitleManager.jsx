import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const TitleManager = () => {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;

    if (path === "/login") {
      document.title = "JobSpot - Login on JobSpot";
    } else if (path === "/signup") {
      document.title = "JobSpot- Register on JobSpot";
    } else if (path === "/") {
      document.title = "JobSpot - Discover Your Dream Job Today";
    } else if (path === "/jobs") {
      document.title = "JobSpot – Explore Jobs";
    } else if (path === "/profile") {
      document.title = "JobSpot – Your Profile";
    } else if (path === "/browse") {
      document.title = "JobSpot – Browse Companies";
    } else if (path === "/jobs/save") {
      document.title = "JobSpot – Saved Jobs";
    } else if (path === "/about-us") {
      document.title = "JobSpot – About Us";
    } else if (path === "/terms-conditions") {
      document.title = "JobSpot – Terms & Conditions";
    } else if (path === "/privacy-policy") {
      document.title = "JobSpot – Privacy Policy";
    } else if (path === "/contact-us") {
      document.title = "JobSpot – Contact Us";
    } else if (path.startsWith("/admin")) {
      document.title = "JobSpot – Admin Panel";
    } else {
      document.title = "JobSpot";
    }
  }, [location]);
  return null; // Kyunki yeh sirf document.title set karta hai, kuch render nahi karta
};

export default TitleManager;
