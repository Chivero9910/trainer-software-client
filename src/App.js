import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Clients from "./pages/Clients";
import ClientsDetails from "./pages/ClientsPlan";
import Exercises from "./pages/Exercises";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/clients/:clientId/planificacion" element={<ClientsDetails />} />
        <Route path="/ejercicios" element={<Exercises />} />
      </Routes>
    </div>
  );
}

export default App;
