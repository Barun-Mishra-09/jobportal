import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((store) => store.auth);

  // Agar user login nahi hai toh login page pe bhej do
  if (!user || !user._id) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
