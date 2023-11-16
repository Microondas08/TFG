import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const AddEmotionalEntry = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [emotion, setEmotion] = useState("");

  if (!isAuthenticated) {
    navigate("/login");
    return null;
  }

  const handleSubmit = () => {
    // Aquí guardarías la entrada en tu base de datos o el medio que elijas
    console.log("Estado emocional añadido:", emotion);
    navigate("/"); // Redirigir al usuario a la página principal o donde prefieras
  };

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundColor: "#f9f4f5",
    },
    input: {
      padding: "10px",
      marginBottom: "20px",
      borderRadius: "15px",
      backgroundColor: "#ADE0E4",
      outline: "none",
      width: "80%",
    },
    button: {
      padding: "10px 20px",
      borderRadius: "15px",
      backgroundColor: "#d3b6c8",
      color: "white",
      cursor: "pointer",
      transition: "background-color 0.3s",
    },
  };

  return (
    <div style={styles.container}>
      <h2>¿Cómo te sientes hoy?</h2>
      <textarea
        placeholder="Describe tus emociones..."
        style={styles.input}
        value={emotion}
        onChange={(e) => setEmotion(e.target.value)}
        rows={5}
      />
      <button style={styles.button} onClick={handleSubmit}>
        Añadir
      </button>
    </div>
  );
};

export default AddEmotionalEntry;
