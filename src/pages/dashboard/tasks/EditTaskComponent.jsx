import {
  Box,
  Button,
  IconButton,
  InputBase,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useEffect, useState } from "react";
import { useTask } from "../../../context/task.context";
import { useAuth } from "../../../context/auth.context";
import { toInputDate } from "../../../utils/date";
import ButtonOrLoader from "../../../components/ButtonOrLoader";

export function EditTaskComponent({ task }) {
  const { editTask } = useTask();
  const { token } = useAuth();
  const [openModal, setOpenModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formValues, setFormValues] = useState({
    title: "",
    description: "",
    expectedFinish: "",
  });

  const getTaskFormValues = () => ({
    title: task?.title || "",
    description: task?.description || "",
    expectedFinish: toInputDate(task?.expectedFinish),
  });

  const syncFormWithTask = () => {
    const nextValues = getTaskFormValues();
    setFormValues({
      title: nextValues.title,
      description: nextValues.description,
      expectedFinish: nextValues.expectedFinish,
    });
  };

  useEffect(() => {
    if (openModal) {
      setFormValues({
        title: task?.title || "",
        description: task?.description || "",
        expectedFinish: toInputDate(task?.expectedFinish),
      });
    }
  }, [task, openModal]);

  const updateField = (field) => (event) => {
    setFormValues((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleOpen = () => {
    syncFormWithTask();
    setOpenModal(true);
  };

  const handleClose = () => {
    if (isSubmitting) {
      return;
    }
    setOpenModal(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const title = formValues.title.trim();
    if (!title || !formValues.expectedFinish) {
      return;
    }
    setIsSubmitting(true);
    try {
      const updated = await editTask(
        task._id,
        {
          title,
          description: formValues.description.trim() || null,
          expectedFinish: formValues.expectedFinish,
        },
        token,
      );
      if (updated) {
        setOpenModal(false);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <IconButton size="small" onClick={handleOpen} aria-label="Edit task">
        <EditIcon />
      </IconButton>
      <Modal open={openModal} onClose={handleClose}>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "90%", sm: 520 },
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography variant="h6" fontWeight={700}>
            Edit task
          </Typography>
          <InputBase
            placeholder="Task title"
            value={formValues.title}
            onChange={updateField("title")}
            sx={{ fontSize: "1rem" }}
          />
          <TextField
            label="Description"
            placeholder="Optional description"
            multiline
            minRows={3}
            value={formValues.description}
            onChange={updateField("description")}
          />
          <TextField
            label="End date"
            type="date"
            value={formValues.expectedFinish}
            onChange={updateField("expectedFinish")}
            InputLabelProps={{ shrink: true }}
          />
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
            <Button onClick={handleClose} disabled={isSubmitting}>
              Cancel
            </Button>
            <ButtonOrLoader
              loading={isSubmitting}
              button={
                <Button
                  type="submit"
                  variant="contained"
                  disabled={isSubmitting}
                >
                  Save changes
                </Button>
              }
            />
          </Box>
        </Box>
      </Modal>
    </>
  );
}
