import axios from "axios";

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

export const googleCred = async (googleCredDetail) => {
  try {
    const response = await axios.post(`${BASE_URL}googleLogin`, googleCredDetail);

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
