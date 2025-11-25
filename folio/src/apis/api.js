import axios from "axios";

// const BASE_URL = "http://localhost:5004/folio-6be7b/us-central1/api/";
const BASE_URL = "http://localhost:3000/";

const portfolioDetails = async (portfolioDetails,accessToken) => {
  try {

    const response = await axios.post(`${BASE_URL}portfolio`, portfolioDetails, {
      headers: {
         Authorization: accessToken,
      },
    });

    return response.data; 
  } catch (error) {
    console.error("Error submitting portfolio details:", error);

    if (error.response) {
      return {
        success: false,
        message: error.response.data?.message || "Server error occurred",
        status: error.response.status,
      };
    } else if (error.request) {
      return {
        success: false,
        message: "No response from server. Check API or network.",
      };
    } else {
      return {
        success: false,
        message: error.message || "Unexpected error occurred",
      };
    }
  }
};

export { portfolioDetails };
