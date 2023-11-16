import React from "react";
import { Link } from "react-router-dom";

export const BottomNavigationBar = () => {
  return (
    <ul id="bottomList">
      <li>
        <Link to="/user">
          <img src="./ciclo.png" alt="User" style={{ width: 30 }} />
        </Link>
      </li>
      <li>
        <Link to="/seccion2">
          <img src="./calendario.png" alt="Calendario" style={{ width: 30 }} />
        </Link>
      </li>
      <li>
        <Link to="/seccion3">
          <img src="./mas.png" alt="Más" style={{ width: 30 }} />
        </Link>
      </li>
      <li>
        <Link to="/seccion4">
          <img src="./analisis.png" alt="Análisis" style={{ width: 30 }} />
        </Link>
      </li>
      <li>
        <Link to="/seccion5">
          <img src="./contenido.png" alt="Contenido" style={{ width: 30 }} />
        </Link>
      </li>
    </ul>
  );
};
