import { Box, Button, Checkbox, Typography } from "@mui/material";
import { formatDescription } from "../../../utils/task.format";
import { useState } from "react";
import { useAuth } from "../../../context/auth.context";
import { useTask } from "../../../context/task.context";
import ArchiveIcon from "@mui/icons-material/Archive";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import { EditTaskComponent } from "./EditTaskComponent";
import ButtonOrLoader from "../../../components/ButtonOrLoader";

export function TaskItem({ setCurrentTask, handleOpen, task }) {
  const [checkedTask, setCheckedTask] = useState(false);
  const { finishTask, archiveTask, cancelTask } = useTask();
  const { token } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFinishTask = async () => {
    setIsProcessing(true);
    let finished = await finishTask(task._id, token);
    setIsProcessing(false);
    if (finished) {
      setCheckedTask(false);
    } else {
      window.alert("An error occured, failed to end task");
    }
  };

  const handleArchiveTask = async () => {
    setIsProcessing(true);
    let archived = await archiveTask(task._id, token);
    setIsProcessing(false);
    if (!archived) {
      window.alert("An error occured, failed to archive task");
    }
  };

  const handleCancelTask = async () => {
    setIsProcessing(true);
    let canceled = await cancelTask(task._id, token);
    setIsProcessing(false);
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
        gap: 1.5,
        px: { xs: 1, sm: 2 },
        py: 1,
        width: { xl: "90%", md: "90%", xs: "100%" },
        minWidth: 0,
        boxSizing: "border-box",
        ":hover": {
          // backgroundColor: "#f4f5f7",
          // boxShadow: "0px 4px 10px 0px rgba(0,0,0,0.2)",
          // borderRadius: "5px",
          color: "blue",
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
          minWidth: 0,
          flex: 1,
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
        <Box sx={{ minWidth: 0 }}>
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: "550",
              overflowWrap: "anywhere",
              fontSize: { xs: "16px" },
              overflow: { xs: "hidden" },
              textOverflow: { xs: "ellipsis" },
              whiteSpace: { xs: "nowrap" },
            }}
            onClick={() => {
              setCurrentTask(task);
              handleOpen();
            }}
          >
            {task.title}
          </Typography>
          <Typography
            variant="caption"
            sx={{
              display: "block",
              overflowWrap: "anywhere",
              display: { xs: "none" },
            }}
            onClick={() => {
              setCurrentTask(task);
              handleOpen();
            }}
          >
            {formatDescription(task.description)}
          </Typography>
        </Box>
      </Box>
      {task.status === "finished" ? (
        <Box sx={{ flexShrink: 0 }}>
          {" "}
          <ButtonOrLoader
            button={<ArchiveIcon onClick={handleArchiveTask} />}
            loading={isProcessing}
          />
        </Box>
      ) : (
        <Box sx={{ flexShrink: 0 }}>
          {checkedTask ? (
            <Box>
              <ButtonOrLoader
                button={<Button onClick={handleFinishTask}>Finish Task</Button>}
                loading={isProcessing}
              />
            </Box>
          ) : (
            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              <EditTaskComponent task={task} />
              <ButtonOrLoader
                button={<CloseIcon onClick={handleCancelTask} />}
                loading={isProcessing}
              />
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
}
