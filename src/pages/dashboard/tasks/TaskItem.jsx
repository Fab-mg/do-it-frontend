import { Box, Button, Checkbox, Typography } from "@mui/material";
import { formatDescription } from "../../../utils/task.format";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { useAuth } from "../../../context/auth.context";
import { useTask } from "../../../context/task.context";

export function TaskItem({ setCurrentTask, handleOpen, task }) {
  const [checkedTask, setCheckedTask] = useState(false);
  const { finishTask } = useTask();
  const { token } = useAuth();

  const handleFinishTask = async () => {
    let finished = await finishTask(task._id, token);
    if (finished) {
      setCheckedTask(false);
    } else {
      window.alert("An error occured, failed to end task");
    }
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingLeft: 5,
        paddingRight: 10,
      }}
      key={task._id}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Checkbox
          onChange={(e) => {
            console.log(e.target.checked);
            setCheckedTask(e.target.checked);
          }}
          checked={checkedTask}
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
        <Typography
          variant="caption"
          sx={{ marginLeft: 1 }}
          onClick={() => {
            setCurrentTask(task);
            handleOpen();
          }}
        >
          {" - " + formatDescription(task.description)}
        </Typography>
      </Box>
      {checkedTask ? (
        <Box>
          <Button onClick={handleFinishTask}>Finish Task</Button>
        </Box>
      ) : (
        <Box sx={{ display: "flex", gap: 2 }}>
          <EditIcon />
          <DeleteIcon />
        </Box>
      )}
    </Box>
  );
}
