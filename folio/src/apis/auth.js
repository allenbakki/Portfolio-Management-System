import axios from "axios";

const BASE_URL = "http://localhost:8000/";

const loginCred = async (loginDetail) => {
  try {
    const response = await axios.post(`${BASE_URL}login`, loginDetail);

    return response.data;
  } catch (error) {
    console.log(error);
    return "Invalid Credentials";
  }
};

const signUpCred = async (signUpDetails) => {
  try {
    const response = await axios.post(`${BASE_URL}signUp`, signUpDetails);
    return response.data;
  } catch (error) {
    console.log("error", error.response.data.error);
    return error.response.data.error;
  }
};

export { loginCred };
