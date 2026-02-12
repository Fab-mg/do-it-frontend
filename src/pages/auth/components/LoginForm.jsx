import { Box, Button, Link, Stack, TextField, Typography } from "@mui/material";

export default function LoginForm({ onRegister, onForgotPassword, onLogin }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const payload = {
      email: String(formData.get("email") || ""),
      password: String(formData.get("password") || ""),
    };
    if (onLogin) {
      onLogin(payload);
    }
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

        <Button type="submit" variant="contained" size="large" fullWidth>
          Login
        </Button>

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Link
            component="button"
            type="button"
            underline="hover"
            onClick={onForgotPassword}
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
