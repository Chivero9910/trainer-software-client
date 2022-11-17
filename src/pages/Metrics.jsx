import { useEffect, useState } from "react";
import ModalAddMetric from "../components/ModalAddMetrics";
import ModalEditMetric from "../components/ModalEditMetric";
import NavbarTrainer from "../components/NavbarTrainer";
import { getMetricsService } from "../services/profile.services";

function Metrics() {
  const [list, setList] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await getMetricsService();
      setList(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <NavbarTrainer />
      <div id="modals-routine">
        <ModalAddMetric dataMetricas={getData} />
      </div>
      <div className="container-table">
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
            <th>Editar medida</th>
          </tr>
          {list.map((eachMetric) => {
            return (
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
                <th>
                  <ModalEditMetric id={eachMetric._id} dataMetricas={getData} />
                </th>
              </tr>
            );
          })}
        </table>
      </div>
    </div>
  );
}

export default Metrics;
