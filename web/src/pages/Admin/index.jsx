import { Box, Tab, Tabs } from "@material-ui/core";
import { useState } from "react";
import Students from "../Persons";
import Unities from "../Unities";
import Vaccine from "../Vaccines";

export default function Admin() {
  const [value, setValue] = useState(0);
  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  function TabActive() {
    switch (value) {
      case 0:
        return <Students />;
      case 1:
        return <Vaccine />;
      case 2:
        return <Unities />;
      case 3:
        return <div></div>;
      default:
        return <></>;
    }
  }

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
        <Tab label="Pessoas" />
        <Tab label="Vacinas" />
        <Tab label="Unidades" />
        <Tab label="Registro" />
      </Tabs>
      <TabActive />
    </Box>
  );
}
