import { Router } from "express";
import { passportAuthenticateJwt } from "../config/passport.config";
import { streamAIResponse } from "../controllers/ai.controller";

const aiRoutes = Router()
  .use(passportAuthenticateJwt)
  .post("/chat", streamAIResponse);

export default aiRoutes;