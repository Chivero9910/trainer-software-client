import service from "./config.services";

const trainingsListService = () => {
    return service.get("/exercise")
}

const createTrainingService = (newTraining) => {
    return service.post ("/exercise", newTraining)
}

const exerciseDetailsService = (trainingId) => {
    return service.get(`/exercise/${trainingId}`)
}

const updateTrainingService = (updateTraining, trainingId) => {
    return service.patch(`/exercise/${trainingId}`, updateTraining)
} 


const deleteTrainingService = (trainingId) => {
    return service.delete(`/exercise/${trainingId}`)
}

const createRoutineService = (newRoutine, clientId) => {
    return service.post(`/routine/create/${clientId}`, newRoutine)
}

const getRoutinesService = (clientId) => {
    return service.get(`/routine/${clientId}`)
}

const getRoutineService = (routineId) => {
    return service.get(`/routine/routines/${routineId}`)
}





export {
    trainingsListService,
    createTrainingService,
    exerciseDetailsService,
    updateTrainingService,
    deleteTrainingService,
    createRoutineService,
    getRoutinesService,
    getRoutineService
}