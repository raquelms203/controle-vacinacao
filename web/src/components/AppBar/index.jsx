import { AppBar, Box, Button, Container, Toolbar } from "@material-ui/core";

import { useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.png";
import "./styles.css";

export default function AppBarComponent() {
  const pages = ["Geral", "Administrativo"];
  const navigate = useNavigate();

  const handleChangeNav = (index) => {
    switch (index) {
      case 0:
        navigate("/");
        break;
      case 1:
        navigate("/login");
        break;
      default:
        navigate("/");
        break;
    }
  };
  return (
    <AppBar position="static" className="appbar">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <img src={Logo} alt="logo" />
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page, index) => (
              <Button
                className="appbar-item"
                key={page}
                onClick={() => handleChangeNav(index)}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
