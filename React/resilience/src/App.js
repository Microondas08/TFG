import { BrowserRouter, Route, Routes } from "react-router-dom";
import Add from "./components/Add";
import Analisis from "./components/Analisis";
import { AuthProvider } from "./components/AuthContext";
import Calendario from "./components/Calendario";
import Contenido from "./components/Contenido";
import Home from "./components/Home";
import Layout from "./components/Layout";
import Login from "./components/Login";
import Register from "./components/Register";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="Calendario" element={<Calendario />} />
            <Route path="Add" element={<Add />} />
            <Route path="Analisis" element={<Analisis />} />
            <Route path="Contenido" element={<Contenido />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
