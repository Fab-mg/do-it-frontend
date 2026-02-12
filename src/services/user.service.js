import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

export const registerUser = async (userDetails) => {
  try {
    const response = await axios.post(`${apiUrl}/user/signup`, userDetails);
    if (response.status == 201) {
      return response.data;
    }
    throw new Error("Failed to save user");
  } catch (error) {
    console.error("Error registering:", error);
    throw error;
  }
};

export const getMe = async (token) => {
  try {
    const response = await axios.get(`${apiUrl}/user/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("🚀 ~ getMe ~ response:", response);
    return response.data;
  } catch (e) {
    console.error("Error getting user info", e);
  }
};

export const getUserById = async (id) => {
  console.log("🚀 ~ getUserById ~ id:", id);
  let taskId = id;
  if (typeof id === "object" && id !== null) {
    taskId = id._id || id.id;
  }
  if (typeof taskId !== "string" && typeof taskId !== "number") {
    throw new Error("Invalid ID: must be a string or number");
  }
  try {
    const response = await axios.get(`${apiUrl}/user/${taskId.toString()}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching Task:", error);
    throw error;
  }
};
