import { DataGrid } from "@material-ui/data-grid";
import { useEffect, useCallback, useState } from "react";
import subjectService from "../../services/subjectService";
import { formatPrice } from "../../utils/functions";

export default function Home() {
  const [rows, setRows] = useState([]);
  const columns = [
    {
      field: "name",
      headerName: "Nome",
      align: "center",
      headerAlign: "center",
      width: window.innerWidth * 0.3,
    },

    {
      field: "price",
      headerName: "Preço",
      align: "center",
      headerAlign: "center",
      width: window.innerWidth * 0.3,
      renderCell: (gridParams) => {
        const { price } = gridParams.row;
        return <div>{formatPrice(price)}</div>;
      },
    },
  ];

  const fetchSubjects = useCallback(async () => {
    const response = await subjectService.getList();
    if (response !== null) {
      setRows(response.data || []);
    }
  }, [setRows]);

  useEffect(() => {
    fetchSubjects();
  }, [fetchSubjects]);

  return (
    <>
      <DataGrid
        rows={rows}
        columns={columns}
        style={{ height: "80vh" }}
        hideFooter
      />
    </>
  );
}
