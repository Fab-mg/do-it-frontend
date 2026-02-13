import { Box, Button, Container, Stack, Typography } from "@mui/material";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import { useNavigate } from "react-router-dom";
import logoPNG from "../../assets/logo.png";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        background:
          "radial-gradient(circle at top right, #e0f2fe 0%, #f8fafc 45%, #dbeafe 100%)",
      }}
    >
      <Container maxWidth="sm">
        <Box
          sx={{
            borderRadius: 4,
            p: { xs: 3, sm: 4 },
            bgcolor: "background.paper",
            border: "1px solid",
            borderColor: "divider",
            boxShadow: "0 16px 48px rgba(2, 6, 23, 0.12)",
          }}
        >
          <Stack spacing={2.5} alignItems="center" textAlign="center">
            <Box
              component="img"
              src={logoPNG}
              alt="Do It logo"
              sx={{ width: 92, height: 92, objectFit: "contain" }}
            />
            <Typography
              variant="overline"
              sx={{ letterSpacing: 2, color: "text.secondary", fontWeight: 700 }}
            >
              ERROR 404
            </Typography>
            <Typography variant="h4" fontWeight={800}>
              Page not found
            </Typography>
            <Typography color="text.secondary">
              This page does not exist or may have been moved.
            </Typography>
            <Button
              variant="contained"
              size="large"
              startIcon={<HomeRoundedIcon />}
              onClick={() => navigate("/")}
              sx={{ borderRadius: 3, px: 3, textTransform: "none" }}
            >
              Return to welcome
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
