import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

export const userLogin = async (credentials) => {
  try {
    const response = await axios.post(`${apiUrl}/auth/login`, credentials);
    if (response.status === 200) {
      console.log("Auth successfull!");
      return response.data;
    }
    throw new Error("Bad credentials");
  } catch (error) {
    console.error("Error login:", error);
    throw error;
  }
};
