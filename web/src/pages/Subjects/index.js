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
import subjectService from "../../services/subjectService";
import { formatDate, formatPrice } from "../../utils/functions";
import { Delete, Edit } from "@material-ui/icons";

export default function Subjects() {
  const [rows, setRows] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [idEdit, setIdEdit] = useState();
  const [subject, setSubject] = useState({});
  const columns = [
    {
      field: "name",
      headerName: "Nome",
      align: "center",
      headerAlign: "center",
      width: window.innerWidth * 0.17,
    },
    {
      field: "price",
      headerName: "Preço",
      align: "center",
      headerAlign: "center",
      width: window.innerWidth * 0.17,
      renderCell: (gridParams) => {
        const { price } = gridParams.row;
        return <div>{formatPrice(price)}</div>;
      },
    },
    {
      field: "created_at",
      headerName: "Criado em",
      align: "center",
      headerAlign: "center",
      width: window.innerWidth * 0.17,
      renderCell: (gridParams) => {
        const { created_at } = gridParams.row;
        return <div>{formatDate(created_at)}</div>;
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
        const { id, name, price } = gridParams.row;
        return (
          <div>
            <IconButton
              onClick={() => {
                setSubject({ name: name, price: price });
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

  const fetchSubjects = useCallback(async () => {
    const response = await subjectService.getList();
    if (response !== null) {
      setRows(response.data || []);
    }
  }, [setRows]);

  function handleEdit(id) {
    setIdEdit(id);
    setOpenEdit(true);
  }

  async function handleDelete(id) {
    const response = await subjectService.deleteSubject(id);
    if (response !== null) {
      await fetchSubjects();
    } else alert("Ocorreu um erro");
    setSubject();
  }

  async function updateSubject() {
    let response = await subjectService.editSubject(idEdit, subject);
    if (response === null) alert("Ocorreu um erro");
    setSubject();
  }

  async function addSubject() {
    let response = await subjectService.addSubject(subject);
    if (response === null) alert("Ocorreu um erro");
  }

  useEffect(() => {
    fetchSubjects();
  }, [fetchSubjects]);

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
              <TextField
                fullWidth
                label="Nome"
                defaultValue={subject?.name}
                size="small"
                variant="outlined"
                onChange={(event) => {
                  setSubject({ ...subject, name: event.target.value });
                }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <TextField
                fullWidth
                label="Preço"
                defaultValue={subject?.price}
                type="number"
                size="small"
                variant="outlined"
                onChange={(event) => {
                  setSubject({ ...subject, price: Number(event.target.value) });
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
              if (idEdit) await updateSubject();
              else await addSubject();
              await fetchSubjects();
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
