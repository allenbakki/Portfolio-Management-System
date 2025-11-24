import axios from "axios";

export async function getPortfolio(accessToken) {
    
  if (!accessToken) throw new Error("Access token is required");

  try {
    const response = await axios.get("http://localhost:3000/getportfolio", {
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