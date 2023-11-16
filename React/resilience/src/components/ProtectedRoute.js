import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext"; // Asegúrate de que la ruta es correcta

function ProtectedRoute({ children }) {
  let { isAuthenticated } = useAuth();
  let navigate = useNavigate();

  if (!isAuthenticated) {
    navigate("/login");
    return null;
  }

  return children;
}

export default ProtectedRoute;
