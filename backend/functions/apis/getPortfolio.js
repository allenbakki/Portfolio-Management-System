import express from "express";
import { db } from "../auth/db.js";
import { verifyToken } from "../auth/firebaseAuth.js";

export async function getPortfolio(req, res) {
  try {
    const authHeader = req.headers.authorization; 
    if (!authHeader) {
      return res.status(401).json({ 
        success: false, 
        message: "Missing Authorization token"
     });
    }

    const decoded = await verifyToken(authHeader);
    if (!decoded || !decoded.userId) {
      return res.status(403).json({ 
        success: false, 
        message: "Invalid or expired token" 
     });
    }

    const userId = decoded.userId;
    const portfolioId = `portfolio_${userId}`;
    const docRef = db.collection("portfolio").doc(portfolioId);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(404).json({ 
        success: false, 
        message: "Portfolio not found" 
     });
    }

    return res.status(200).json({ 
        success: true, 
        portfolio: doc.data() 
    });
  } catch (err) {
    console.error("Error retrieving portfolio:", err);
    return res.status(500).json({ 
        success: false, 
        message: "Internal server error" 
    });
  }
}
