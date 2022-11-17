import { Button, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import NavbarTrainer from "../components/NavbarTrainer"
import { signupServiceClient } from "../services/auth.services";
import { profileDetailsService, trainerListService, updateServiceClient } from "../services/profile.services";

function Profile() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [list, setList] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("female")

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleNameChange = (e) => setName(e.target.value);
  const handleLastNameChange = (e) => setLastName(e.target.value);
  const handleBirthDateChange = (e) => setBirthDate(e.target.value);
  const handlePhoneNumberChange = (e) => setPhoneNumber(e.target.value);
  const handleGenderChange = (e) => setGender(e.target.value)

  useEffect(()=> {
    getData()
  }, [])

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const updateUser = {
      email,
      password,
      name,
      lastName,
      birthDate,
      phoneNumber,
      gender

    };

    try {
      const response = await updateServiceClient(updateUser);
      localStorage.setItem("authToken", response.data.authToken);
      Navigate("/profile");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage);
      } else {
        Navigate("/error");
      }
    }
  };

  const getData = async () => {
    try {
      const response = await profileDetailsService();
      setEmail(response.data.email);
      setName(response.data.name);
      setLastName(response.data.lastName)
      setBirthDate(response.data.birthDate)
      setPhoneNumber(response.data.phoneNumber)
      setGender(response.data.gender)

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
        <NavbarTrainer />
        <form onSubmit={handleUpdateProfile}>
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
                <Button type="submit" variant="contained">
                  Guardar tu perfil
                </Button>

                
        </form>
    </div>
  )
}

export default Profile