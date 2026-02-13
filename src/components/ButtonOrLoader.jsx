import { Box, CircularProgress } from "@mui/material";

export default function ButtonOrLoader({ button, loading, size = 24 }) {
  if (loading) {
    return (
      <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <CircularProgress size={size} />
      </Box>
    );
  }

  return button;
}
