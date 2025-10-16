import express from "express";
import cors from "cors";
import { onRequest } from "firebase-functions/v2/https";
import mainRoute from "./routes/routes.js";
import logger from "firebase-functions/logger";

const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

// Root route
app.get("/hello", (req, res) => {
  logger.info("Hello route hit!");
  res.send("Hello from Firebase mee.js!");
});

// Mount main routes
app.use("/", mainRoute);

// Export function
app.listen(3000, () => console.log("Server running on port 3000"));

// export const api = onRequest(app);
