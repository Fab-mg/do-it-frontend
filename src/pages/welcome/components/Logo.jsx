import { Box, Typography } from "@mui/material";
import logoPNG from "../../../assets/logo.png";

export default function Logo() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 2,
      }}
    >
      <Box
        component={"img"}
        src={logoPNG}
        alt="do_it_presentation"
        sx={{
          width: "150px",
          height: "auto",
          maxWidth: 400,
        }}
      />
      <Box>
        <Typography variant="h3" fontWeight={800}>
          DO-IT
        </Typography>
        <Typography variant="h6" fontWeight={800}>
          Turn chaos into clarity.
        </Typography>
      </Box>
    </Box>
  );
}
