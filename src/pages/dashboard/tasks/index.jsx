import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import TaskList from "./TaskList";
import { CreateNewTask } from "./CreateTasks";

export default function TaskTab() {
  return (
    <Box>
      <Stack spacing={3}>
        <Stack spacing={1}>
          <Typography variant="h5" fontWeight={800}>
            Hello, User!
          </Typography>
          <Typography variant="body1" color="text.secondary">
            What shall we do today?
          </Typography>
        </Stack>
        <CreateNewTask />
        <TaskList />
      </Stack>
    </Box>
  );
}
