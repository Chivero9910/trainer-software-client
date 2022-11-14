import { Button, TextField } from "@mui/material";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import ModalClient from "../components/ModalClient";
import ModalTrainer from "../components/ModalTrainer";
import { AuthContext } from "../context/auth.context";
import { loginService } from "../services/auth.services";

function Home() {
  const { authenticateUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleLogin = async (e) => {
    e.preventDefault();

    const userCredentials = {
      email: email,
      password: password,
    };

    try {
      const response = await loginService(userCredentials);

      localStorage.setItem("authToken", response.data.authToken);
      authenticateUser();
      navigate("/profile");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage);
      } else {
        navigate("/error");
      }
    }
  };

  return (
    <div id="home-main-container">
      <div id="home-container-izq">
        <h1>Texto</h1>
      </div>

      <div id="home-container-der">
        <div id="home-modals-button">
          <p>¿Aún no estás registrado?</p>
          <div>
            <ModalClient />
          </div>
          <div>
            <ModalTrainer />
          </div>
        </div>
        <div id="home-form-signin">
          <h2>Inicia sesión</h2>
          <h3>
            Ahora entrenar, <span>cuesta menos 🚀</span>
          </h3>
          <form onSubmit={handleLogin}>
            <TextField
              id="outlined-basic"
              margin="normal"
              size="small"
              type="email"
              label="Email"
              variant="outlined"
              value={email}
              onChange={handleEmailChange}
            />
            <TextField
              id="outlined-basic"
              margin="normal"
              size="small"
              type="password"
              label="Contraseña"
              variant="outlined"
              value={password}
              onChange={handlePasswordChange}
            />

            <Button type="submit" variant="contained">
              Iniciar sesión
            </Button>

            {errorMessage !== "" && <p>{errorMessage}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Home;
