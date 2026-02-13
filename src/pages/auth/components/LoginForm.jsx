import { Box, Button, Link, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import ButtonOrLoader from "../../../components/ButtonOrLoader";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

export default function LoginForm({ onRegister, onForgotPassword, onLogin }) {
  const navigate = useNavigate();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoggingIn(true);
    const formData = new FormData(event.currentTarget);
    const payload = {
      email: String(formData.get("email") || ""),
      password: String(formData.get("password") || ""),
    };
    if (onLogin) {
      await onLogin(payload);
    }
    setIsLoggingIn(false);
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Stack spacing={2.5}>
        <Stack spacing={0.5}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 2,
            }}
          >
            <ArrowBackIcon onClick={() => navigate("/")} />
            <Typography variant="h5" fontWeight={800}>
              Sign in
            </Typography>
          </Box>
          <Typography color="text.secondary">
            Welcome back. Continue to your tasks.
          </Typography>
        </Stack>

        <TextField label="Email" name="email" type="email" required fullWidth />
        <TextField
          label="Password"
          name="password"
          type="password"
          required
          fullWidth
        />

        <ButtonOrLoader
          loading={isLoggingIn}
          button={
            <Button type="submit" variant="contained" size="large" fullWidth>
              Login
            </Button>
          }
        />

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Link
            component="button"
            type="button"
            underline="hover"
            sx={{ color: "grey" }}
            // onClick={onForgotPassword}
          >
            Forgot password?
          </Link>
          <Link
            component="button"
            type="button"
            underline="hover"
            onClick={onRegister}
          >
            Create account
          </Link>
        </Stack>
      </Stack>
    </Box>
  );
}
