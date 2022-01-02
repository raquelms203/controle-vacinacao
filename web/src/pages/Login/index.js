import { Button, CircularProgress, Grid, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import userService from "../../services/userService";
import "./styles.css";

export default function Login() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    let response = await userService.login(user);
    if (response === null) alert("E-mail ou senha incorreto(s).");
    else {
      navigate("/admin");
    }
    setLoading(false);
  };

  return loading ? (
    <div className="loading">
      <CircularProgress />
    </div>
  ) : (
    <form className="login-container" onSubmit={(e) => e.preventDefault()}>
      <Grid container direction="column" spacing={3}>
        <Grid item xs={12} sm={12} md={12}>
          <div style={{ fontSize: 20 }}>Faça o login para continuar</div>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <TextField
            fullWidth
            label="E-mail"
            size="small"
            variant="outlined"
            onChange={(event) => {
              setUser({ ...user, email: event.target.value });
            }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <TextField
            fullWidth
            label="Senha"
            type="password"
            size="small"
            variant="outlined"
            onChange={(event) => {
              setUser({ ...user, password: event.target.value });
            }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <Button
            type="submit"
            variant="contained"
            onClick={handleSubmit}
            color="primary"
            fullWidth
          >
            Entrar
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
