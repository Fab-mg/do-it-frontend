import {
  Box,
  Container,
  Stack,
  Typography,
  Button,
  Paper,
} from "@mui/material";
import { blueGrey } from "@mui/material/colors";
// import presentationImg from "../../assets/logo.png";
import Logo from "./components/Logo";
import { useNavigate } from "react-router-dom";

export default function Welcome() {
  const navigate = useNavigate();
  const features = [
    { icon: "✅", text: "Create tasks in seconds" },
    { icon: "📌", text: "Set priorities and deadlines" },
    { icon: "📅", text: "Organize everything in one place" },
    { icon: "🔔", text: "Stay on track with reminders" },
    { icon: "📈", text: "Build momentum every day" },
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        // bgcolor: "red",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Container maxWidth="sm">
        <Stack spacing={4}>
          <Logo />
          <Stack spacing={1.5}>
            <Typography variant="h3" fontWeight={800}>
              Welcome to Do-it{" "}
              <span role="img" aria-label="wave">
                👋
              </span>
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
            {features.map((f) => (
              <Stack
                key={f.text}
                direction="row"
                spacing={1.5}
                alignItems="center"
              >
                <Box sx={{ fontSize: 18, lineHeight: 1 }}>{f.icon}</Box>
                <Typography>{f.text}</Typography>
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
              <Typography variant="h6" fontWeight={800}></Typography>
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
              sx={{
                borderRadius: 3,
                py: 1.5,
                fontWeight: 800,
                ":hover": { bgcolor: blueGrey },
              }}
              onClick={() => {
                // navigate to app / signup
                navigate("board");
              }}
            >
              Let’s get started
            </Button>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
