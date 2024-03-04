import { jwtDecode } from "jwt-decode";
import { Outlet, Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const AuthRequiredRoutes = () => {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");
  useEffect(() => {
    if (
      !accessToken ||
      typeof accessToken !== "string" ||
      accessToken.trim() === ""
    ) {
      navigate("/login");
    }
  }, []);

  try {
    const token = jwtDecode(accessToken);
    const user = token.user_id;
    return user ? <Outlet /> : <Navigate to="login" replace="true" />;
  } catch (error) {
    console.error("Invalid token:", error);
  }
};

export default AuthRequiredRoutes;
