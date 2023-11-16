import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Cell, Legend, Pie, PieChart } from 'recharts';
import { useAuth } from "./AuthContext";

const Home = () => {

  
  let { isAuthenticated, userData } = useAuth();
  let navigate = useNavigate();
  const [showTooltip, setShowTooltip] = useState(false);

  const [healthData, setHealthData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [treatmentStatus, setTreatmentStatus] = useState(null);
  const toggleTooltip = () => {
    setShowTooltip(!showTooltip);
  };

  const showPopup = () => {
    window.alert(
      "Este diagrama de sectores indica que cuando mayor sea la diferencia entre ambos colores, con mayor probabilidad necesitará ayuda"
    );
  };
  

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    } else if (userData && userData.nickname) {
      const fetchData = async () => {
        try {
          // Fetch healthData
          const response = await fetch(
            `http://localhost:8000/health/${userData.nickname}`
          );
          const data = await response.json();
          setHealthData(data);

          // Fetch treatment status after getting healthData
          const treatmentResponse = await fetch(
            `http://127.0.0.1:5000/get_treatment_status/${userData.nickname}`
          );
          const treatmentData = await treatmentResponse.json();
          setTreatmentStatus(treatmentData.need_treatment);
        } catch (err) {
          console.error("Error fetching data:", err);
          setError(err);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [isAuthenticated, navigate, userData]);

  const azuladoTitleStyle = {
    fontSize: "26px",
    fontWeight: "bold",
    marginBottom: "20px",
    textAlign: "center",
    color: "#6699FF", // Un azul suave
  };

  const azuladoTextStyle = {
    fontSize: "18px",
    marginBottom: "10px",
    color: "#99BBFF", // Un azul más claro
  };

  const greetingStyle = {
    color: "#5588EE", // Un azul un poco más oscuro
    fontWeight: "500",
    marginBottom: "15px",
  };

  const azuladoDivStyle = {
    backgroundColor: "#FAF3E0", // Fondo blanco roto un poco oscuro
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 3px 10px rgba(102, 153, 255, 0.2)", // Sombra suave con un tono azul
  };

  const cardStyle = {
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#ffffff",
    maxWidth: "800px",
    margin: "40px auto",
    borderRadius: "15px",
    boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.3)",

    
  };

  const titleStyle = {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
    textAlign: "center",
  };

  const dataStyle = {
    fontSize: "18px",
    marginBottom: "10px",
  };

  const pieData = [
    //PHQ_SCORE
    { name: "", value: healthData?.phq_score || 0 },
    //GAD_SCORE
    { name: "", value: healthData?.gad_score || 0 },
  ];

  const COLORS = ["#8884d8", "#82ca9d"];

  const pieChartContainerStyle = {
    margin: "20px 0", // Establece un margen alrededor del contenedor del gráfico
    display: "flex",
    justifyContent: "center", // Centra el gráfico horizontalmente
  };

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#f7f7f7",
        minHeight: "100vh",
        height: "680px",
        backgroundImage: "url(/background.jpg)",
        backgroundSize: "100% auto",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        opacity: 1,
        width: "auto",
      }}
    >
      <div style={cardStyle}>
        {loading && <p>Cargando datos...</p>}
        {error && (
          <p>
            Ocurrió un error al cargar los datos. Por favor intente nuevamente.
          </p>
        )}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        ></div>
        {userData && (
          <div>
            <h1>&emsp;&emsp;¡Hola, {userData.userName}!</h1>
            <h3>
              Aquí tienes un sencillo diagrama de cómo te has sentido en los
              últimos 9 días
            </h3>
          </div>
        )}

        <div style={{ display: "flex", alignItems: "center" }}>
          {healthData && (
            <div style={pieChartContainerStyle}>
              <PieChart width={350} height={350}>
                {/* He reducido un poco el tamaño para que se ajuste mejor */}
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={90} // También reduje el radio exterior para asegurar que el gráfico se ajuste bien
                  fill="#8884d8"
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </div>
          )}

          {treatmentStatus && (
            <p
              style={{
                fontWeight: "bold",
                marginTop: "20px",
                whiteSpace: "pre-line", // Esta propiedad permite respetar los saltos de línea
                marginLeft: "20px", // Agrega margen izquierdo para separar los elementos
              }}
            >
              {treatmentStatus.replace(/\\n/g, "\n")}{" "}
              {/* Reemplaza "\\n" con "\n" */}
            </p>
          )}

            <button onClick={showPopup}>
              <img
                src="interrogacion.png"
                alt="Interrogación"
                width="20"
                height="20"
              />
            </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
