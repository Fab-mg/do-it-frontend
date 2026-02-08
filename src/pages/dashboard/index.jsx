import { Box, Container } from "@mui/material";
import React from "react";
import TaskTab from "./tasks";

export default function Dashboard() {
  return (
    <Container>
      <Box sx={{ display: "flex", flexDirection: "row", gap: 4 }}>
        <Box>smth</Box>
        <TaskTab />
      </Box>
    </Container>
  );
}
