import { Box, Button, Input, InputBase, TextField } from "@mui/material";
import { useState } from "react";

export function CreateNewTask() {
  const [showFields, setShowFields] = useState(false);
  return (
    <Box sx={{ width: "100vh" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          borderRadius: "4px",
          width: "90%",
          boxShadow: 2,
          paddingX: 3,
        }}
      >
        <InputBase
          placeholder="Create a new task"
          variant="standard"
          sx={{ width: "80%" }}
        />
        {showFields ? (
          <Button
            onClick={() => {
              setShowFields(false);
            }}
          >
            {" "}
            Cancel{" "}
          </Button>
        ) : (
          <Button
            onClick={() => {
              setShowFields(true);
            }}
          >
            {" "}
            Create new task{" "}
          </Button>
        )}{" "}
      </Box>
    </Box>
  );
}
