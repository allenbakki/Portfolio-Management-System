import { Router } from "express";
import { getSignIn } from "../auth/signIn.js";
import { userRegister } from "../auth/signUp.js";
import { saveUpdatePortfolio } from "../apis/portfolio.js";

const router = Router();

router.post("/signIn", getSignIn)
      .post("/signUp", userRegister)
      .post("/portfolio",saveUpdatePortfolio)
      .get("/test", (req, res) => res.send("Hello from routes.js!"));
export default router;
