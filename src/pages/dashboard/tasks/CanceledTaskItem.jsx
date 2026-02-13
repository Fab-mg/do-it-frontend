import { Box, Typography } from "@mui/material";
import CachedIcon from "@mui/icons-material/Cached";
import { formatDescription } from "../../../utils/task.format";
import { useTask } from "../../../context/task.context";
import { useAuth } from "../../../context/auth.context";

export function CanceledTaskItem({ setCurrentTask, handleOpen, task }) {
  const { resumeTask } = useTask();
  const { token } = useAuth();
  const handleResumeTask = async () => {
    let resumed = await resumeTask(task._id, token);
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
      <Box>
        <CachedIcon onClick={handleResumeTask} />
      </Box>
    </Box>
  );
}
