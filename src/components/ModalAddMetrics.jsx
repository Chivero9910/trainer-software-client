import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import {createTrainingService} from "../services/exercises.services.js"
import { Navigate, useNavigate } from "react-router-dom";
import { InputAdornment } from "@mui/material";
import { addMetricsService } from "../services/profile.services.js";

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

function ModalAddMetric(props) {

  const navigate = useNavigate()


  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [pesoCorporal, setPesoCorporal] = useState("");
  const [grasaCorporal, setGrasaCorporal] = useState("");
  const [cuello, setCuello] = useState("")
  const [hombros, setHombros] = useState("")
  const [pecho, setPecho] = useState("")
  const [bicepsIzq, setBicepsIzq] = useState("")
  const [bicepsDer, setBicepsDer] = useState("")
  const [anteBrazoIzq, setAnteBrazoIzq] = useState("")
  const [anteBrazoDer, setAnteBrazoDer] = useState("")
  const [cintura, setCintura] = useState("")
  const [cadera, setCadera] = useState("")
  const [musloIzq, setMusloIzq] = useState("")
  const [musloDer, setMusloDer] = useState("")
  const [gemeloIzq, setGemeloIzq] = useState("")
  const [gemeloDer, setGemeloDer] = useState("")



  const handlePesoCorporalChange = (e) => setPesoCorporal(e.target.value);
  const handleGrasaCorporalChange = (e) => setGrasaCorporal(e.target.value);
  const handleCuelloChange = (e) => setCuello(e.target.value);
  const handleHombrosChange = (e) => setHombros(e.target.value);
  const handlePechoChange = (e) => setPecho(e.target.value);
  const handleBicepsIzqChange = (e) => setBicepsIzq(e.target.value);
  const handleBicepsDerChange = (e) => setBicepsDer(e.target.value);
  const handleAnteBrazoIzqChange = (e) => setAnteBrazoIzq(e.target.value);
  const handleAnteBrazoDerChange = (e) => setAnteBrazoDer(e.target.value);
  const handleCinturaChange = (e) => setCintura(e.target.value);
  const handleCaderaChange = (e) => setCadera(e.target.value);
  const handleMusloIzqChange = (e) => setMusloIzq(e.target.value);
  const handleMusloDerChange = (e) => setMusloDer(e.target.value);
  const handleGemeloIzqChange = (e) => setGemeloIzq(e.target.value);
  const handleGemeloDerChange = (e) => setGemeloDer(e.target.value);


  const handleAddMetrics = async (e) => {
    e.preventDefault();
    const addMetrics = {
        pesoCorporal,
        grasaCorporal,
        cuello,
        hombros,
        pecho,
        bicepsIzq,
        bicepsDer,
        anteBrazoIzq,
        anteBrazoDer,
        cintura,
        cadera,
        musloIzq,
        musloDer,
        gemeloIzq,
        gemeloDer

    };
    try {
        await addMetricsService(addMetrics)
        setOpen(false)
        props.dataMetricas()
    } catch (error) {
        console.log(error)
    }
}

  return (
    <div>
      <Button onClick={handleOpen}>Registrar medidas</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            <form onSubmit={handleAddMetrics}>
            <div>
            <TextField
          label="Peso Corporal"
          id="outlined-adornment-weight"
          sx={{ m: 1, width: '25ch' }}
          InputProps={{
            startAdornment: <InputAdornment position="start">kg</InputAdornment>,
          }}
          value={pesoCorporal}
          onChange={handlePesoCorporalChange}
        />
              <TextField
          label="Porcentaje de Grasa"
          id="outlined-adornment-weight"
          sx={{ m: 1, width: '25ch' }}
          InputProps={{
            startAdornment: <InputAdornment position="start">%</InputAdornment>,
          }}
          value={grasaCorporal}
          onChange={handleGrasaCorporalChange}
        />
              <TextField
          label="Cuello"
          id="outlined-adornment-weight"
          sx={{ m: 1, width: '25ch' }}
          InputProps={{
            startAdornment: <InputAdornment position="start">cm</InputAdornment>,
          }}
          value={cuello}
          onChange={handleCuelloChange}
        />
              <TextField
          label="Hombros"
          id="outlined-adornment-weight"
          sx={{ m: 1, width: '25ch' }}
          InputProps={{
            startAdornment: <InputAdornment position="start">cm</InputAdornment>,
          }}
          value={hombros}
          onChange={handleHombrosChange}
        />
              <TextField
          label="Pecho"
          id="outlined-adornment-weight"
          sx={{ m: 1, width: '25ch' }}
          InputProps={{
            startAdornment: <InputAdornment position="start">cm</InputAdornment>,
          }}
          value={pecho}
          onChange={handlePechoChange}
        />
              <TextField
          label="Biceps Izq"
          id="outlined-adornment-weight"
          sx={{ m: 1, width: '25ch' }}
          InputProps={{
            startAdornment: <InputAdornment position="start">cm</InputAdornment>,
          }}
          value={bicepsIzq}
          onChange={handleBicepsIzqChange}
        />
              <TextField
          label="Biceps Der"
          id="outlined-adornment-weight"
          sx={{ m: 1, width: '25ch' }}
          InputProps={{
            startAdornment: <InputAdornment position="start">cm</InputAdornment>,
          }}
          value={bicepsDer}
          onChange={handleBicepsDerChange}
        />
              <TextField
          label="Antebrazo Izq"
          id="outlined-adornment-weight"
          sx={{ m: 1, width: '25ch' }}
          InputProps={{
            startAdornment: <InputAdornment position="start">cm</InputAdornment>,
          }}
          value={anteBrazoIzq}
          onChange={handleAnteBrazoIzqChange}
        />
              <TextField
          label="Antebrazo Der"
          id="outlined-adornment-weight"
          sx={{ m: 1, width: '25ch' }}
          InputProps={{
            startAdornment: <InputAdornment position="start">cm</InputAdornment>,
          }}
          value={anteBrazoDer}
          onChange={handleAnteBrazoDerChange}
        />
              <TextField
          label="Cintura"
          id="outlined-adornment-weight"
          sx={{ m: 1, width: '25ch' }}
          InputProps={{
            startAdornment: <InputAdornment position="start">cm</InputAdornment>,
          }}
          value={cintura}
          onChange={handleCinturaChange}
        />
              <TextField
          label="Cadera"
          id="outlined-adornment-weight"
          sx={{ m: 1, width: '25ch' }}
          InputProps={{
            startAdornment: <InputAdornment position="start">cm</InputAdornment>,
          }}
          value={cadera}
          onChange={handleCaderaChange}
        />
              <TextField
          label="Muslo Izq"
          id="outlined-adornment-weight"
          sx={{ m: 1, width: '25ch' }}
          InputProps={{
            startAdornment: <InputAdornment position="start">cm</InputAdornment>,
          }}
          value={musloIzq}
          onChange={handleMusloIzqChange}
        />
              <TextField
          label="Muslo Der"
          id="outlined-adornment-weight"
          sx={{ m: 1, width: '25ch' }}
          InputProps={{
            startAdornment: <InputAdornment position="start">cm</InputAdornment>,
          }}
          value={musloDer}
          onChange={handleMusloDerChange}
        />
              <TextField
          label="Gemelo Izq"
          id="outlined-adornment-weight"
          sx={{ m: 1, width: '25ch' }}
          InputProps={{
            startAdornment: <InputAdornment position="start">cm</InputAdornment>,
          }}
          value={gemeloIzq}
          onChange={handleGemeloIzqChange}
        />
              <TextField
          label="Gemelo Der"
          id="outlined-adornment-weight"
          sx={{ m: 1, width: '25ch' }}
          InputProps={{
            startAdornment: <InputAdornment position="start">cm</InputAdornment>,
          }}
          value={gemeloDer}
          onChange={handleGemeloDerChange}
        />
        
                 <Button type="submit" variant="contained">
                  Registrar medidas
                </Button>

                
              </div>
            </form>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default ModalAddMetric