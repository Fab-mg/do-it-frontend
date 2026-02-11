import { Box, Checkbox, Typography, Modal, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import TaskDetails from "./TaskDetails";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { TaskItem } from "./TaskItem";

export default function TaskList({ taskList, label, icon }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [showTodaysTasks, setShowTodaysTasks] = useState(false);

  const toggleShowTodaysTask = () => {
    setShowTodaysTasks(!showTodaysTasks);
  };

  if (taskList.length <= 0) {
    return (
      <Box>
        <Typography variant="h4">No task yet</Typography>
      </Box>
    );
  }
  return (
    <Box>
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
          sx={{ marginLeft: 6, display: showTodaysTasks ? "block" : "none" }}
        >
          {taskList.map((task) => (
            <TaskItem
              task={task}
              handleOpen={handleOpen}
              setCurrentTask={setCurrentTask}
            />
          ))}
        </Box>
      </Box>
      <Modal open={open} onClose={handleClose}>
        <TaskDetails task={currentTask} />
      </Modal>
    </Box>
  );
}
