import React from "react"
import { DataGrid } from "@material-ui/data-grid"
import "./index.css"

const columns = [
  { field: "id", headerName: "ID", width: 200 },
  { field: "categoryType", headerName: "Category Type", width: 200 },
  { field: "activationTime", headerName: "Activation Time", width: 200 },
  { field: "isActive", headerName: "Active", width: 200 },
]

export default function DataTable({ data }) {
  return (
    <section className="table__section">
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid rows={data} columns={columns} pageSize={5} />
      </div>
    </section>
  )
}
