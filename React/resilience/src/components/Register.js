// Register.js

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [userData, setUserData] = useState({
    userName: "",
    nickname: "",
    surname: "",
    password: "",
    email: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        navigate("/login");
        window.alert("Registro exitoso! Ahora puedes iniciar sesión.");
      } else {
        const data = await response.json();
        window.alert(
          data.message || "Error al registrarse. Inténtalo de nuevo."
        );
      }
    } catch (error) {
      console.error("Error al registrarse:", error);
      window.alert("Error al registrarse. Inténtalo de nuevo.");
    }
  };

  // Estilos (reutilizados de Login)
  const styles = {
    mainContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundImage: "url(/background.jpg)",
      backgroundSize: "cover",
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
        <h2>Registrarse</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nombre"
            style={styles.input}
            value={userData.userName}
            onChange={(e) =>
              setUserData({ ...userData, userName: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Apodo"
            style={styles.input}
            value={userData.nickname}
            onChange={(e) =>
              setUserData({ ...userData, nickname: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Apellido"
            style={styles.input}
            value={userData.surname}
            onChange={(e) =>
              setUserData({ ...userData, surname: e.target.value })
            }
          />
          <input
            type="password"
            placeholder="Contraseña"
            style={styles.input}
            value={userData.password}
            onChange={(e) =>
              setUserData({ ...userData, password: e.target.value })
            }
          />
          <input
            type="email"
            placeholder="Email"
            style={styles.input}
            value={userData.email}
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
          />
          <button style={styles.button} type="submit">
            Registrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
