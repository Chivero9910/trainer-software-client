import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Clients from "./pages/Clients";
import ClientsDetails from "./pages/ClientsPlan";
import Exercises from "./pages/Exercises";
import Profile from "./pages/Profile";
import Plan from "./pages/Plan";
import Metrics from "./pages/Metrics";
import IsPrivate from "./components/IsPrivate";
import IsTrainer from "./components/IsTrainer";
import IsUser from "./components/IsUser";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/clients" element={<IsPrivate> <IsTrainer> <Clients /> </IsTrainer> </IsPrivate> } />
        <Route path="/clients/:clientId/planificacion" element={<IsPrivate> <IsTrainer> <ClientsDetails /> </IsTrainer> </IsPrivate> } />
        <Route path="/ejercicios" element={<IsPrivate>  <IsTrainer> <Exercises /> </IsTrainer></IsPrivate>} />
        <Route path="/perfil" element={<IsPrivate>  <Profile /> </IsPrivate>} />
        <Route path="planificacion" element={<IsPrivate> <Plan /> </IsPrivate>} />
        <Route path="metricas" element={<IsPrivate> <Metrics /> </IsPrivate>} />
      </Routes>
    </div>
  );
}

export default App;
