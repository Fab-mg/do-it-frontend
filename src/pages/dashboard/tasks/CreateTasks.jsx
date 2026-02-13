import {
  Box,
  Button,
  InputBase,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useTask } from "../../../context/task.context";
import { useAuth } from "../../../context/auth.context";
import ButtonOrLoader from "../../../components/ButtonOrLoader";

export function CreateNewTask() {
  const { addTask } = useTask();
  const [openModal, setOpenModal] = useState(false);
  const { token } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formValues, setFormValues] = useState({
    title: "",
    description: "",
    expectedFinish: "",
  });

  const updateField = (field) => (event) => {
    setFormValues((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const title = formValues.title.trim();
    if (!title || !formValues.expectedFinish) {
      window.alert("please fill in form the fields");
      return;
    }
    setIsSubmitting(true);
    try {
      const created = await addTask(
        {
          title,
          description: formValues.description.trim() || null,
          expectedFinish: formValues.expectedFinish,
        },
        token,
      );
      if (created) {
        setFormValues({ title: "", description: "", expectedFinish: "" });
        setOpenModal(false);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Button variant="contained" onClick={() => setOpenModal(true)}>
        Add task
      </Button>
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
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
            Create new task
          </Typography>
          <InputBase
            placeholder="Task title"
            variant="standard"
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
            <Button onClick={() => setOpenModal(false)} disabled={isSubmitting}>
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
                  Create task
                </Button>
              }
            />
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
