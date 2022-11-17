import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import NavbarTrainer from '../components/NavbarTrainer'
import { getRoutineProfileService, getRoutinesService } from '../services/exercises.services';

function Plan() {
    const { clientId } = useParams();
    const [list, setList] = useState([]);
  
    useEffect(() => {
      getData();
      console.log(clientId);
    }, []);
  
    const getData = async () => {
      try {
        const response = await getRoutineProfileService();
        setList(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
  return (
    <div>
        <NavbarTrainer />
        <div>
        {list.map((eachRoutine) => {
          return (
            <div key={eachRoutine._id}>
              <h3>{eachRoutine.date}</h3>
              <h3>{eachRoutine.name}</h3>
              {eachRoutine.trainings.map((eachTraining) => {
                return (
                  <div key={eachTraining._id}>
                    <iframe
                      width="150"
                      height="80"
                      src={eachTraining.videoUrl}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title="Embedded youtube"
                    />
                    <h4>{eachTraining.name}</h4>
                    <p>{eachTraining.instructions}</p>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default Plan