import { Box, Button, Divider, Stack, Typography, alpha } from "@mui/material";
import AssignmentTurnedInRoundedIcon from "@mui/icons-material/AssignmentTurnedInRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import logoPNG from "../../../assets/logo.png";
import { useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const tabs = [
  { id: "profile", label: "Profile", icon: PersonOutlineRoundedIcon },
  { id: "tasks", label: "Tasks", icon: AssignmentTurnedInRoundedIcon },
];

export default function Sidebar({ activeTab, onChangeTab, onLogout }) {
  const [winSize, setWinSize] = useState(window.innerWidth);
  const [displayFullMenu, setDisplayFullMenu] = useState(false);
  useEffect(() => {
    console.log("🚀 ~ Sidebar ~ winSize:", winSize);
    setWinSize(window.innerWidth);
  }, []);
  if (winSize < 776 && !displayFullMenu) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          mx: "auto",
          // boxSizing: "border-box",
          // bgcolor: "background.paper",
          // borderRadius: 3,
          // border: "1px solid",
          // borderColor: "divider",
          // padding: 2,
        }}
      >
        <Stack direction="row" spacing={1.25} alignItems="center">
          <Box
            component="img"
            src={logoPNG}
            alt="Do It logo"
            sx={{ width: 42, height: 42, objectFit: "contain" }}
          />
          <Typography variant="h6" fontWeight={800}>
            DO-IT
          </Typography>
        </Stack>
        <MenuIcon onClick={() => setDisplayFullMenu(true)} />
      </Box>
    );
  }
  return (
    <Box
      sx={{
        width: { xs: "100%", md: 260 },
        minWidth: { xs: 0, md: 260 },
        boxSizing: "border-box",
        bgcolor: "background.paper",
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
        p: 2,
        display: "flex",
        flexDirection: "column",
        minHeight: { xs: "auto", md: "calc(100vh - 48px)" },
      }}
    >
      <Stack spacing={2}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            mx: "auto",
          }}
        >
          <Stack direction="row" spacing={1.25} alignItems="center">
            <Box
              component="img"
              src={logoPNG}
              alt="Do It logo"
              sx={{ width: 42, height: 42, objectFit: "contain" }}
            />
            <Typography variant="h6" fontWeight={800}>
              DO-IT
            </Typography>
          </Stack>
          <CloseIcon
            onClick={() => setDisplayFullMenu(false)}
            sx={{ display: { md: "none", xl: "none" } }}
          />
        </Box>
        <Divider />
        <Stack spacing={1}>
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <Button
                key={tab.id}
                onClick={() => onChangeTab(tab.id)}
                fullWidth
                startIcon={<Icon />}
                sx={{
                  justifyContent: "flex-start",
                  textTransform: "none",
                  borderRadius: 2,
                  px: 1.5,
                  py: 1,
                  color: isActive ? "primary.main" : "text.primary",
                  backgroundColor: isActive
                    ? (theme) => alpha(theme.palette.primary.main, 0.12)
                    : "transparent",
                  "&:hover": {
                    backgroundColor: isActive
                      ? (theme) => alpha(theme.palette.primary.main, 0.18)
                      : "action.hover",
                  },
                }}
              >
                {tab.label}
              </Button>
            );
          })}
        </Stack>
      </Stack>

      <Button
        onClick={onLogout}
        variant="outlined"
        color="error"
        fullWidth
        startIcon={<LogoutRoundedIcon />}
        sx={{ mt: { xs: 2, md: "auto" }, textTransform: "none" }}
      >
        Logout
      </Button>
    </Box>
  );
}
