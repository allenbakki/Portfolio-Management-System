import express from "express";
import { db } from "../auth/db.js";
import { verifyToken } from "../auth/firebaseAuth.js";

export async function saveUpdatePortfolio(req, res) {
  try {
    console.log("authorisation: ")

    const data = req.body;
    const token = req.headers.authorization;
    console.log("authorisation: ",token)

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Missing Authorization token",
      });
    }

    const decodedToken = await verifyToken(token);

    if (!decodedToken || !decodedToken.userId) {
      return res.status(403).json({
        success: false,
        message: "Invalid or expired token",
      });
    }

    const userId = decodedToken.userId;

    if (!data) {
      return res.status(400).json({
        success: false,
        message: "No data received",
      });
    }

    if (!data.general) {
      return res.status(400).json({
        success: false,
        message: "Missing 'general' section",
      });
    }

    const requiredGeneralFields = [
      "name",
      "professionalTitle",
      "email",
      "aboutMe",
      "linkedIn",
      "location",
    ];

    for (let field of requiredGeneralFields) {
      if (!data.general[field] || data.general[field].trim() === "") {
        return res.status(400).json({
          success: false,
          message: `Missing required field: ${field} in general`,
        });
      }
    }

    if (
      !Array.isArray(data.workExperience) ||
      !Array.isArray(data.education) ||
      !Array.isArray(data.projects)
    ) {
      return res.status(400).json({
        success: false,
        message:
          "workExperience, education, and projects must all be valid arrays",
      });
    }

    const portfolioId = `portfolio_${userId}`;
    const portfolioRef = db.collection("portfolio").doc(portfolioId);

    await portfolioRef.set(
      {
        userId,
        ...data,
        portfolioId,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
      { merge: true } 
    );

    return res.status(200).json({
      success: true,
      message: "Portfolio saved successfully",
      portfolioId,
    });
  } catch (error) {
    console.error("Error saving portfolio:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

export async function getPublicPortfolio(req, res) {
  try {
    const { uid } = req.params;

    if (!uid) {
      return res.status(400).json({
        success: false,
        message: "Missing UID",
      });
    }

    console.log("Public portfolio request for uid:", uid);

    const snap = await db
      .collection("portfolio")
      .where("userId", "==", uid)
      .limit(1)
      .get();

    if (snap.empty) {
      console.log("No portfolio found for uid:", uid);
      return res.status(404).json({
        success: false,
        message: "Portfolio not found for this user",
      });
    }

    const doc = snap.docs[0];
    const data = doc.data();
    console.log(`Found portfolio doc: http://localhost:5173/u/${uid}`, data);

    const activeTemplateId = data.activeTemplateId || "template01";

    return res.status(200).json({
      success: true,
      activeTemplateId,
      portfolioData: {
        general: data.general || {},
        workExperience: data.workExperience || [],
        education: data.education || [],
        projects: data.projects || [],
      },
    });
  } catch (error) {
    console.error("Error fetching public portfolio:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}