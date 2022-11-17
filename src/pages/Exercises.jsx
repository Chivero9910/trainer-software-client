import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ModalEditTraining from "../components/ModalEditTraining";
import NavbarTrainer from "../components/NavbarTrainer";
import { trainingsListService } from "../services/exercises.services";
import ModalTraining from "../components/ModalTraining";

function Exercises() {
  const { clientId } = useParams();
  const [list, setList] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await trainingsListService();
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
      <ModalTraining trainingData={getData}/>
      </div>
      <div className="routines-container-exercise">
    
        {list.map((eachTraining) => {
          return (
            <div className="each-training" key={eachTraining._id}>
            <iframe
      width="250"
      height="150"
      src={eachTraining.videoUrl}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
    />
              <h3>{eachTraining.name}</h3>
              <p>{eachTraining.instructions}</p>
              <ModalEditTraining trainingId={eachTraining._id} trainingData={getData}/>
            </div>
          );
        })}
      </div>
    </div>

  );
}

export default Exercises;
