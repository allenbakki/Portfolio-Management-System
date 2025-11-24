import {
    auth,
    generateAccessToken,
    generateRefreshToken,
  } from "./firebaseAuth.js";
  
  import { db } from "./db.js";
  
  export async function userRegister(req, res) {
    const { email, password, username } = req.body;
  
    if (!email || !password || !username) {
      return res.json({ message: "All fields are required" });
    }
  
    const collectionRef = db.collection("users");
    const displayName = username;
    try {
      const userRecord = await auth.createUser({
        email,
        password,
        displayName,
      });
      const accessToken = generateAccessToken(userRecord.uid);
      const refreshToken = generateRefreshToken(userRecord.uid);
  
      const userRef = collectionRef.doc(userRecord.uid);
  
      await userRef.set({
        displayName: userRecord.displayName,
        email: userRecord.email,
        uid: userRecord.uid,
        password: password,
      });
  
      res.status(200).json({
        message: "Registered successfully",
        status: 200,
        data: {
          email,
          password,
          displayName,
          accessToken,
          refreshToken,
        },
      });
    } catch (error) {
      console.error(`Error fetching user data:${error}`);
      res.status(401).json({
        message: "Invalid credentials",
        error: error.message,
        status: 401,
      });
    }
  }


  
  export async function googleUserRegister(req, res) {
    const { email, displayName,uid } = req.body;
  
    if (!email || !uid || !displayName) {
      return res.json({ message: "All fields are required" });
    }
  
    const collectionRef = db.collection("users");
    try {
     
      const accessToken = generateAccessToken(uid);
      const refreshToken = generateRefreshToken(uid);
  
      const userRef = collectionRef.doc(uid);
  
      await userRef.set({
        displayName: displayName,
        email: email,
        uid: uid,
      });
  
      res.status(200).json({
        message: "Registered successfully",
        status: 200,
        data: {
          email,
          displayName,
          accessToken,
          refreshToken,
        },
      });
    } catch (error) {
      console.error(`Error fetching user data:${error}`);
      res.status(401).json({
        message: "Invalid credentials",
        error: error.message,
        status: 401,
      });
    }
  }