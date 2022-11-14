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






export {
    trainingsListService,
    createTrainingService,
    exerciseDetailsService,
    updateTrainingService
}