import React from "react";
import ListTableComponent from "../shared/list-table";

const columns = [
  {
    id: "release",
    label: "Release",
  },
  {
    id: "sprint_name",
    label: "Sprint Name",
  },
  {
    id: "start_date",
    label: "Start Date",
  },
  {
    id: "end_date",
    label: "End Date",
  },
];

const ListSprintsComponent = ({ rows, sendRowDetails }) => {
  return (
    <ListTableComponent
      columns={columns}
      rows={rows}
      sendRowDetails={sendRowDetails}
    />
  );
};

export default ListSprintsComponent;
