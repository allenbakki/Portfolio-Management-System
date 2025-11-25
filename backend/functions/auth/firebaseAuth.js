import admin from "firebase-admin";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

dotenv.config();

// Get __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load JSON manually
const serviceAccount = JSON.parse(
  fs.readFileSync(path.join(__dirname, "authCredentials.json"), "utf-8")
);

export const app = admin.initializeApp({
  credential: admin.credential.cert({
    type: process.env.FIREBASE_TYPE,
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: process.env.auth_uri,
    token_uri: process.env.token_uri,
    auth_provider_x509_cert_url: process.env.auth_provider_x509_cert_url,
    client_x509_cert_url: process.env.client_x509_cert_url,
    universe_domain: process.env.universe_domain,
  }),
  databaseURL: process.env.databaseURL,
});

const secretKey =process.env.secretKey;
const refreshSecretKey =process.env.refreshSecretKey;



export const verifyToken = async (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        reject(err);
        return res.status(403);
      } else {
        resolve(user);
      }
    });
  });
};

export const generateAccessToken = (userId) => {
  return jwt.sign({ userId }, secretKey, { expiresIn: "5d" });
};

// Function to generate refresh token
export const generateRefreshToken = (userId) => {
  return jwt.sign({ userId }, refreshSecretKey, { expiresIn: "30d" });
};

export const refreshAccessToken = async (req, res) => {
  const refreshToken = req.body.refreshToken;

  if (!refreshToken) return res.sendStatus(401);

  jwt.verify(refreshToken, refreshSecretKey, (err, user) => {
    if (err) return res.sendStatus(403);

    const newAccessToken = generateAccessToken(user.userId);

    res.json({ accessToken: newAccessToken });
  });
};

export const firestore = admin.firestore();
export default admin;
export const auth = admin.auth(app);
