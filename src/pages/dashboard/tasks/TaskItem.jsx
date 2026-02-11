import { Box, Checkbox, Typography } from "@mui/material";
import { formatDescription } from "../../../utils/task.format";

export function TaskItem({ setCurrentTask, handleOpen, task }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <Checkbox
        onChange={(e) => {
          console.log(e);
        }}
      />
      <Typography
        variant="subtitle1"
        sx={{ fontWeight: "550" }}
        onClick={() => {
          setCurrentTask(task);
          handleOpen();
        }}
      >
        {task.title}
      </Typography>
      <Typography variant="caption">
        {formatDescription(task.description)}
      </Typography>
    </Box>
  );
}
