import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

export const createTask = async (taskData) => {
  try {
    const response = await axios.post(`${apiUrl}/task`, taskData);
    if (response.status === 201) {
      console.log("Task created successfully");
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error creating Task:", error);
    throw error;
  }
};

export const getAllTask = async () => {
  try {
    const response = await axios.get(`${apiUrl}/task`);
    return response.data;
  } catch (error) {
    console.error("Error fetching Tasks:", error);
    throw error;
  }
};

export const getTaskById = async (id) => {
  console.log("🚀 ~ getTaskById ~ id:", id);
  let TaskId = id;
  if (typeof id === "object" && id !== null) {
    TaskId = id._id || id.id;
  }
  if (typeof TaskId !== "string" && typeof TaskId !== "number") {
    throw new Error("Invalid ID: must be a string or number");
  }
  try {
    const response = await axios.get(`${apiUrl}/task/${TaskId.toString()}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching Task:", error);
    throw error;
  }
};

export const updateTaskStatus = async (id, status) => {
  try {
    const response = await axios.put(`${apiUrl}/task/${id}/status`, {
      status,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating Task status:", error);
    throw error;
  }
};
