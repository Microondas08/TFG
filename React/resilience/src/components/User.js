import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

function User() {

  let { isAuthenticated } = useAuth();
  let navigate = useNavigate();

  if (!isAuthenticated) {
    navigate("/login");
    return null;
  }


  return (
    <div>
      <h1>Página de Usuario</h1>
      <p>Bienvenido al perfil del usuario.</p>
    </div>
  );
}

export default User; // Exporta el componente User como default
