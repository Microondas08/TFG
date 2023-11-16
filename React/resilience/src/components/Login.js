import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate(); // Mueve la llamada a useNavigate aquí

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/users");
      const data = await response.json();

      const user = data.data.find(
        (u) => u.email === email && u.password === password
      );

      if (user) {
        login(user);
        navigate("/");
        window.alert("Inicio de sesión exitoso!"); // Mensaje de éxito con alert
        // Ahora puedes usar navigate aquí sin problemas
      } else {
        // Manejar error (mostrar mensaje, etc.)
        window.alert("Credenciales inválidas"); // Mensaje de error con alert
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      window.alert("Error al iniciar sesión. Inténtalo de nuevo."); // Mensaje de error con alert

      // Manejar error (mostrar mensaje, etc.)
    }
  };
  const styles = {
    mainContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundImage: "url(/background.jpg)",
      backgroundSize: "cover",  // Color pastel de fondo
    },
    container: {
      fontFamily: "Arial, sans-serif",
      backgroundColor: "#f9f4f5",
      padding: "30px",
      borderRadius: "20px",
      boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.1)",
      width: "300px",
      margin: "auto",
    },
    input: {
      width: "100%",
      padding: "10px",
      marginBottom: "10px",
      border: "none",
      borderRadius: "15px",
      backgroundColor: "#ADE0E4",
      outline: "none",
    },
    button: {
      width: "100%",
      padding: "10px",
      border: "none",
      borderRadius: "15px",
      backgroundColor: "#d3b6c8",
      color: "white",
      cursor: "pointer",
      transition: "background-color 0.3s",
    },
  };

  return (
    <div style={styles.mainContainer}>
      <div style={styles.container}>
        <h2>Iniciar sesión</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            style={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Contraseña"
            style={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button style={styles.button} type="submit">
            Iniciar sesión
          </button>

          <button
            style={{
              ...styles.button,
              marginTop: "10px",
              backgroundColor: "#a8b6bf",
            }}
            onClick={() => navigate("/register")}
          >
            Registrar
          </button>
        </form>
      </div>
    </div>
  );

}

export default Login;