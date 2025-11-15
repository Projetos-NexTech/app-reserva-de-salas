import { BrowserRouter, Routes, Route } from "react-router-dom";
import "/src/styles/App.css";
import Login from "./pages/login.jsx";
import Cadastro from "./pages/cadastro.jsx";
import Redefinir_senha from "./pages/redefinir-senha.jsx";
import Home from "./pages/home.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/redefinir-senha" element={<Redefinir_senha />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
