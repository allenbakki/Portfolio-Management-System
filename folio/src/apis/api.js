import axios from "axios";

// const BASE_URL = "http://localhost:5004/folio-6be7b/us-central1/api/";
const BASE_URL = "http://localhost:3000/";


const portfolioDetails = async (portfolioDetails) => {
  try {
   console.log("details: ",portfolioDetails);

    return "response.data";
  } catch (error) {
    console.log(error);
    return "Invalid Credentials";
  }
};



export { portfolioDetails };
