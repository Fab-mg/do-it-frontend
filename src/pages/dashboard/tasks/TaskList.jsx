import { Box, Checkbox, Typography, Modal } from "@mui/material";
import { useTask } from "../../../context/task.context";
import { useEffect, useState } from "react";
import { formatDescription } from "../../../utils/task.format";
import TaskDetails from "./TaskDetails";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function TaskList() {
  const { getAllTasks, taskList } = useTask();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [currentTask, setCurrentTask] = useState(null);

  useEffect(() => {
    getAllTasks();
  }, []);

  if (taskList.length <= 0) {
    return (
      <Box>
        <Typography variant="h4">No task yet</Typography>
      </Box>
    );
  }
  return (
    <Box>
      {taskList.map((task) => {
        console.log("🚀 ~ TaskList ~ task:", task);
        return (
          <Box
            sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
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
      })}
      <Modal open={open} onClose={handleClose}>
        <TaskDetails task={currentTask} />
      </Modal>
    </Box>
  );
}
