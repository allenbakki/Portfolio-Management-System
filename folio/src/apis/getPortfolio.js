import axios from "axios";

// const BASE_URL="https://folio-backend-buj1.onrender.com:3000/";
const BASE_URL = "http://localhost:3000/";

export async function getPortfolio(accessToken) {
    
  if (!accessToken) throw new Error("Access token is required");

  try {
    const response = await axios.get(`${BASE_URL}getportfolio`, {
      headers: {
        Authorization: accessToken,
      },
    });
    return response.data;
  } catch (error) {
    let message = "No response body";
    if (error.response) {
      message = error.response.data || error.response.statusText;
    }
    throw new Error("Backend error: " + JSON.stringify(message));
  }
}