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
import registerService from "../../services/registerService";
import vaccineService from "../../services/vaccineService";
import unityService from "../../services/unityService";
import personService from "../../services/personService";
import { formatDate } from "../../utils/functions";
import { Delete, Edit } from "@material-ui/icons";
import InputMask from "react-input-mask";
import "./styles.css";

export default function Registers() {
  const [rows, setRows] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [idEdit, setIdEdit] = useState();
  const [register, setRegister] = useState({});
  const [listUnities, setListUnities] = useState([]);
  const [listPersons, setListPersons] = useState([]);
  const [listVaccines, setListVaccines] = useState([]);
  const columns = [
    {
      field: "person_name",
      headerName: "Paciente",
      align: "center",
      headerAlign: "center",
      width: window.innerWidth * 0.13,
    },
    {
      field: "vaccine_name",
      headerName: "Vacina",
      align: "center",
      headerAlign: "center",
      width: window.innerWidth * 0.13,
    },
    {
      field: "unity_name",
      headerName: "Unidade",
      align: "center",
      headerAlign: "center",
      width: window.innerWidth * 0.18,
    },
    {
      field: "dose_taken",
      headerName: "Dose",
      align: "center",
      headerAlign: "center",
      width: window.innerWidth * 0.13,
    },
    {
      field: "date",
      headerName: "Data",
      align: "center",
      headerAlign: "center",
      width: window.innerWidth * 0.08,
      renderCell: (gridParams) => {
        const { date } = gridParams.row;
        return <div>{formatDate(date, false)}</div>;
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
        const { person_id, unity_id, vaccine_id, id, dose, date } =
          gridParams.row;
        return (
          <div>
            <IconButton
              onClick={() => {
                setRegister({
                  person_id,
                  unity_id,
                  vaccine_id,
                  dose,
                  date,
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

  async function fetchRegisters() {
    const response = await registerService.getList();
    const responseVaccine = await vaccineService.getList();
    const responseUnity = await unityService.getList();
    const responsePerson = await personService.getList();
    if (response !== null) {
      setRows(response.data || []);
    }
    if (responseVaccine !== null) setListVaccines(responseVaccine.data);
    if (responseUnity !== null) setListUnities(responseUnity.data);
    if (responsePerson !== null) setListPersons(responsePerson.data);
  }

  function handleEdit(id) {
    setIdEdit(id);
    setOpenEdit(true);
  }

  async function handleDelete(id) {
    const response = await registerService.deleteRegister(id);
    if (response !== null) {
      await fetchRegisters();
    } else alert("Ocorreu um erro");
  }

  async function updateRegister() {
    let response = await registerService.editRegister(idEdit, register);
    if (response === null) alert("Ocorreu um erro");
  }

  async function addRegister() {
    let response = await registerService.addRegister(register);
    if (response === null) alert("Ocorreu um erro");
  }

  useEffect(() => {
    fetchRegisters();
    //eslint-disable-next-line
  }, []);

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
          setRegister();
        }}
        open={openEdit}
        maxWidth="md"
        fullWidth
      >
        <DialogContent style={{ marginBottom: 30 }}>
          <Grid container direction="column" spacing={3}>
            <Grid item container spacing={2}>
              <Grid item xs={12} sm={12} md={12}>
                <label>Paciente: </label>
                <select
                  value={register?.person_id}
                  onChange={(e) => {
                    setRegister({ ...register, person_id: e.target.value });
                  }}
                >
                  <option disabled selected value>
                    Selecione uma opção
                  </option>
                  {listPersons !== null &&
                    listPersons?.map((item, index) => (
                      <option key={index} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <label>Vacina: </label>
                <select
                  value={register?.vaccine_id}
                  onChange={(e) => {
                    setRegister({ ...register, vaccine_id: e.target.value });
                  }}
                >
                  <option disabled selected value>
                    Selecione uma opção
                  </option>
                  {listVaccines !== null &&
                    listVaccines?.map((item, index) => (
                      <option key={index} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <label>Unidade: </label>
                <select
                  value={register?.unity_id}
                  onChange={(e) => {
                    setRegister({ ...register, unity_id: e.target.value });
                  }}
                >
                  <option disabled selected value>
                    Selecione uma opção
                  </option>
                  {listUnities !== null &&
                    listUnities?.map((item, index) => (
                      <option key={index} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </Grid>
              <Grid item xs={6} sm={6} md={6}>
                <InputMask
                  mask="9"
                  defaultValue={register?.dose}
                  onChange={(event) => {
                    setRegister({
                      ...register,
                      dose: Number(event.target.value),
                    });
                  }}
                >
                  {() => (
                    <TextField
                      fullWidth
                      type="tel"
                      label="Dose"
                      size="small"
                      variant="outlined"
                    />
                  )}
                </InputMask>
              </Grid>
              <Grid item xs={6} sm={6} md={6} style={{ marginTop: -22 }}>
                <label htmlFor="date" className="input-date">
                  Data
                </label>
                <input
                  id="date"
                  style={{ height: 35, width: "100%" }}
                  type="date"
                  defaultValue={register?.date?.substring(0, 10)}
                  onChange={(event) => {
                    setRegister({ ...register, date: event.target.value });
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
              if (idEdit) await updateRegister();
              else await addRegister();
              await fetchRegisters();
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
