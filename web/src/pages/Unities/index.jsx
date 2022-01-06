import {
  Button,
  Dialog,
  DialogContent,
  Grid,
  IconButton,
  DialogActions,
  TextField,
} from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import { useEffect, useState } from "react";
import unityService from "../../services/unityService";
import { Delete, Edit } from "@material-ui/icons";
import InputMask from "react-input-mask";

export default function Unities() {
  const [rows, setRows] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [idEdit, setIdEdit] = useState();
  const [unity, setUnity] = useState({});
  const columns = [
    {
      field: "name",
      headerName: "Nome",
      align: "center",
      headerAlign: "center",
      width: window.innerWidth * 0.18,
    },
    {
      field: "district",
      headerName: "Bairro",
      align: "center",
      headerAlign: "center",
      width: window.innerWidth * 0.18,
    },
    {
      field: "city",
      headerName: "Cidade",
      align: "center",
      headerAlign: "center",
      width: window.innerWidth * 0.18,
    },
    {
      field: "state",
      headerName: "Estado",
      align: "center",
      headerAlign: "center",
      width: window.innerWidth * 0.18,
    },
    {
      field: "options",
      headerName: "Opções",
      width: window.innerWidth * 0.18,
      renderCell: (gridParams) => {
        const { name, city, district, state, id } = gridParams.row;
        return (
          <div>
            <IconButton
              onClick={() => {
                setUnity({
                  name,
                  city,
                  district,
                  state,
                });
                handleEdit(id);
              }}
            >
              <Edit />
            </IconButton>
            <IconButton
              onClick={() => {
                if (window.confirm("Deseja apagar esse item?")) {
                  handleDelete(id);
                }
              }}
            >
              <Delete />
            </IconButton>
          </div>
        );
      },
    },
  ];

  async function fetchUnities() {
    const response = await unityService.getList();
    if (response !== null) {
      setRows(response.data || []);
    }
  }

  function handleEdit(id) {
    setIdEdit(id);
    setOpenEdit(true);
  }

  async function handleDelete(id) {
    const response = await unityService.deleteUnity(id);
    if (response !== null) {
      await fetchUnities();
    } else
      alert("Não foi possível deletar porque a unidade consta nos registros.");
  }

  async function updateUnity() {
    let response = await unityService.editUnity(idEdit, unity);
    if (response === null) alert("Ocorreu um erro");
  }

  async function addUnity() {
    let response = await unityService.addUnity(unity);
    if (response === null) alert("Ocorreu um erro");
  }

  useEffect(() => {
    fetchUnities();
  }, [fetchUnities]);

  return (
    <div>
      <Grid container justifyContent="center">
        <Button
          color="secondary"
          variant="contained"
          style={{ margin: 20 }}
          onClick={() => {
            setIdEdit();
            setOpenEdit(true);
          }}
        >
          Adicionar
        </Button>
      </Grid>
      <DataGrid
        rows={rows}
        columns={columns}
        style={{ height: "80vh", width: "90vw" }}
        hideFooter
      />
      <Dialog
        onClose={() => {
          setOpenEdit(false);
          setUnity();
        }}
        open={openEdit}
        maxWidth="md"
        fullWidth
      >
        <DialogContent style={{ marginBottom: 30 }}>
          <Grid container direction="column" spacing={3}>
            <Grid item container spacing={2}>
              <Grid item xs={6} sm={6} md={6}>
                <TextField
                  fullWidth
                  label="Nome"
                  defaultValue={unity?.name}
                  size="small"
                  variant="outlined"
                  onChange={(event) => {
                    setUnity({ ...unity, name: event.target.value });
                  }}
                />
              </Grid>
              <Grid item xs={6} sm={6} md={6}>
                <TextField
                  fullWidth
                  label="Bairro"
                  defaultValue={unity?.district}
                  size="small"
                  variant="outlined"
                  onChange={(event) => {
                    setUnity({ ...unity, district: event.target.value });
                  }}
                />
              </Grid>
            </Grid>
            <Grid item container spacing={2}>
              <Grid item xs={6} sm={6} md={6}>
                <TextField
                  fullWidth
                  label="Cidade"
                  defaultValue={unity?.city}
                  size="small"
                  variant="outlined"
                  onChange={(event) => {
                    setUnity({ ...unity, city: event.target.value });
                  }}
                />
              </Grid>
              <Grid item xs={6} sm={6} md={6}>
                <InputMask
                  mask="aa"
                  value={unity?.state}
                  onChange={(event) => {
                    setUnity({ ...unity, state: event.target.value });
                  }}
                >
                  {() => (
                    <TextField
                      fullWidth
                      label="Estado"
                      size="small"
                      variant="outlined"
                    />
                  )}
                </InputMask>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEdit(false)} color="primary">
            Voltar
          </Button>
          <Button
            onClick={async () => {
              if (idEdit) await updateUnity();
              else await addUnity();
              await fetchUnities();
              setOpenEdit(false);
            }}
            color="primary"
            variant="contained"
          >
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
