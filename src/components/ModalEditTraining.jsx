import { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import {createTrainingService, deleteTrainingService, exerciseDetailsService, updateTrainingService} from "../services/exercises.services.js"
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

function ModalEditTraining(props) {

    const {trainingId} = props

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [name, setName] = useState("");
  const [instructions, setInstructions] = useState("");
  const [videoUrl, setVideoUrl] = useState("")

  const handleNameChange = (e) => setName(e.target.value);
  const handleInstructionsChange = (e) => setInstructions(e.target.value);
  const handlevideoUrlChange = (e) => setVideoUrl(e.target.value);

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    try {
        const response = await exerciseDetailsService(trainingId)
        setName(response.data.name)
        setInstructions(response.data.instructions)
        setVideoUrl(response.data.videoUrl)

    } catch (error) {
        console.log(error)
    }
  }

  const handleDeleteTraining = async (e) => {
    e.preventDefault()
    try {
      await deleteTrainingService(trainingId)
    } catch (error) {
      console.log(error)
    }
  }

  const handleUpdateTraining = async (e) => {
    e.preventDefault();
    const updateTraining = {
        name,
        videoUrl,
        instructions
    };
    try {
        await updateTrainingService(updateTraining, trainingId)
        Navigate("/ejercicios");
    } catch (error) {
        console.log(error)
    }
}
  return (
    <div>
      <Button onClick={handleOpen}>Editar entrenamiento</Button>
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
                  Actualizar entrenamiento
                </Button>

                
              </div>
            </form>
            <form onSubmit={handleDeleteTraining}>
            <Button type="submit" variant="contained">
                  Eliminar entrenamiento
                </Button>
            </form>
          </div>
        </Box>
      </Modal>
    </div>
  )
}

export default ModalEditTraining