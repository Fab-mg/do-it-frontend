import { createContext, useContext, useState } from "react";
import {
  createTask,
  getAllTask,
  getTasksByStatus,
  updateTaskStatus,
} from "../services/task.service";
import { isToday } from "../utils/date";

const TaskContext = createContext(null);

export function TaskProvider({ children }) {
  const [todaysTaskList, setTodaysTaskList] = useState([]);
  const [ongoingTasks, setOngoingTasks] = useState([]);
  const [finishedTasks, setFinishedTasks] = useState([]);
  const [cancelledTasks, setCanceledTasks] = useState([]);

  const addTask = async (task, token) => {
    const created = await createTask(task, token);
    if (created) {
      await getAllTasks(token);
    }
    return created;
  };

  const getTodaysTasks = async (token) => {
    const tasks = await getAllTask({ page: "1", limit: "100" }, token);
    if (tasks && tasks.length > 0) {
      const todaysTasks = tasks.filter(
        (task) =>
          task.status === "ongoing" && isToday(task.createdAt.toString()),
      );
      todaysTasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setTodaysTaskList(todaysTasks);
      return todaysTasks;
    }
    setTaskList([]);
    return [];
  };

  const getOngoingTasks = async (token) => {
    const tasks = await getTasksByStatus(
      { status: "ongoing", page: 1, pageSize: 10 },
      token,
    );
    tasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    setOngoingTasks(tasks);
    return tasks;
  };

  const getCanceledTasks = async (token) => {
    const tasks = await getTasksByStatus(
      { status: "cancelled", page: 1, pageSize: 10 },
      token,
    );
    tasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    setCanceledTasks(tasks);
    return tasks;
  };

  const getFinishedTasks = async (token) => {
    const tasks = await getTasksByStatus(
      { status: "finished", page: 1, pageSize: 10 },
      token,
    );
    tasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    setFinishedTasks(tasks);
    return tasks;
  };

  const finishTask = async (taskId, token) => {
    const finished = await updateTaskStatus(taskId, "finished", token);
    if (finished) {
      let tasks = taskList.filter((task) => task._id != finished._id);
      setTaskList(tasks);
    }
    return finished;
  };

  const value = {
    todaysTaskList,
    setTodaysTaskList,
    addTask,
    getTodaysTasks,
    getOngoingTasks,
    getFinishedTasks,
    getCanceledTasks,
    ongoingTasks,
    cancelledTasks,
    finishedTasks,
    finishTask,
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
