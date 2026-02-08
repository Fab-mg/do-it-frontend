import { createContext, useContext, useState } from "react";
import { getAllTask } from "../services/task.service";

const TaskContext = createContext(null);

export function TaskProvider({ children }) {
  const [taskList, setTaskList] = useState([]);

  const addTask = async (task) => {};

  const getAllTasks = async () => {
    const tasks = await getAllTask();
    setTaskList(tasks);
    return tasks;
  };

  const value = {
    taskList,
    setTaskList,
    addTask,
    getAllTasks,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

export function useTask() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTask must be used inside TskProvider");
  }
  return context;
}
