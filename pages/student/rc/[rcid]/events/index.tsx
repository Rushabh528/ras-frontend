import React, { useEffect, useState } from "react";
import { GridColDef } from "@mui/x-data-grid";
import { useRouter } from "next/router";
import Button from "@mui/material/Button";
import { Tooltip } from "@mui/material";

import eventsRequest, { Event } from "@callbacks/student/rc/events";
import DataGrid from "@components/DataGrid";
import Meta from "@components/Meta";
import useStore from "@store/store";

const columns: GridColDef[] = [
  {
    field: "ID",
    headerName: "ID",
    hide: true,
  },
  {
    field: "company_name",
    headerName: "Company Name",
    renderCell: (params) => (
      <Tooltip title={params.value}>
        <div>{params.value}</div>
      </Tooltip>
    ),
  },
  {
    field: "role",
    headerName: "Role",
    hide: true,
  },
  {
    field: "profile",
    headerName: "Profile",
    renderCell: (params) => (
      <Tooltip title={params.value}>
        <div>{params.value}</div>
      </Tooltip>
    ),
  },
  {
    field: "name",
    headerName: "Event Name",
    renderCell: (params) => (
      <Tooltip title={params.value}>
        <div>{params.value}</div>
      </Tooltip>
    ),
  },
  {
    field: "CreatedAt",
    headerName: "Created At",
    renderCell: (params) =>
      new Date(params.row.CreatedAt).toLocaleDateString("en-GB"),
    hide: true,
  },
  {
    field: "UpdatedAt",
    headerName: "Updated At",
    renderCell: (params) =>
      new Date(params.row.UpdatedAt).toLocaleDateString("en-GB"),
    hide: true,
  },
  {
    field: "duration",
    headerName: "Event Duration",
  },
  {
    field: "start_time",
    headerName: "Start Time",
    renderCell: (params) =>
      new Date(params.row.start_time).toLocaleTimeString(),
  },
  {
    field: "View Details",
    renderCell: (params) => (
      <Button
        href={`/student/rc/${params.row.recruitment_cycle_id}/events/${params.row.ID}`}
        variant="contained"
        style={{ width: "100%" }}
      >
        View Details
      </Button>
    ),
  },
];
function Index() {
  const router = useRouter();
  const { rcid } = router.query;
  const rid = rcid as string;

  const { token, rcName } = useStore();

  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (router.isReady) {
        let response = await eventsRequest.getAll(token, rid);
        for (let i = 0; i < response.length; i += 1) {
          response[i].recruitment_cycle_id = rid;
        }
        setEvents(response);
      }
    };
    if (router.isReady) fetchData();
  }, [rid, router.isReady, token]);

  return (
    <div>
      <Meta title={`Events - ${rcName}`} />
      <h2>Events</h2>
      <DataGrid rows={events} columns={columns} getRowId={(row) => row.ID} />
    </div>
  );
}

Index.layout = "studentPhaseDashboard";
export default Index;
