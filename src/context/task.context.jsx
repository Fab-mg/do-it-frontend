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
  const [archivedTasks, setArchivedTasks] = useState([]);

  const addTask = async (task, token) => {
    const created = await createTask(task, token);
    if (created) {
      await getTodaysTasks(token);
      await getOngoingTasks(token);
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
      let tasks = todaysTaskList.filter((task) => task._id != finished._id);
      setTodaysTaskList(tasks);
      let ongoing = ongoingTasks.filter((task) => task._id != finished._id);
      setOngoingTasks(ongoing);
      await getFinishedTasks(token);
    }
    return finished;
  };

  const cancelTask = async (taskId, token) => {
    const canceled = await updateTaskStatus(taskId, "cancelled", token);
    if (canceled) {
      let tasks = todaysTaskList.filter((task) => task._id != canceled._id);
      setTodaysTaskList(tasks);
      let ongoing = ongoingTasks.filter((task) => task._id != canceled._id);
      setOngoingTasks(ongoing);
      setCanceledTasks([canceled, ...cancelledTasks]);
    }
    return canceled;
  };

  const archiveTask = async (taskId, token) => {
    const archived = await updateTaskStatus(taskId, "archived", token);
    if (archived) {
      let finished = finishedTasks.filter((task) => task._id != archived._id);
      setFinishedTasks(finished);
      setArchivedTasks([archived, ...archivedTasks]);
    }
    return archived;
  };

  const resumeTask = async (taskId, token) => {
    const resumed = await updateTaskStatus(taskId, "ongoing", token);
    if (resumed) {
      let canceled = cancelledTasks.filter((task) => task._id != resumed._id);
      setCanceledTasks(canceled);
      setOngoingTasks([resumed, ...ongoingTasks]);
      await getTodaysTasks(token);
    }
    return resumed;
  };

  const deleteTask = async (taskId, token) => {
    const deleted = 1;
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
    cancelTask,
    finishTask,
    archiveTask,
    resumeTask,
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
