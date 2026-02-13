import { Box, Button, Link, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { registerUser } from "../../../services/user.service";
import ButtonOrLoader from "../../../components/ButtonOrLoader";

export default function RegisterForm({ onLogin }) {
  const [formData, setFormData] = useState({
    lastName: "",
    firstName: "",
    email: "",
    password: "",
  });
  const [isRegistering, setIsRegistering] = useState(false);

  const handleFormEdit = (fieldName, value) => {
    setFormData((prev) => ({ ...prev, [fieldName]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsRegistering(true);
    console.log("🚀 ~ RegisterForm ~ formData:", formData);
    let user = await registerUser(formData);
    console.log("🚀 ~ handleSubmit ~ user:", user);
    setIsRegistering(false);
    if (user) {
      onLogin();
    } else {
      window.alert("Failed to register account");
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Stack spacing={2.5}>
        <Stack spacing={0.5}>
          <Typography variant="h5" fontWeight={800}>
            Create account
          </Typography>
          <Typography color="text.secondary">
            Start managing your work with Do-it.
          </Typography>
        </Stack>

        <TextField
          label="First name"
          required
          fullWidth
          value={formData.firstName}
          onChange={(e) => {
            handleFormEdit("firstName", e.target.value);
          }}
        />
        <TextField
          label="Last name"
          required
          fullWidth
          value={formData.lastName}
          onChange={(e) => {
            handleFormEdit("lastName", e.target.value);
          }}
        />
        <TextField
          label="Email"
          type="email"
          required
          fullWidth
          value={formData.email}
          onChange={(e) => {
            handleFormEdit("email", e.target.value);
          }}
        />
        <TextField
          label="Password"
          type="password"
          required
          fullWidth
          value={formData.password}
          onChange={(e) => {
            handleFormEdit("password", e.target.value);
          }}
        />

        <ButtonOrLoader
          loading={isRegistering}
          button={
            <Button type="submit" variant="contained" size="large" fullWidth>
              Register
            </Button>
          }
        />

        <Stack direction="row" justifyContent="center">
          <Typography variant="body2" color="text.secondary">
            Already have an account?
          </Typography>
          <Link
            component="button"
            type="button"
            underline="hover"
            onClick={onLogin}
            sx={{ ml: 0.5 }}
          >
            Login
          </Link>
        </Stack>
      </Stack>
    </Box>
  );
}
