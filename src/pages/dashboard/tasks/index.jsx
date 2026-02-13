import { Box, Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import TaskList from "./TaskList";
import { CreateNewTask } from "./CreateTasks";
import { useTask } from "../../../context/task.context";
import TodayIcon from "@mui/icons-material/Today";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import RunningWithErrorsIcon from "@mui/icons-material/RunningWithErrors";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import { useAuth } from "../../../context/auth.context";
import EventBusyIcon from "@mui/icons-material/EventBusy";

export default function TaskTab() {
  const {
    getTodaysTasks,
    getOngoingTasks,
    getFinishedTasks,
    getCanceledTasks,
    ongoingTasks,
    cancelledTasks,
    finishedTasks,
    todaysTaskList,
  } = useTask();
  const { token, user } = useAuth();
  useEffect(() => {
    getTodaysTasks(token);
    getOngoingTasks(token);
    getFinishedTasks(token);
    getCanceledTasks(token);
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
              Hello, {user.firstName}!
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
          taskList={todaysTaskList}
          label={"Today"}
          icon={<TodayIcon sx={{ marginRight: "4px" }} />}
        />
        <TaskList
          taskList={ongoingTasks}
          label={"Ongoing tasks"}
          icon={<AccessTimeIcon sx={{ marginRight: "4px" }} />}
        />
        {/* <TaskList
          taskList={taskList}
          label={"Late tasks"}
          icon={<RunningWithErrorsIcon sx={{ marginRight: "4px" }} />}
        /> */}
        <TaskList
          taskList={finishedTasks}
          label={"Completed tasks"}
          icon={<AssignmentTurnedInIcon sx={{ marginRight: "4px" }} />}
        />
        <TaskList
          taskList={cancelledTasks}
          label={"Canceled tasks"}
          icon={<EventBusyIcon sx={{ marginRight: "4px" }} />}
        />
      </Stack>
    </Box>
  );
}
