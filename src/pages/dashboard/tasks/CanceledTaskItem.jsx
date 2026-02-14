import { Box, Typography } from "@mui/material";
import CachedIcon from "@mui/icons-material/Cached";
import { formatDescription } from "../../../utils/task.format";
import { useTask } from "../../../context/task.context";
import { useAuth } from "../../../context/auth.context";
import ButtonOrLoader from "../../../components/ButtonOrLoader";
import { useState } from "react";

export function CanceledTaskItem({ setCurrentTask, handleOpen, task }) {
  const { resumeTask } = useTask();
  const { token } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const handleResumeTask = async () => {
    setIsProcessing(true);
    let resumed = await resumeTask(task._id, token);
    setIsProcessing(false);
    if (!resumed) {
      window.alert("An error occured, failed to restore task");
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
        width: "100%",
        width: { xs: "90%" },
        minWidth: 0,
        boxSizing: "border-box",
        ":hover": {
          // backgroundColor: "#f4f5f7",
          // // border: "1px solid white",
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
        <Box sx={{ minWidth: 0 }}>
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: "550", overflowWrap: "anywhere" }}
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
      <Box sx={{ flexShrink: 0 }}>
        <ButtonOrLoader
          button={<CachedIcon onClick={handleResumeTask} />}
          loading={isProcessing}
        />
      </Box>
    </Box>
  );
}
