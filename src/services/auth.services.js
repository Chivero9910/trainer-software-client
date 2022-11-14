import service from "./config.services";

const signupServiceTrainer = (newUser) => {
  return service.post("/auth/signup/trainer", newUser)
}
const signupServiceClient = (newUser) => {
  return service.post("/auth/signup/client", newUser)
}

const loginService = (userCredentials) => {
  return service.post("/auth/login", userCredentials)
}

const verifyService = () => {
  return service.get("/auth/verify")
}


export {
  signupServiceTrainer,
  signupServiceClient,
  loginService,
  verifyService
}