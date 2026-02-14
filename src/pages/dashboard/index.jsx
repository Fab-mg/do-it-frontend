import { Box } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TaskTab from "./tasks";
import { useAuth } from "../../context/auth.context";
import Sidebar from "./sideNav/Sidebar";
import ProfileTab from "./profile";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("tasks");
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/auth", { replace: true });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        maxWidth: "100vw",
        boxSizing: "border-box",
        overflowX: "hidden",
        bgcolor: "#f5f7fb",
        p: { xs: 2, md: 3 },
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 2,
          minWidth: 0,
        }}
      >
        <Sidebar
          activeTab={activeTab}
          onChangeTab={setActiveTab}
          onLogout={handleLogout}
        />
        <Box
          sx={{
            flex: 1,
            minWidth: 0,
            borderRadius: 3,
            bgcolor: "background.paper",
            border: "1px solid",
            borderColor: "divider",
            p: { xs: 2, md: 3 },
            overflowX: "hidden",
            // minHeight: { xs: "auto", md: "calc(100vh - 48px)" },
          }}
        >
          {activeTab === "tasks" ? <TaskTab /> : <ProfileTab />}
        </Box>
      </Box>
    </Box>
  );
}
