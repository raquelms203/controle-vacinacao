import { Box, Tab, Tabs } from "@material-ui/core";
import { useState } from "react";
import Students from "../Students";
import Subject from "../Subjects";

export default function Admin() {
  const [value, setValue] = useState(0);
  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        display: "flex",
        height: 224,
      }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        sx={{ borderRight: 1, borderColor: "divider" }}
      >
        <Tab label="Alunos" />
        <Tab label="Matrículas" />
      </Tabs>
      {value === 0 ? <Students /> : <Subject />}
    </Box>
  );
}
