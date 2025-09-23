import axios from "axios";

const BASE_URL = "http://localhost:8000/";

const loginCred = async (loginDetail) => {
  try {
    // const response = await axios.post(`${BASE_URL}login`, loginDetail);
    
    return {status:200};
  } catch (error) {
    console.log(error);
    return "Invalid Credentials";
  }
};

export { loginCred };
