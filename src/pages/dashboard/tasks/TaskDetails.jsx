import { Box, Button, Typography } from "@mui/material";

export default function TaskDetails({ task }) {
  return (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "background.paper",
        border: "2px solid #000",
        borderRadius: "5px",
        boxShadow: 24,
        p: 4,
      }}
    >
      <Typography>{task.title}</Typography>
      <Typography>{task.description}</Typography>
      <Typography>{task.status}</Typography>
    </Box>
  );
}
