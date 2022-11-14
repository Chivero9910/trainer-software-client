import { useContext, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";
import { signupServiceTrainer } from "../services/auth.services";
import { TextField } from "@mui/material";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function ModalTrainer() {
  const { authenticateUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleNameChange = (e) => setName(e.target.value);
  const handleLastNameChange = (e) => setLastName(e.target.value);
  const handleBirthDateChange = (e) => setBirthDate(e.target.value);
  const handlePhoneNumberChange = (e) => setPhoneNumber(e.target.value);
  const handleBusinessChange = (e) => setBusinessName(e.target.value);

  const handleSignup = async (e) => {
    e.preventDefault();
    const newUser = {
      businessName,
      email,
      password,
      name,
      lastName,
      birthDate,
      phoneNumber
    };

    try {
      const response = await signupServiceTrainer(newUser);
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
    <div>
      <Button onClick={handleOpen}>Entrenadores</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            <h2>Regístrate</h2>
            <div>
              <form onSubmit={handleSignup}>
                <TextField
                  id="outlined-basic"
                  margin="normal"
                  size="small"
                  type="text"
                  label="Nombre de tu negocio"
                  variant="outlined"
                  value={businessName}
                  onChange={handleBusinessChange}
                />

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

                <TextField
                  id="outlined-basic"
                  margin="normal"
                  size="small"
                  type="text"
                  label="Tu nombre"
                  variant="outlined"
                  value={name}
                  onChange={handleNameChange}
                />

                <TextField
                  id="outlined-basic"
                  margin="normal"
                  size="small"
                  type="text"
                  label="Tus apellidos"
                  variant="outlined"
                  value={lastName}
                  onChange={handleLastNameChange}
                />

                <TextField
                  id="outlined-basic"
                  margin="normal"
                  size="small"
                  type="date"
                  variant="outlined"
                  value={birthDate}
                  onChange={handleBirthDateChange}
                />

                <TextField
                  id="outlined-basic"
                  margin="normal"
                  size="small"
                  type="tel"
                  label="Tu teléfono"
                  variant="outlined"
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                />

                <Button type="submit" variant="contained">
                  Regístrate
                </Button>

                {errorMessage !== "" && <p>{errorMessage}</p>}
              </form>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default ModalTrainer;
