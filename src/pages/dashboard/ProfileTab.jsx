import { Avatar, Box, Stack, Typography } from "@mui/material";
import { useAuth } from "../../context/auth.context";

const getDisplayName = (user) =>
  user?.name || user?.fullName || user?.username || user?.email || "User";

export default function ProfileTab() {
  const { user } = useAuth();
  const displayName = getDisplayName(user);
  const userEmail = user?.email || "No email available";

  return (
    <Box>
      <Typography variant="h5" fontWeight={800} gutterBottom>
        Profile
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Account details and workspace info.
      </Typography>

      <Box
        sx={{
          maxWidth: 540,
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 3,
          p: 3,
          bgcolor: "background.paper",
        }}
      >
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar sx={{ width: 56, height: 56, fontWeight: 700 }}>
            {displayName.charAt(0).toUpperCase()}
          </Avatar>
          <Box>
            <Typography variant="h6" fontWeight={700}>
              {displayName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {userEmail}
            </Typography>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}
