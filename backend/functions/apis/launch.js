import { db } from "../auth/db.js";
import { verifyToken } from "../auth/firebaseAuth.js";
import { v4 as uuidv4 } from "uuid";

export async function createLaunchLink(req, res) {
  try {
    const token = req.headers.authorization;
    const { template } = req.body; // "creative" | "professional"

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Missing Authorization token",
      });
    }

    const decoded = await verifyToken(token);
    if (!decoded || !decoded.userId) {
      return res.status(403).json({
        success: false,
        message: "Invalid or expired token",
      });
    }

    if (!template || !["creative", "professional"].includes(template)) {
      return res.status(400).json({
        success: false,
        message: "Invalid or missing template type",
      });
    }

    const userId = decoded.userId;

    const docId = `${template}_${userId}`;
    const launchRef = db.collection("launchLinks").doc(docId);
    const existing = await launchRef.get();

    let launchId;

    if (existing.exists) {
      launchId = existing.data().launchId;
    } else {
      launchId = uuidv4();
      await launchRef.set({
        launchId,
        userId,
        template,
        createdAt: Date.now(),
      });
    }

    if (template === "creative") {
      return res.status(200).json({
        success: true,
        creativeLaunchId: launchId,
      });
    } else {
      return res.status(200).json({
        success: true,
        professionalLaunchId: launchId,
      });
    }
  } catch (err) {
    console.error("Error creating launch link:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

export async function getLaunchLinks(req, res) {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ success: false, message: "Missing token" });
    }

    const decoded = await verifyToken(token);
    if (!decoded || !decoded.userId) {
      return res.status(403).json({ success: false, message: "Invalid token" });
    }

    const userId = decoded.userId;

    const snapshot = await db
      .collection("launchLinks")
      .where("userId", "==", userId)
      .get();

    const links = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      links.push({
        template: data.template,   // "creative" | "professional"
        launchId: data.launchId,
      });
    });

    return res.status(200).json({ success: true, links });
  } catch (err) {
    console.error("Error getting launch links:", err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
}

// DELETE one launch link for current user
export async function deleteLaunchLink(req, res) {
  try {
    const token = req.headers.authorization;
    const { template } = req.body; // "creative" | "professional"

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Missing Authorization token",
      });
    }

    const decoded = await verifyToken(token);
    if (!decoded || !decoded.userId) {
      return res.status(403).json({
        success: false,
        message: "Invalid or expired token",
      });
    }

    if (!template || !["creative", "professional"].includes(template)) {
      return res.status(400).json({
        success: false,
        message: "Invalid template type",
      });
    }

    const userId = decoded.userId;
    const docId = `${template}_${userId}`;
    await db.collection("launchLinks").doc(docId).delete();

    return res.status(200).json({
      success: true,
      message: "Launch link deleted",
    });
  } catch (err) {
    console.error("Error deleting launch link:", err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
}