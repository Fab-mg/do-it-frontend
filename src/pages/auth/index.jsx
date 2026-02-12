import { Box, Container, Paper } from "@mui/material";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import ForgotPasswordForm from "./components/ForgotPasswordForm";
import { useAuth } from "../../context/auth.context.jsx";

export default function Auth() {
  const [currentView, setCurrentView] = useState("login");
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from?.pathname || "/board";

  const handleLogin = async (credentials) => {
    let user = await login(credentials);
    if (user) {
      navigate(redirectTo, { replace: true });
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        bgcolor: "background.default",
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={3}
          sx={{
            width: "100%",
            p: { xs: 3, sm: 4 },
            borderRadius: 3,
          }}
        >
          {currentView === "login" && (
            <LoginForm
              onRegister={() => setCurrentView("register")}
              onForgotPassword={() => setCurrentView("forgot")}
              onLogin={handleLogin}
            />
          )}
          {currentView === "register" && (
            <RegisterForm onLogin={() => setCurrentView("login")} />
          )}
          {currentView === "forgot" && (
            <ForgotPasswordForm onBackToLogin={() => setCurrentView("login")} />
          )}
        </Paper>
      </Container>
    </Box>
  );
}
