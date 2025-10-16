import axios from "axios";

const BASE_URL = "http://localhost:5004/fir-auth-8e22b/us-central1/api/";

const loginCred = async (loginDetail) => {
  try {
    const response = await axios.post(`${BASE_URL}signIn`, loginDetail);

    return response.data;
  } catch (error) {
    console.log(error);
    return "Invalid Credentials";
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
