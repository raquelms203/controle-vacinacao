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
import { useEffect, useCallback, useState } from "react";
import requestService from "../../services/requestService";
import { formatDate } from "../../utils/functions";
import { Delete, Edit } from "@material-ui/icons";
import subjectService from "../../services/subjectService";

export default function Requests() {
  const [rows, setRows] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [idEdit, setIdEdit] = useState();
  const [request, setRequest] = useState({});
  const [listSubjects, setListSubjects] = useState([]);
  const columns = [
    {
      field: "person",
      headerName: "Nome",
      align: "center",
      headerAlign: "center",
      width: window.innerWidth * 0.17,
    },
    {
      field: "description",
      headerName: "Descrição",
      align: "center",
      headerAlign: "center",
      width: window.innerWidth * 0.17,
    },
    {
      field: "date",
      headerName: "Data",
      align: "center",
      headerAlign: "center",
      width: window.innerWidth * 0.17,
      renderCell: (gridParams) => {
        const { date } = gridParams.row;
        return <div>{formatDate(date)}</div>;
      },
    },
    {
      field: "update_at",
      headerName: "Atualizado em",
      align: "center",
      headerAlign: "center",
      width: window.innerWidth * 0.17,
      renderCell: (gridParams) => {
        const { update_at } = gridParams.row;
        return <div>{formatDate(update_at)}</div>;
      },
    },
    {
      field: "options",
      headerName: "Opções",
      width: window.innerWidth * 0.17,
      renderCell: (gridParams) => {
        const { id, person, subject_id, description } = gridParams.row;
        return (
          <div>
            <IconButton
              onClick={() => {
                setRequest({
                  person: person,
                  subject_id: subject_id,
                  description: description,
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

  const fetchRequests = useCallback(async () => {
    const response = await requestService.getList();
    const responseSubjects = await subjectService.getList();
    if (response !== null) {
      setRows(response.data || []);
    }
    setListSubjects(responseSubjects.data);
  }, [setRows, setListSubjects]);

  function handleEdit(id) {
    setIdEdit(id);
    setOpenEdit(true);
  }

  async function handleDelete(id) {
    const response = await requestService.deleteRequest(id);
    if (response !== null) {
      await fetchRequests();
    } else alert("Ocorreu um erro");
  }

  async function updateRequest() {
    let response = await requestService.editRequest(idEdit, request);
    if (response === null) alert("Ocorreu um erro");
  }

  async function addRequest() {
    let response = await requestService.addRequest(request);
    if (response === null) alert("Ocorreu um erro");
  }

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

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
        onClose={() => setOpenEdit(false)}
        open={openEdit}
        maxWidth="sm"
        fullWidth
      >
        <DialogContent style={{ marginBottom: 30 }}>
          <Grid container direction="column" spacing={3}>
            <Grid item xs={12} sm={12} md={12}>
              <select
                value={request?.subject_id}
                onChange={(e) => {
                  setRequest({ ...request, subject_id: e.target.value });
                }}
              >
                {listSubjects !== null &&
                  listSubjects?.map((item, index) => (
                    <option key={index} value={item.id}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <TextField
                fullWidth
                label="Nome"
                defaultValue={request?.person}
                size="small"
                variant="outlined"
                onChange={(event) => {
                  setRequest({ ...request, person: event.target.value });
                }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <TextField
                fullWidth
                label="Descrição"
                defaultValue={request?.description}
                size="small"
                variant="outlined"
                onChange={(event) => {
                  setRequest({ ...request, description: event.target.value });
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEdit(false)} color="primary">
            Voltar
          </Button>
          <Button
            onClick={async () => {
              if (idEdit) await updateRequest();
              else await addRequest();
              await fetchRequests();
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
