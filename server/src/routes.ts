import { Router } from "express";
import { SubmitFeedbackController } from "./controllers/submit-feedbakcs-controller";

export const routes = Router()



const submitFeedbackController = new SubmitFeedbackController()
routes.post("/feedbacks", submitFeedbackController.handle)