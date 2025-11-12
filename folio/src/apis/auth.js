import axios from "axios";

// const BASE_URL = "http://localhost:5004/folio-6be7b/us-central1/api/";
const BASE_URL = "http://localhost:3000/";


const loginCred = async (loginDetail) => {
  try {
    const response = await axios.post(`${BASE_URL}signIn`, loginDetail);

    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const signUpCred = async (signUpDetails) => {
  try {
    const response = await axios.post(`${BASE_URL}signUp`, signUpDetails);
    return response.data;
  } catch (error) {
    console.log("error", error.response.data.error);
    return error.response.data.error;
  }
};

export { loginCred };
