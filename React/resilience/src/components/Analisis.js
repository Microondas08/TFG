import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const Analisis = () => {
  let { isAuthenticated } = useAuth();
  let navigate = useNavigate();

  const [selectedTest, setSelectedTest] = useState(""); // "phq_score" or "gad_score"
  const [score, setScore] = useState(0);

const [responses, setResponses] = useState(Array(9).fill(0)); // puntuaciones iniciales para cada pregunta

const handleOptionChange = (index, value) => {
  const newResponses = [...responses];
  newResponses[index] = value;
  setResponses(newResponses);
};

const [lastScore, setLastScore] = useState(null);


const questions= {
  phq_score: [
    {
      question:
        "¿Con qué frecuencia se ha sentido molesto por algo que alguien dijo sobre usted?",
      options: [
        "Nunca",
        "Varios días",
        "Más de la mitad de los días",
        "Casi todos los días",
      ],
    },
    {
      question:
        "¿Con qué frecuencia ha tenido poco interés o placer en hacer cosas?",
      options: [
        "Nunca",
        "Varios días",
        "Más de la mitad de los días",
        "Casi todos los días",
      ],
    },
    {
      question:
        "¿Con qué frecuencia se ha sentido deprimido, decaído o sin esperanza?",
      options: [
        "Nunca",
        "Varios días",
        "Más de la mitad de los días",
        "Casi todos los días",
      ],
    },
    {
      question:
        "¿Con qué frecuencia ha tenido problemas para conciliar el sueño o ha dormido demasiado?",
      options: [
        "Nunca",
        "Varios días",
        "Más de la mitad de los días",
        "Casi todos los días",
      ],
    },
    {
      question: "¿Con qué frecuencia se ha sentido cansado o con poca energía?",
      options: [
        "Nunca",
        "Varios días",
        "Más de la mitad de los días",
        "Casi todos los días",
      ],
    },
    {
      question:
        "¿Con qué frecuencia ha tenido un apetito pobre o ha comido en exceso?",
      options: [
        "Nunca",
        "Varios días",
        "Más de la mitad de los días",
        "Casi todos los días",
      ],
    },
    {
      question:
        "¿Con qué frecuencia ha sentido que sería mejor estar muerto o ha tenido pensamientos suicidas?",
      options: [
        "Nunca",
        "Varios días",
        "Más de la mitad de los días",
        "Casi todos los días",
      ],
    },
    {
      question:
        "¿Con qué frecuencia ha tenido dificultades para concentrarse en algo, como leer el periódico o ver la televisión?",
      options: [
        "Nunca",
        "Varios días",
        "Más de la mitad de los días",
        "Casi todos los días",
      ],
    },
    {
      question:
        "¿Con qué frecuencia se ha movido o ha hablado tan lentamente que otras personas podrían haberlo notado? ¿O al contrario, ha estado tan inquieto o agitado que se ha movido mucho más de lo habitual?",
      options: [
        "Nunca",
        "Varios días",
        "Más de la mitad de los días",
        "Casi todos los días",
      ],
    },
  ],

  gad_score: [
    {
      question:
        "¿Con qué frecuencia se ha sentido nervioso, ansioso o al límite?",
      options: [
        "Nunca",
        "Varios días",
        "Más de la mitad de los días",
        "Casi todos los días",
      ],
    },
    {
      question:
        "¿Con qué frecuencia no ha podido parar de preocuparse o controlar las preocupaciones?",
      options: [
        "Nunca",
        "Varios días",
        "Más de la mitad de los días",
        "Casi todos los días",
      ],
    },
    {
      question:
        "¿Con qué frecuencia se ha preocupado demasiado por diferentes cosas?",
      options: [
        "Nunca",
        "Varios días",
        "Más de la mitad de los días",
        "Casi todos los días",
      ],
    },
    {
      question: "¿Con qué frecuencia ha tenido problemas para relajarse?",
      options: [
        "Nunca",
        "Varios días",
        "Más de la mitad de los días",
        "Casi todos los días",
      ],
    },
    {
      question:
        "¿Con qué frecuencia ha estado tan inquieto que se ha encontrado difícil quedarse quieto?",
      options: [
        "Nunca",
        "Varios días",
        "Más de la mitad de los días",
        "Casi todos los días",
      ],
    },
    {
      question:
        "¿Con qué frecuencia ha sentido miedo, como si algo terrible pudiera suceder?",
      options: [
        "Nunca",
        "Varios días",
        "Más de la mitad de los días",
        "Casi todos los días",
      ],
    },
    {
      question: "¿Con qué frecuencia se ha sentido irritado o enojado?",
      options: [
        "Nunca",
        "Varios días",
        "Más de la mitad de los días",
        "Casi todos los días",
      ],
    },
    {
      question:
        "¿Con qué frecuencia ha tenido miedo de perder el control o volverse loco?",
      options: [
        "Nunca",
        "Varios días",
        "Más de la mitad de los días",
        "Casi todos los días",
      ],
    },
    {
      question:
        "¿Con qué frecuencia ha tenido sensación de peligro inminente, pánico o catástrofe?",
      options: [
        "Nunca",
        "Varios días",
        "Más de la mitad de los días",
        "Casi todos los días",
      ],
    },
  ],
};





  const submitTest = () => {
    // Aquí puedes calcular el score basado en las respuestas del usuario
    // Por ahora, simplemente lo estamos estableciendo a un valor mock.
    setScore(5);
  };

  if (!isAuthenticated) {
    navigate("/login");
    return null;
  }

  return (
    <div>
      {!selectedTest ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",
            backgroundColor: "#FFFFFF", // Fondo blanco
            borderRadius: "20px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Sombra suave para dar profundidad
            maxWidth: "90%", // Limitamos el ancho para que no ocupe toda la pantalla
            margin: "40px auto", // Centrar el contenedor y añadir espacio en la parte superior e inferior
          }}
        >
          {/* Contenedor para PHQ Score */}
          <div
            style={{
              margin: "0 20px", // Espacio entre imágenes
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div style={{ marginBottom: "10px", fontWeight: "bold" }}>
              Iniciar phq_score
            </div>
            <img
              src="./phq_score.png"
              alt="PHQ Score Test"
              style={{
                cursor: "pointer",
                width: "120px", // Definimos un tamaño específico para controlar su tamaño
                borderRadius: "10px", // Bordes redondeados en las imágenes
              }}
              onClick={() => setSelectedTest("phq_score")}
            />
          </div>

          {/* Contenedor para GAD Score */}
          <div
            style={{
              margin: "0 20px", // Espacio entre imágenes
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div style={{ marginBottom: "10px", fontWeight: "bold" }}>
              Iniciar gadscore
            </div>
            <img
              src="./gad_score.jpg"
              alt="GAD Score Test"
              style={{
                cursor: "pointer",
                width: "120px", // Definimos un tamaño específico para controlar su tamaño
                borderRadius: "10px", // Bordes redondeados en las imágenes
              }}
              onClick={() => setSelectedTest("gad_score")}
            />
          </div>
          {lastScore !== null && (
            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <h3>Último resultado:</h3>
              <p>Puntuación total: {lastScore}</p>
            </div>
          )}
        </div>
      ) : (
        <div>
          <h2>Realizar prueba: {selectedTest}</h2>
          {questions[selectedTest].map((questionData, index) => (
            <div key={index}>
              <p>{questionData.question}</p>
              {questionData.options.map((option, optionIndex) => (
                <label key={optionIndex}>
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value={optionIndex}
                    checked={responses[index] === optionIndex}
                    onChange={() => handleOptionChange(index, optionIndex)}
                  />
                  {option}
                </label>
              ))}
            </div>
          ))}
          <br />
          <button
            onClick={() => {
              const score = responses.reduce((a, b) => a + b, 0);
              setLastScore(score); // Almacenamos el resultado
              setSelectedTest(null); // Regresamos a la pantalla inicial
            }}
          >
            Finalizar prueba
          </button>
          <br /> <br /> <br /> <br /> <br /> <br />
        </div>
      )}
    </div>
  );

};
const styles = {
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
    gridTemplateRows: "1fr 1fr 1fr 1fr 1fr",
    height: "100vh",
  },
  imageContainer: {
    gridColumn: "3 / span 2",
    gridRow: "2",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%", // O puedes ajustar según lo necesites
    height: "auto",
  },
  buttonContainer: {
    gridColumn: "2 / span 3",
    gridRow: "4",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    borderRadius: "5px",
    cursor: "pointer",
    border: "none",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  },
};
export default Analisis;
