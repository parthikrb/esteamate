import React from "react";
import ListTableComponent from "../shared/list-table";

const columns = [
  {
    id: "squad",
    label: "Squad",
  },
  {
    id: "release_name",
    label: "Release Name",
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

const ListReleasesComponent = ({ rows, sendRowDetails }) => {
  console.log(rows);
  return (
    <ListTableComponent
      columns={columns}
      rows={rows}
      sendRowDetails={sendRowDetails}
    />
  );
};

export default ListReleasesComponent;
