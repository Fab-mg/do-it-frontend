import { Box, Button, Link, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import ButtonOrLoader from "../../../components/ButtonOrLoader";

export default function LoginForm({ onRegister, onForgotPassword, onLogin }) {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoggingIn(false);
    const formData = new FormData(event.currentTarget);
    const payload = {
      email: String(formData.get("email") || ""),
      password: String(formData.get("password") || ""),
    };
    if (onLogin) {
      onLogin(payload);
    }
    setIsLoggingIn(false);
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Stack spacing={2.5}>
        <Stack spacing={0.5}>
          <Typography variant="h5" fontWeight={800}>
            Sign in
          </Typography>
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
