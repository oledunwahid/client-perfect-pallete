import { Navigate, useLocation } from "react-router-dom";
import { isTokenValid } from "./auth";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const token = localStorage.getItem("token");

  if (!isTokenValid(token)) {
    if (location.pathname.startsWith("/admin")) {
      return <Navigate to="/admin/login" />;
    }
    return <Navigate to="/login" />;
  }

  if (
    location.pathname === "/admin/login" &&
    location.pathname.startsWith("/admin")
  ) {
    return <Navigate to="/admin/dashboard" />;
  }

  if (
    location.pathname === "/login" &&
    !location.pathname.startsWith("/admin")
  ) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;
