import { Router } from "express";
import { getSignIn } from "../auth/signIn.js";
import { googleUserRegister, userRegister } from "../auth/signUp.js";
import { saveUpdatePortfolio } from "../apis/portfolio.js";
import { getPortfolio } from "../apis/getPortfolio.js";
import { createLaunchLink, getLaunchLinks, deleteLaunchLink } from "../apis/launch.js";

const router = Router();

router
  .post("/signIn", getSignIn)
  .post("/signUp", userRegister)
  .post("/portfolio", saveUpdatePortfolio)
  .get("/getportfolio", getPortfolio)
  .post("/googleLogin", googleUserRegister)
  .post("/api/launch", createLaunchLink)
  .get("/api/launch-links", getLaunchLinks)
  .post("/api/delete", deleteLaunchLink)
  .get("/test", (req, res) => res.send("Hello from routes.js!"));

export default router;
