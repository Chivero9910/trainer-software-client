import { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import {createTrainingService} from "../services/exercises.services.js"
import { Navigate } from "react-router-dom";

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

function ModalTraining() {


  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [name, setName] = useState("");
  const [instructions, setInstructions] = useState("");
  const [videoUrl, setVideoUrl] = useState("")

  const handleNameChange = (e) => setName(e.target.value);
  const handleInstructionsChange = (e) => setInstructions(e.target.value);
  const handlevideoUrlChange = (e) => setVideoUrl(e.target.value);

  const handleUpdateTraining = async (e) => {
    e.preventDefault();
    const newTraining = {
        name,
        videoUrl,
        instructions
    };
    try {
        await createTrainingService(newTraining)
        Navigate("/ejercicios");
    } catch (error) {
        console.log(error)
    }
}

  return (
    <div>
      <Button onClick={handleOpen}>Añadir un entrenamiento</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            <form onSubmit={handleUpdateTraining}>
            <div>
            <TextField
                  id="outlined-basic"
                  margin="normal"
                  size="small"
                  type="text"
                  label="Nombre"
                  variant="outlined"
                  value={name}
                  onChange={handleNameChange}
                />
                <TextField
                  id="outlined-basic"
                  margin="normal"
                  size="small"
                  multiline
                  maxRows={4}
                  label="Descripción"
                  variant="outlined"
                  value={instructions}
                  onChange={handleInstructionsChange}
                />
                <TextField
                  id="outlined-basic"
                  margin="normal"
                  size="small"
                  type="text"
                  label="Video URL"
                  variant="outlined"
                  value={videoUrl}
                  onChange={handlevideoUrlChange}
                />
                 <Button type="submit" variant="contained">
                  Editar entrenamiento
                </Button>

                
              </div>
            </form>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default ModalTraining