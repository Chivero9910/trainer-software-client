import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ModalAddRoutine from "../components/ModalAddRoutine";
import ModalEditRoutine from "../components/ModalEditRoutine";
import ModalGetMetrics from "../components/ModalGetMetrics";
import NavbarTrainer from "../components/NavbarTrainer";
import { getRoutinesService } from "../services/exercises.services";

function ClientsDetails(props) {
  const { clientId } = useParams();
  const [list, setList] = useState([]);

  useEffect(() => {
    getData();
    console.log(clientId);
  }, []);

  const getData = async () => {
    try {
      const response = await getRoutinesService(clientId);
      setList(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <NavbarTrainer />
      <div id="container-routine">
        <div id="modals-routine">
          <ModalAddRoutine id={clientId} dataRoutine={getData} />
          <ModalGetMetrics id={clientId} />
        </div>
        <div className="routines-container">
          {list.map((eachRoutine) => {
            return (
              <div className="each-routine" key={eachRoutine._id}>
              <div>
                <h3>{new Date(eachRoutine.date).toLocaleDateString() }</h3>
                <h3>{eachRoutine.name}</h3>
                <p>{eachRoutine.description}</p>
                </div>
                {eachRoutine.trainings.map((eachTraining) => {
                  return (
                    <div className="eachExercise" key={eachTraining._id}>
                      <iframe
                        width="150"
                        height="80"
                        src={eachTraining.videoUrl}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title="Embedded youtube"
                      />
                      <div className="each-exercise-details">
                      <h4>{eachTraining.name}</h4>
                      <p>{eachTraining.instructions}</p>
                      </div>
                    </div>
                  );
                })}

                <ModalEditRoutine id={eachRoutine._id} dataRoutine={getData} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ClientsDetails;
