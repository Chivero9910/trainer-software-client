import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import {
  createRoutineService,
  trainingsListService,
} from "../services/exercises.services";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1400,
  maxHeight: 800,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  overflowY: "scroll",
};

export default function ModalAddRoutine(props) {
  const [list, setList] = React.useState([]);
  const [exercises, setExercises] = React.useState([]);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [date, setDate] = React.useState("");

  const handleNameChange = (e) => setName(e.target.value);
  const handleDateChange = (e) => setDate(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);

  React.useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await trainingsListService();
      setList(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddToRoutine = (eachTraining) => {
    setExercises([...exercises, eachTraining]);
  };

  const handleDeleteFromRoutine = (index) => {
    setExercises([exercises.pull(index)]);
  };

  const handleCreateRoutine = async (e) => {
    e.preventDefault();
    const trainings = exercises.map((eachExercise) => {
      return eachExercise._id;
    });
    console.log(props);
    const newRoutine = {
      name,
      description,
      trainings: trainings,
      date,
    };
    try {
      await createRoutineService(newRoutine, props.id);
      setOpen(false);
      props.dataRoutine();
      setName("")
      setDescription("")
      setDate("")
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="modal-body">
      <Button onClick={handleOpen} variant="contained">Añadir un entrenamiento</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            <form>
              <div className="routine-form">
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
                  value={description}
                  onChange={handleDescriptionChange}
                />
                <TextField
                  id="outlined-basic"
                  margin="normal"
                  size="small"
                  type="date"
                  variant="outlined"
                  value={date}
                  onChange={handleDateChange}
                />

                <Button onClick={handleCreateRoutine} variant="contained">Crear rutina</Button>
              </div>
            </form>

            <div id="routines-div">
              <div id="exercises-div-routine">
                {exercises.map((eachExercise, index) => {
                  return (
                    <div className="exercises-routine" key={eachExercise._id}>
                      <iframe
                        width="150"
                        height="80"
                        src={eachExercise.videoUrl}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title="Embedded youtube"
                      />
                      <div className="names-forms">
                        <h3>{eachExercise.name}</h3>
                        <p>{eachExercise.instructions}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div id="trainingLibrary">
                {list.map((eachTraining) => {
                  return (
                    <div
                      className="each-exercise-routine"
                      key={eachTraining._id}
                    >
                      <iframe
                        width="200"
                        height="100"
                        src={eachTraining.videoUrl}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title="Embedded youtube"
                      />
                      <h3>{eachTraining.name}</h3>
                      <Button variant="contained" color="success" onClick={() => handleAddToRoutine(eachTraining)}>
                        Añadir a la rutina
                      </Button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
