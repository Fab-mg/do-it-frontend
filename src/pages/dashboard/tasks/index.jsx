import { Box, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import TaskList from "./TaskList";
import { CreateNewTask } from "./CreateTasks";
import { useTask } from "../../../context/task.context";
import TodayIcon from "@mui/icons-material/Today";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import RunningWithErrorsIcon from "@mui/icons-material/RunningWithErrors";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";

export default function TaskTab() {
  const { getAllTasks, taskList } = useTask();
  useEffect(() => {
    getAllTasks();
  }, []);
  return (
    <Box sx={{ width: "100%" }}>
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            maxWidth: "100%",
            // bgcolor: "tomato",
          }}
        >
          <Stack spacing={1}>
            <Typography variant="h5" fontWeight={800}>
              Hello, User!
            </Typography>
            <Typography variant="body1" color="text.secondary">
              What is today's goal?
            </Typography>
          </Stack>
          <Box>
            <CreateNewTask />
          </Box>
        </Box>
        <TaskList
          taskList={taskList}
          label={"Today"}
          icon={<TodayIcon sx={{ marginRight: "4px" }} />}
        />
        <TaskList
          taskList={taskList}
          label={"Ongoing tasks"}
          icon={<AccessTimeIcon sx={{ marginRight: "4px" }} />}
        />
        <TaskList
          taskList={taskList}
          label={"Late tasks"}
          icon={<RunningWithErrorsIcon sx={{ marginRight: "4px" }} />}
        />
        <TaskList
          taskList={taskList}
          label={"Completed tasks"}
          icon={<AssignmentTurnedInIcon sx={{ marginRight: "4px" }} />}
        />
      </Stack>
    </Box>
  );
}
