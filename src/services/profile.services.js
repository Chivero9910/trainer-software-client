import service from "./config.services";

const trainerListService = () => {
    return service.get("/profile/trainers")
}







export {
    trainerListService
}