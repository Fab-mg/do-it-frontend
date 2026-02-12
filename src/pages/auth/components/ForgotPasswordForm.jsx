import { Box, Button, Link, Stack, TextField, Typography } from "@mui/material";
import React from "react";

export default function ForgotPasswordForm({ onBackToLogin }) {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Stack spacing={2.5}>
        <Stack spacing={0.5}>
          <Typography variant="h5" fontWeight={800}>
            Forgot password
          </Typography>
          <Typography color="text.secondary">
            Enter your email to receive reset instructions.
          </Typography>
        </Stack>

        <TextField label="Email" name="email" type="email" required fullWidth />

        <Button type="submit" variant="contained" size="large" fullWidth>
          Send reset link
        </Button>

        <Stack direction="row" justifyContent="center">
          <Link
            component="button"
            type="button"
            underline="hover"
            onClick={onBackToLogin}
          >
            Back to login
          </Link>
        </Stack>
      </Stack>
    </Box>
  );
}
