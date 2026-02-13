import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

export const createTask = async (taskData, token) => {
  try {
    const response = await axios.post(`${apiUrl}/task`, taskData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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

export const getAllTask = async (query, token) => {
  try {
    const response = await axios.get(`${apiUrl}/task`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        page: query.page,
        limit: query.limit,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching Tasks:", error);
    throw error;
  }
};

export const getTasksByStatus = async (findByStatusBody, token) => {
  try {
    const response = await axios.post(
      `${apiUrl}/task/status`,
      { ...findByStatusBody },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching Tasks:", error);
    throw error;
  }
};

export const getTaskById = async (id, token) => {
  let TaskId = id;
  if (typeof id === "object" && id !== null) {
    TaskId = id._id || id.id;
  }
  if (typeof TaskId !== "string" && typeof TaskId !== "number") {
    throw new Error("Invalid ID: must be a string or number");
  }
  try {
    const response = await axios.get(`${apiUrl}/task/${TaskId.toString()}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching Task:", error);
    throw error;
  }
};

export const updateTaskStatus = async (id, status, token) => {
  try {
    const response = await axios.put(
      `${apiUrl}/task/${id}`,
      {
        status,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error updating Task status:", error);
    throw error;
  }
};

export const updateTask = async (id, taskData, token) => {
  try {
    const response = await axios.put(`${apiUrl}/task/${id}`, taskData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating Task:", error);
    throw error;
  }
};
