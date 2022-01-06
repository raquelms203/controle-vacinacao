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
import personService from "../../services/personService";
import { formatDate } from "../../utils/functions";
import { Delete, Edit } from "@material-ui/icons";
import InputMask from "react-input-mask";
import "./styles.css";

export default function Persons() {
  const [rows, setRows] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [idEdit, setIdEdit] = useState();
  const [person, setPerson] = useState({});
  const columns = [
    {
      field: "name",
      headerName: "Nome",
      align: "center",
      headerAlign: "center",
      width: window.innerWidth * 0.13,
    },
    {
      field: "district",
      headerName: "Bairro",
      align: "center",
      headerAlign: "center",
      width: window.innerWidth * 0.13,
    },
    {
      field: "city",
      headerName: "Cidade",
      align: "center",
      headerAlign: "center",
      width: window.innerWidth * 0.13,
      renderCell: (gridParams) => {
        const { city, state } = gridParams.row;
        return (
          <div>
            {city} - {state}
          </div>
        );
      },
    },
    {
      field: "birth_date",
      headerName: "Data de Nascimento",
      align: "center",
      headerAlign: "center",
      width: window.innerWidth * 0.14,
      renderCell: (gridParams) => {
        const { birth_date } = gridParams.row;
        return <div>{formatDate(birth_date, false)}</div>;
      },
    },
    {
      field: "cpf",
      headerName: "CPF",
      align: "center",
      headerAlign: "center",
      width: window.innerWidth * 0.13,
      renderCell: (gridParams) => {
        const { cpf } = gridParams.row;
        return (
          <InputMask mask="999.999.999-99" value={cpf}>
            {() => (
              <TextField
                size="small"
                fullWidth
                variant="standard"
                InputProps={{
                  disableUnderline: true,
                  inputProps: {
                    style: {
                      textAlign: "center",
                    },
                  },
                }}
              ></TextField>
            )}
          </InputMask>
        );
      },
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
        const { name, birth_date, cpf, district, state, city, id } =
          gridParams.row;
        return (
          <div>
            <IconButton
              onClick={() => {
                setPerson({
                  name,
                  birth_date,
                  cpf,
                  district,
                  state,
                  city,
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

  async function fetchPersons() {
    const response = await personService.getList();
    if (response !== null) {
      setRows(response.data);
    }
  }
  function handleEdit(id) {
    setIdEdit(id);
    setOpenEdit(true);
  }

  async function handleDelete(id) {
    const response = await personService.deletePerson(id);
    if (response !== null) {
      await fetchPersons();
    } else
      alert("Não foi possível deletar porque o paciente consta nos registros.");
  }

  async function updatePerson() {
    let response = await personService.editPerson(idEdit, person);
    if (response === null) alert("Ocorreu um erro");
  }

  async function addPerson() {
    let response = await personService.addPerson(person);
    if (response === null) alert("Ocorreu um erro");
  }

  useEffect(() => {
    fetchPersons();
  }, [fetchPersons]);

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
          setPerson({});
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
                  defaultValue={person?.name}
                  size="small"
                  variant="outlined"
                  onChange={(event) => {
                    setPerson({ ...person, name: event.target.value });
                  }}
                />
              </Grid>
              <Grid item xs={6} sm={6} md={6}>
                <TextField
                  fullWidth
                  label="Bairro"
                  defaultValue={person?.district}
                  size="small"
                  variant="outlined"
                  onChange={(event) => {
                    setPerson({ ...person, district: event.target.value });
                  }}
                />
              </Grid>
            </Grid>
            <Grid item container spacing={2}>
              <Grid item xs={6} sm={6} md={6}>
                <TextField
                  fullWidth
                  label="Cidade"
                  defaultValue={person?.city}
                  size="small"
                  variant="outlined"
                  onChange={(event) => {
                    setPerson({ ...person, city: event.target.value });
                  }}
                />
              </Grid>
              <Grid item xs={6} sm={6} md={6}>
                <InputMask
                  mask="aa"
                  value={person?.state}
                  onChange={(event) => {
                    setPerson({ ...person, state: event.target.value });
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
            <Grid item container spacing={2}>
              <Grid item xs={6} sm={6} md={6}>
                <InputMask
                  mask="999.999.999-99"
                  defaultValue={person?.cpf}
                  onChange={(event) => {
                    setPerson({ ...person, cpf: event.target.value });
                  }}
                >
                  {() => (
                    <TextField
                      fullWidth
                      label="CPF"
                      size="small"
                      variant="outlined"
                    />
                  )}
                </InputMask>
              </Grid>
              <Grid item xs={6} sm={6} md={6} style={{ marginTop: -22 }}>
                <label htmlFor="date" className="input-date">
                  Data de nascimento
                </label>
                <input
                  id="date"
                  style={{ height: 35, width: "100%" }}
                  type="date"
                  defaultValue={person?.birth_date?.substring(0, 10)}
                  onChange={(event) => {
                    setPerson({ ...person, birth_date: event.target.value });
                  }}
                />
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
              if (idEdit) await updatePerson();
              else await addPerson();
              await fetchPersons();
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
