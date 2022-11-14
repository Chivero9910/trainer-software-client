import { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";
import { signupServiceClient } from "../services/auth.services";
import { trainerListService } from "../services/profile.services";
import TextField from "@mui/material/TextField";
import { FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";

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

function ModalClient() {
  const { authenticateUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [list, setList] = useState([]);
  const [trainerId, setTrainerId] = useState("");
  const [isFetching, setIsFetching] = useState(true);
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("female")

  useEffect(() => {
    getData();
  }, []);

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleTrainerChange = (e) => setTrainerId(e.target.value);
  const handleNameChange = (e) => setName(e.target.value);
  const handleLastNameChange = (e) => setLastName(e.target.value);
  const handleBirthDateChange = (e) => setBirthDate(e.target.value);
  const handlePhoneNumberChange = (e) => setPhoneNumber(e.target.value);
  const handleGenderChange = (e) => setGender(e.target.value)

  const handleSignup = async (e) => {
    e.preventDefault();
    const newUser = {
      email,
      password,
      trainerId,
      name,
      lastName,
      birthDate,
      phoneNumber,
      gender

    };

    try {
      const response = await signupServiceClient(newUser);
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

  const getData = async () => {
    try {
      const response = await trainerListService();
      setList(response.data);
      setIsFetching(false);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (isFetching === true) {
    return <h3>....buscando</h3>;
  }

  return (
    <div>
      <Button onClick={handleOpen}>Clientes</Button>
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

                <FormLabel id="demo-radio-buttons-group-label">
                  Género
                </FormLabel>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  name="radio-buttons-group"
                  onChange={handleGenderChange}
                  defaultValue={gender}
                >
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Mujer"
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Hombre"
                  />
                </RadioGroup>
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
                  type="number"
                  label="Tu teléfono"
                  variant="outlined"
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                />

                <label>Entrenador</label>
                <select name="trainerId">
                  {list.map((eachTrainer) => {
                    return (
                      <option key={eachTrainer._id} value={eachTrainer._id}>
                        {eachTrainer.name} {eachTrainer.lastName}
                      </option>
                    );
                  })}
                </select>

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

export default ModalClient;
