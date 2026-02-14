import { Box, Typography, Modal, Stack } from "@mui/material";
import { useState } from "react";
import TaskDetails from "./TaskDetails";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { TaskItem } from "./TaskItem";
import { CanceledTaskItem } from "./CanceledTaskItem";

export default function TaskList({ taskList, label, icon, isOpen }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [showTodaysTasks, setShowTodaysTasks] = useState(isOpen ? true : false);

  const toggleShowTodaysTask = () => {
    setShowTodaysTasks(!showTodaysTasks);
  };

  return (
    <Box sx={{ width: "100%", minWidth: 0 }}>
      <Box>
        <Stack
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 2,
          }}
        >
          {!showTodaysTasks ? (
            <KeyboardArrowUpIcon
              sx={{ marginRight: 2 }}
              onClick={toggleShowTodaysTask}
            />
          ) : (
            <KeyboardArrowDownIcon
              sx={{ marginRight: 2 }}
              onClick={toggleShowTodaysTask}
            />
          )}
          {icon}
          <Typography variant="h8">
            {" "}
            {label} {}
          </Typography>
        </Stack>
        <Box
          sx={{
            ml: { xs: 0, sm: 3 },
            width: "100%",
            minWidth: 0,
            display: showTodaysTasks ? "block" : "none",
          }}
        >
          {taskList.slice(0, 10).map((task) => {
            if (task.status === "cancelled") {
              return (
                <CanceledTaskItem
                  key={task._id}
                  task={task}
                  handleOpen={handleOpen}
                  setCurrentTask={setCurrentTask}
                />
              );
            }
            return (
              <TaskItem
                key={task._id}
                task={task}
                handleOpen={handleOpen}
                setCurrentTask={setCurrentTask}
              />
            );
          })}
        </Box>
      </Box>
      <Modal open={open} onClose={handleClose}>
        <TaskDetails task={currentTask} />
      </Modal>
    </Box>
  );
}
