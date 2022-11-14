import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import { AuthContext } from '../context/auth.context';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1200,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ModalAddRoutine() {

    const {clientId} = React.useState 
    const { authenticateUser } = React.useContext(AuthContext);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  const handleNameChange = (e) => setName(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);



//   const handleCreateRoutine = async (e) => {
//     e.preventDefault();
//     const newRoutine = {
//       name,
//       description,
//       user: req.params.clientId,
//       trainer: localStorage,
//       trainings
//     };
// }

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
            <form >
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
                  value={description}
                  onChange={handleDescriptionChange}
                />
              </div>
            </form>
          </div>
        </Box>
      </Modal>
    </div>
  );
}