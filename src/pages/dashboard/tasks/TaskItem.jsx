import { Box, Button, Checkbox, colors, Typography } from "@mui/material";
import { formatDescription } from "../../../utils/task.format";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { useAuth } from "../../../context/auth.context";
import { useTask } from "../../../context/task.context";
import ArchiveIcon from "@mui/icons-material/Archive";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";

export function TaskItem({ setCurrentTask, handleOpen, task }) {
  const [checkedTask, setCheckedTask] = useState(false);
  const { finishTask, archiveTask, cancelTask } = useTask();
  const { token } = useAuth();

  const handleFinishTask = async () => {
    let finished = await finishTask(task._id, token);
    if (finished) {
      setCheckedTask(false);
    } else {
      window.alert("An error occured, failed to end task");
    }
  };

  const handleArchiveTask = async () => {
    let archived = await archiveTask(task._id, token);
    if (!archived) {
      window.alert("An error occured, failed to archive task");
    }
  };

  const handleCancelTask = async () => {
    let canceled = await cancelTask(task._id, token);
    if (!canceled) {
      window.alert("An error occured, failed to cancel task");
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
        ":hover": {
          backgroundColor: "#f4f5f7",
          // border: "1px solid white",
          boxShadow: "0px 4px 10px 0px rgba(0,0,0,0.2)",
          borderRadius: "5px",
        },
      }}
      key={task._id}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          cursor: "pointer",
        }}
      >
        {task.status === "finished" ? (
          <DoneIcon sx={{ marginRight: 2, padding: 1 }} />
        ) : (
          <Checkbox
            onChange={(e) => {
              console.log(e.target.checked);
              setCheckedTask(e.target.checked);
            }}
            checked={checkedTask}
          />
        )}
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
      {task.status === "finished" ? (
        <Box>
          {" "}
          <ArchiveIcon onClick={handleArchiveTask} />
        </Box>
      ) : (
        <Box>
          {checkedTask ? (
            <Box>
              <Button onClick={handleFinishTask}>Finish Task</Button>
            </Box>
          ) : (
            <Box sx={{ display: "flex", gap: 2 }}>
              {<EditIcon />}
              <CloseIcon onClick={handleCancelTask} />
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
}
