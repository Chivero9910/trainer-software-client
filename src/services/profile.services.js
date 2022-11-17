import service from "./config.services";

const trainerListService = () => {
    return service.get("/profile/trainers")
}

const profileDetailsService = () => {
    return service.get("/profile")
}

const updateServiceClient = (updateUser) => {
    return service.patch("/profile/update", updateUser)
}

const addMetricsService = (addMetrics) => {
    return service.post("profile/metrics", addMetrics)
}

const getMetricsService = () => {
    return service.get("/profile/metrics")
}

const getMetricsDetailsService = (idMetric) => {
    return service.get(`/profile/metrics/${idMetric}`)
}

const deleteMetricService = (idMetric) => {
    return service.delete(`/profile/metrics/${idMetric}`)
}

const updateMetricsService = (addMetrics, idMetric) => {
    return service.patch(`/profile/metrics/${idMetric}`, addMetrics)
}

const getUserMetricsService = (id) => {
    return service.get(`/profile/metrics/details/${id}`)
}




export {
    trainerListService,
    profileDetailsService,
    updateServiceClient,
    addMetricsService,
    getMetricsService,
    getMetricsDetailsService,
    deleteMetricService,
    updateMetricsService,
    getUserMetricsService
}