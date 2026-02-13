import {
  Alert,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { waitForBackendToWake } from "../../services/backend-status.service";
import Logo from "./components/Logo";
import EmbeddedPage from "../serverFrame";

export default function Welcome() {
  const navigate = useNavigate();
  const [isCheckingBackend, setIsCheckingBackend] = useState(false);
  const [backendMessage, setBackendMessage] = useState(
    "Checking backend status...",
  );
  const [backendError, setBackendError] = useState("");

  const features = [
    { icon: "\u2705", text: "Create tasks in seconds" },
    { icon: "\uD83D\uDCCC", text: "Set priorities and deadlines" },
    { icon: "\uD83D\uDCC5", text: "Organize everything in one place" },
    { icon: "\uD83D\uDD14", text: "Stay on track with reminders" },
    { icon: "\uD83D\uDCC8", text: "Build momentum every day" },
  ];

  const handleGetStarted = async () => {
    setBackendError("");
    setBackendMessage("Checking backend status...");
    setIsCheckingBackend(true);

    try {
      const wakeResult = await waitForBackendToWake({
        onPoll: ({ attempt }) => {
          if (attempt === 1) {
            setBackendMessage("Checking backend status...");
            return;
          }
          setBackendMessage("Backend is waking up. Please wait...");
        },
      });

      if (!wakeResult.ready) {
        setBackendError(
          "Backend is still sleeping. Please try again in a few seconds.",
        );
        return;
      }

      navigate("/auth", {
        state: {
          view: "login",
        },
      });
    } catch {
      setBackendError(
        "Could not reach backend right now. Please retry in a few seconds.",
      );
    } finally {
      setIsCheckingBackend(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Container maxWidth="sm">
        <Stack spacing={4}>
          <Logo />

          <Stack spacing={1.5}>
            <Typography variant="h3" fontWeight={800}>
              Welcome to Do-it
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Your new favorite way to stay organized and get things done.
            </Typography>
          </Stack>

          <Stack spacing={1}>
            <Typography variant="h5" fontWeight={700}>
              Simple. Fast. Effective.
            </Typography>
            <Typography color="text.secondary">
              TaskFlow helps you plan your day, track your goals, and manage
              your tasks without feeling overwhelmed.
            </Typography>
          </Stack>

          <Stack spacing={1.5}>
            {features.map((feature) => (
              <Stack
                key={feature.text}
                direction="row"
                spacing={1.5}
                alignItems="center"
              >
                <Box sx={{ minWidth: 30, fontSize: 18, lineHeight: 1 }}>
                  {feature.icon}
                </Box>
                <Typography>{feature.text}</Typography>
              </Stack>
            ))}
          </Stack>

          <Stack spacing={2}>
            <Box>
              <Typography variant="h6" fontWeight={800}>
                Turn chaos into clarity. One task at a time
              </Typography>
            </Box>
            <Box>
              <Typography color="text.secondary">
                Small steps lead to big progress. Start today and stay
                consistent.
              </Typography>
            </Box>
          </Stack>

          <Box sx={{ pt: 1 }}>
            <Button
              fullWidth
              size="large"
              variant="contained"
              disabled={isCheckingBackend}
              sx={{
                borderRadius: 3,
                py: 1.5,
                fontWeight: 800,
                ":hover": { bgcolor: blueGrey[700] },
              }}
              onClick={handleGetStarted}
            >
              Let&apos;s get started
            </Button>
          </Box>

          {backendError ? <Alert severity="error">{backendError}</Alert> : null}
        </Stack>
      </Container>

      <Backdrop
        open={isCheckingBackend}
        sx={{
          zIndex: (theme) => theme.zIndex.modal + 1,
          color: "#fff",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <CircularProgress color="inherit" />
        <Typography variant="h6">{backendMessage}</Typography>
        <Typography variant="body2" sx={{ opacity: 0.9 }}>
          Render service can take up to a minute to wake up.
          <EmbeddedPage />
        </Typography>
      </Backdrop>
    </Box>
  );
}
