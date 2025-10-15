import { Router } from "express";

import { getSignIn } from "../auth/signIn.js";
import { userRegister } from "../auth/signUp.js";

const router = Router();

router.post("/SignIn", getSignIn).post("/signUp", userRegister);

export default router;