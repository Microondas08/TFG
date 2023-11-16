import { Link, Outlet } from "react-router-dom";
import '../App.css';

const Layout = () => {
  return (
    <>
      <nav>
        <ul id="bottomList">
          <li>
            <Link to="/">
              <img src="./ciclo.png" alt="User" style={{ width: 30 }} />
            </Link>
          </li>
          <li>
            <Link to="/Calendario">
              <img
                src="./calendario.png"
                alt="Calendario"
                style={{ width: 30 }}
              />
            </Link>
          </li>
          <li>
            <Link to="/Add">
              <img src="./mas.png" alt="Add" style={{ width: 30 }} />
            </Link>
          </li>
          <li>
            <Link to="/Analisis">
              <img src="./analisis.png" alt="Analisis" style={{ width: 30 }} />
            </Link>
          </li>
          <li>
            <Link to="/Contenido">
              <img
                src="./contenido.png"
                alt="contenido"
                style={{ width: 30 }}
              />
            </Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
};

export default Layout;
