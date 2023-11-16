import moment from "moment";
import { default as React, useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";



const Calendario = () => {

  const questions = {
    phq_score: [
      {
        question: "¿Cómo te sientes hoy?",
        options: [
          "Nunca",
          "Varios días",
          "Más de la mitad de los días",
          "Casi todos los días",
        ],
      },
      {
        question: "¿Con qué motivación te encuentras?",
        options: [
          "Nunca",
          "Varios días",
          "Más de la mitad de los días",
          "Casi todos los días",
        ],
      },
      {
        question: "¿Cómo de deprimido te sientes hoy?",
        options: [
          "Nunca",
          "Varios días",
          "Más de la mitad de los días",
          "Casi todos los días",
        ],
      },
      {
        question: "¿Has dormido bien?",
        options: [
          "Nunca",
          "Varios días",
          "Más de la mitad de los días",
          "Casi todos los días",
        ],
      },
      {
        question: "¿Cuánta energía tienes hoy?",
        options: [
          "Nunca",
          "Varios días",
          "Más de la mitad de los días",
          "Casi todos los días",
        ],
      },
      {
        question: "¿Cómo ha ido tu apetito?",
        options: [
          "Nunca",
          "Varios días",
          "Más de la mitad de los días",
          "Casi todos los días",
        ],
      },
      {
        question: "¿Cómo han ido tus ganas de realizar tus obligaciones?",
        options: [
          "Nunca",
          "Varios días",
          "Más de la mitad de los días",
          "Casi todos los días",
        ],
      },
      {
        question: "¿Te has podido concentrar bien hoy?",
        options: [
          "Nunca",
          "Varios días",
          "Más de la mitad de los días",
          "Casi todos los días",
        ],
      },
      {
        question: "¿Cómo te sientes hoy respecto a los demas?",
        options: [
          "Nunca",
          "Varios días",
          "Más de la mitad de los días",
          "Casi todos los días",
        ],
      },
    ],
  };
  const icono1 = "muyfeliz.png";
  const icono2 = "contento.png";
  const icono3 = "descontento.png";
  const icono4 = "triste.png";

  let { isAuthenticated, userData } = useAuth();
  let navigate = useNavigate();

  const [healthData, setHealthData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [treatmentStatus, setTreatmentStatus] = useState(null);

  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
const [selectedEvent, setSelectedEvent] = useState(null);
  const [title, setTitle] = useState("");
  const [mood, setMood] = useState("");
  const [showDetailView, setShowDetailView] = useState(false);
  const [currentQuestions, setCurrentQuestions] = useState(questions.phq_score);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [last9DaysSum, setLast9DaysSum] = useState(0);

  const localizer = momentLocalizer(moment);

  // Componente de evento personalizado para mostrar la pregunta
  const EventComponent = ({ event }) => {
    return <span>{event.question}</span>;
  };

  // Para manejar la autenticación y navegación:
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  // Para cargar desde localStorage y recuperar healthData desde el backend:
  useEffect(() => {
    const savedEvents = localStorage.getItem(
      `calendarState-${userData.nickname}`
    );
    if (savedEvents) {
      setEvents(JSON.parse(savedEvents));
    }

    // Recuperar healthData desde el backend:
    const fetchHealthData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/health/${userData.nickname}`
        );
        if (!response.ok) {
          throw new Error("Error al obtener los datos del usuario");
        }

        const data = await response.json();
        setHealthData(data);
      } catch (error) {
        console.error("Error al recuperar healthData:", error);
      }
    };

    if (userData) {
      fetchHealthData();
    }
  }, [userData]);

  // Para guardar en localStorage:
  useEffect(() => {
    if (events && userData) {
      localStorage.setItem(
        `calendarState-${userData.nickname}`,
        JSON.stringify(events)
      );
    }
  }, [events, userData]);

  // El segundo useEffect que fetchea los eventos puede mantenerse como está.

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`tuURLDeAPI?userId=${userData.id}`); // Asumo que necesitas un ID de usuario o algo similar.
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error("Hubo un error al obtener los eventos:", error);
      }
    };

    if (userData && userData.id) {
      // Asegurándonos de que userData y userData.id están disponibles antes de realizar la solicitud
      fetchEvents();
    }
  }, [userData]);

  

  const handleSelect = ({ start, end }) => {
    setCurrentQuestions(questions.phq_score);
    setCurrentQuestionIndex(0);
    setSelectedDate({ start, end });
    setShowDetailView(true);
  };


  const handleBackToCalendar = () => {
    setShowDetailView(false);
    setSelectedDate(null);
  };

  const handleSaveEvent = (title, mood) => {
    if (title && mood) {
      setEvents([
        ...events,
        {
          start: selectedDate.start,
          end: selectedDate.end,
          title: `${title} - Sentimiento: ${mood}`,
        },
      ]);
    }
    setSelectedDate(null);
  };

  const handleIconClick = async (value) => {
    const currentDate = new Date();
    const questionText = questions.phq_score[currentQuestionIndex].question; // Obtener la pregunta actual

    const newEvent = {
      start: new Date(
        selectedDate.start.setHours(
          currentDate.getHours(),
          currentDate.getMinutes()
        )
      ),
      end: new Date(
        selectedDate.end.setHours(
          currentDate.getHours(),
          currentDate.getMinutes()
        )
      ),
      value: value,
      question: questionText, // Guardar la pregunta en el evento
    };
    setEvents([...events, newEvent]);

    const sum = await getLast9DaysSum();
    setLast9DaysSum(sum);

    // Si hay más preguntas, pasa a la siguiente. De lo contrario, vuelve al calendario.
    if (currentQuestionIndex < questions.phq_score.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleBackToCalendar();
    }
  };


  const getLast9DaysSum = async () => {
    const last9Days = events.slice(-9);
    const sum = last9Days.reduce((acc, event) => acc + event.value, 0);

    console.log(sum); // Esto mostrará la suma total en la consola

    // Actualizar el valor en el backend
    try {
      const currentTimestamp = new Date().toISOString(); // Genera una fecha y hora actuales en formato ISO 8601

      console.log("healthData antes de la actualización:", healthData);

      const updatedData = {
        ...healthData, // Todos los datos actuales
        phq_score: sum, // Actualizamos solo el phq_score
        timestamp: currentTimestamp, // Actualizamos el timestamp con la fecha y hora actuales
      };
      console.log("Datos enviados al backend:", updatedData);

      const response = await fetch(
        `http://localhost:8000/health/${userData.nickname}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        const backendErrorMessage =
          errorData.message || "Error no especificado del backend";
        throw new Error(
          `Error al actualizar el valor en el backend: ${backendErrorMessage}`
        );
      }

      const responseData = await response.json();
      setHealthData(responseData); // Actualizamos el estado con la respuesta del backend
    } catch (error) {
      console.error(error);
    }

    return sum;
  };

  // Añadir un nuevo evento
  const addEvent = (eventData) => {
    setEvents((prevEvents) => [...prevEvents, eventData]);
  };
  
  const deleteEvent = (eventToDelete) => {
    const updatedEvents = events.filter(
      (event) =>
        event.start !== eventToDelete.start || event.value !== eventToDelete.value
    );
    setEvents(updatedEvents);
  };


  return (
    <div style={{ height: "500px" }}>
      {showDetailView ? (
        <div
          style={{
            height: "680px",
            backgroundImage: "url(/background.jpg)",
            backgroundSize: "100% auto",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            opacity: 1,
          }}
        >
          <h3
            style={{ width: "10%", margin: "0 auto", backgroundColor: "White" }}
          >
            {moment(selectedDate.start).format("DD/MM/YYYY")}
          </h3>

          <h1
            style={{ width: "25%", margin: "auto", backgroundColor: "White" }}
          >
            {questions.phq_score[currentQuestionIndex].question}
          </h1>

          <div style={{ width: "25%", margin: "0 auto" }}>
            {questions.phq_score[currentQuestionIndex].options.map(
              (option, index) => {
                let IconSrc = getIconByIndex(index);
                return (
                  <img
                    key={index}
                    src={IconSrc}
                    alt={`Icono ${index + 1}`}
                    style={{
                      cursor: "pointer",
                      margin: "10px",
                      width: "70px",
                      height: "70px",
                    }}
                    onClick={() => handleIconClick(index)}
                  />
                );
              }
            )}
            <br />
          </div>

          <div style={{ width: "40%", marginLeft: "60%" }}>
            {currentQuestionIndex > 0 && (
              <button
                onClick={() =>
                  setCurrentQuestionIndex(currentQuestionIndex - 1)
                }
              >
                Anterior
              </button>
            )}
            {currentQuestionIndex < questions.phq_score.length - 1 && (
              <button
                onClick={() =>
                  setCurrentQuestionIndex(currentQuestionIndex + 1)
                }
              >
                Siguiente
              </button>
            )}

            <button onClick={handleBackToCalendar}>Volver al Calendario</button>
          </div>

          {/* Lista de eventos del día seleccionado con opción para eliminar */}
          <div
            style={{
              width: "30%",
              margin: "0 auto",
              backgroundColor: "#ADE0E4",
              borderRadius: "15px",
              padding: "20px",
              marginTop: "35px",
            }}
          >
            <br />
            <h1 style={{ width: "60%", margin: "auto" }}>Eventos del día</h1>
            <br />
            <ul>
              {events
                .filter((event) =>
                  moment(event.start).isSame(moment(selectedDate.start), "day")
                )
                .map((event, index) => (
                  <li key={index}>
                    {event.question} {/* Muestra la pregunta del evento aquí */}
                    <img
                      src={getIconByIndex(event.value)}
                      alt={`Icono ${event.value + 1}`}
                      style={{
                        width: "20px",
                        height: "20px",
                        marginRight: "5px",
                      }}
                    />
                    <button onClick={() => deleteEvent(event)}>Eliminar</button>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      ) : (
        <Calendar
          selectable
          localizer={localizer}
          defaultView="month"
          scrollToTime={new Date(1970, 1, 1, 6)}
          defaultDate={new Date()}
          onSelectEvent={(event) => {
            setSelectedEvent(event);
            setShowDetailView(true); // Establece el estado de "showDetailView" a "true" para mostrar el detalle del evento.
          }}
          onSelectSlot={handleSelect}
          style={{ height: "100%", width: "100%" }}
          events={events}
        />
      )}
    </div>
  );

  // ...

  // Función que obtiene el icono basado en el índice
  function getIconByIndex(index) {
    switch (index) {
      case 0:
        return icono1;
      case 1:
        return icono2;
      case 2:
        return icono3;
      case 3:
        return icono4;
      default:
        return null; // O un icono predeterminado
    }
  }


};

export default Calendario;
