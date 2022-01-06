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
import vaccineService from "../../services/vaccineService";
import { formatDate } from "../../utils/functions";
import { Delete, Edit } from "@material-ui/icons";
import InputMask from "react-input-mask";

export default function Vaccines() {
  const [rows, setRows] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [idEdit, setIdEdit] = useState();
  const [vaccine, setVaccine] = useState({});
  const columns = [
    {
      field: "name",
      headerName: "Nome",
      align: "center",
      headerAlign: "center",
      width: window.innerWidth * 0.18,
    },
    {
      field: "fabricator",
      headerName: "Fabricante",
      align: "center",
      headerAlign: "center",
      width: window.innerWidth * 0.18,
    },
    {
      field: "country",
      headerName: "País",
      align: "center",
      headerAlign: "center",
      width: window.innerWidth * 0.13,
    },
    {
      field: "dose",
      headerName: "Doses",
      align: "center",
      headerAlign: "center",
      width: window.innerWidth * 0.14,
    },
    {
      field: "update_at",
      headerName: "Atualizado em",
      align: "center",
      headerAlign: "center",
      width: window.innerWidth * 0.13,
      renderCell: (gridParams) => {
        const { update_at } = gridParams.row;
        return <div>{formatDate(update_at)}</div>;
      },
    },
    {
      field: "options",
      headerName: "Opções",
      width: window.innerWidth * 0.13,
      renderCell: (gridParams) => {
        const { name, fabricator, country, dose, id } = gridParams.row;
        return (
          <div>
            <IconButton
              onClick={() => {
                setVaccine({
                  name,
                  fabricator,
                  country,
                  dose,
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

  async function fetchVaccines() {
    const response = await vaccineService.getList();
    if (response !== null) {
      setRows(response.data || []);
    }
  }

  function handleEdit(id) {
    setIdEdit(id);
    setOpenEdit(true);
  }

  async function handleDelete(id) {
    const response = await vaccineService.deleteVaccine(id);
    if (response !== null) {
      await fetchVaccines();
    } else
      alert("Não foi possível deletar porque a vacina consta nos registros.");
  }

  async function updateVaccine() {
    let response = await vaccineService.editVaccine(idEdit, vaccine);
    if (response === null) alert("Ocorreu um erro");
  }

  async function addVaccine() {
    let response = await vaccineService.addVaccine(vaccine);
    if (response === null) alert("Ocorreu um erro");
  }

  useEffect(() => {
    fetchVaccines();
  }, [fetchVaccines]);

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
          setVaccine();
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
                  defaultValue={vaccine?.name}
                  size="small"
                  variant="outlined"
                  onChange={(event) => {
                    setVaccine({ ...vaccine, name: event.target.value });
                  }}
                />
              </Grid>
              <Grid item xs={6} sm={6} md={6}>
                <TextField
                  fullWidth
                  label="Fabricante"
                  defaultValue={vaccine?.fabricator}
                  size="small"
                  variant="outlined"
                  onChange={(event) => {
                    setVaccine({ ...vaccine, fabricator: event.target.value });
                  }}
                />
              </Grid>
            </Grid>
            <Grid item container spacing={2}>
              <Grid item xs={6} sm={6} md={6}>
                <TextField
                  fullWidth
                  label="País"
                  defaultValue={vaccine?.country}
                  size="small"
                  variant="outlined"
                  onChange={(event) => {
                    setVaccine({ ...vaccine, country: event.target.value });
                  }}
                />
              </Grid>
              <Grid item xs={6} sm={6} md={6}>
                <InputMask
                  mask="9"
                  defaultValue={vaccine?.dose}
                  onChange={(event) => {
                    setVaccine({ ...vaccine, dose: event.target.value });
                  }}
                >
                  {() => (
                    <TextField
                      fullWidth
                      label="Doses"
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
              if (idEdit) await updateVaccine();
              else await addVaccine();
              await fetchVaccines();
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
