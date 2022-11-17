import { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";
import { signupServiceClient } from "../services/auth.services";
import { getUserMetricsService, trainerListService } from "../services/profile.services";
import TextField from "@mui/material/TextField";
import { FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 2200,
    maxHeight: 600,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    overflowY: "scroll",
  };

function ModalGetMetrics(props) {
  const { authenticateUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const [list, setList] = useState([])
  const [isFetching, setIsFetching] = useState(true)

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  

  useEffect(() => {
    getData();
    console.log();
  }, []);



  const getData = async () => {
    try {
      const response = await getUserMetricsService(props.id);
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
      <Button variant="contained" onClick={handleOpen}>Medidas del cliente</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <table>
        <tr>
          <th>Fecha</th>
          <th>Peso corporal (kg)</th>
          <th>Porcentaje de grasa (%)</th>
          <th>Cuello (cm)</th>
          <th>Hombros (cm)</th>
          <th>Pecho (cm)</th>
          <th>Biceps Izq (cm)</th>
          <th>Biceps Der (cm)</th>
          <th>Antebrazo Izq (cm)</th>
          <th>Antebrazo Der (cm)</th>
          <th>Cintura (cm)</th>
          <th>Cadera (cm)</th>
          <th>Muslo Izq (cm)</th>
          <th>Muslo Der (cm)</th>
          <th>Gemelo Izq (cm)</th>
          <th>Gemelo Der (cm)</th>
        </tr>
        {list.map((eachMetric) => {
          return(

            <tr>
          <th>{new Date(eachMetric.updatedAt).toLocaleDateString()}</th>
          <th>{eachMetric.pesoCorporal}</th>
          <th>{eachMetric.grasaCorporal}</th>
          <th>{eachMetric.cuello}</th>
          <th>{eachMetric.hombros}</th>
          <th>{eachMetric.pecho}</th>
          <th>{eachMetric.bicepsIzq}</th>
          <th>{eachMetric.bicepsDer}</th>
          <th>{eachMetric.anteBrazoIzq}</th>
          <th>{eachMetric.anteBrazoDer}</th>
          <th>{eachMetric.cintura}</th>
          <th>{eachMetric.cadera}</th>
          <th>{eachMetric.musloIzq}</th>
          <th>{eachMetric.musloDer}</th>
          <th>{eachMetric.gemeloIzq}</th>
          <th>{eachMetric.gemeloDer}</th>
        </tr>
      
          )
        })}
        </table>
        </Box>
      </Modal>
    </div>
  );
}

export default ModalGetMetrics;