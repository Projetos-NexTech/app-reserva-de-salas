import { BrowserRouter, Routes, Route } from "react-router-dom";
import "/src/styles/App.css";
import Login from "./pages/login.jsx";
import Cadastro from "./pages/cadastro.jsx";
import Redefinir_senha from "./pages/redefinir-senha.jsx";
import Reservar_sala from "./pages/reservar-sala.jsx";
import Perfil from "./pages/perfil.jsx";
import Home from "./pages/home.jsx";
import Salas from "./pages/salas.jsx";
import Minhas_reservas from "./pages/minhas-reservas.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/redefinir-senha" element={<Redefinir_senha />} />
        <Route path="/reservar-sala" element={<Reservar_sala />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/home" element={<Home />} />
        <Route path="/salas" element={<Salas />}/>
        <Route path="/minhas-reservas" element={<Minhas_reservas />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
