import { Navigate,useLocation} from "react-router-dom";
import React from "react";
import { jwtDecode } from "jwt-decode";
const ProtectedRoute = function ({ role, pageToReturn }) {
  const location = useLocation();
  let token = sessionStorage.getItem("token");
  const name=location.state?.name || "";
  
  if (!token) {
    return <Navigate to="/login" state={{ from: location.pathname ,name:name}} replace />;
  }
  const decodedJWT = jwtDecode(token);
  if (role=="admin" && decodedJWT.role=="user") return <Navigate to="/unauthorized" replace />;
  return pageToReturn;
};

export default ProtectedRoute;
