import service from "./config.services";

const clientsListService = () => {
    return service.get("/profile/trainers-clients")
}

const clientDetailsService = (clientId) => {
    return service.get(`/profile/${clientId}`)
}



export {
    clientsListService,
    clientDetailsService
}