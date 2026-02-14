import { Box, Chip, Divider, Stack, Typography } from "@mui/material";
import { formatDate } from "../../../utils/date";

const statusToColor = (status) => {
  switch (status) {
    case "finished":
      return "success";
    case "ongoing":
      return "info";
    case "cancelled":
      return "error";
    default:
      return "default";
  }
};

const DetailRow = ({ label, value }) => (
  <Stack direction="row" justifyContent="space-between" alignItems="center">
    <Typography variant="body2" color="text.secondary">
      {label}
    </Typography>
    <Typography variant="body2" fontWeight={600}>
      {value}
    </Typography>
  </Stack>
);

export default function TaskDetails({ task }) {
  if (!task) {
    return null;
  }

  return (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: { xs: "85%", sm: 540 },
        bgcolor: "background.paper",
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 3,
        boxShadow: 24,
        p: { xs: 2.5, sm: 3.5 },
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Stack direction="row" justifyContent="space-between" spacing={2}>
        <Typography variant="h6" fontWeight={800}>
          {task.title || "Untitled task"}
        </Typography>
        <Chip
          label={task.status}
          color={statusToColor(task.status)}
          size="small"
          sx={{ fontWeight: 700 }}
        />
      </Stack>

      <Box
        sx={{
          borderRadius: 2,
          border: "1px solid",
          borderColor: "divider",
          p: 1.5,
          bgcolor: "#fafbfc",
        }}
      >
        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
          Description
        </Typography>
        <Typography variant="body1">
          {task.description || "No description provided."}
        </Typography>
      </Box>

      <Divider />

      <Stack spacing={1}>
        <DetailRow
          label="Expected finish"
          value={formatDate(task.expectedFinish, false)}
        />
        {task.status === "finished" ? (
          <DetailRow label="Finished at" value={formatDate(task.finishedAt)} />
        ) : null}
      </Stack>
    </Box>
  );
}
