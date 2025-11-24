import { Router } from "express";
import { getSignIn } from "../auth/signIn.js";
import { userRegister } from "../auth/signUp.js";
import { saveUpdatePortfolio } from "../apis/portfolio.js";
import { getPortfolio } from "../apis/getPortfolio.js";

const router = Router();

router.post("/signIn", getSignIn)
      .post("/signUp", userRegister)
      .post("/portfolio",saveUpdatePortfolio)
      .get("/getportfolio", getPortfolio)
      .get("/test", (req, res) => res.send("Hello from routes.js!"));
export default router;
