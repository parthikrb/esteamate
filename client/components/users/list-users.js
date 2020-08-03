import React from "react";
import ListTableComponent from "../shared/list-table";

const columns = [
  {
    id: "firstname",
    label: "Firstname",
  },
  {
    id: "lastname",
    label: "Lastname",
  },
  {
    id: "username",
    label: "Username",
  },
  {
    id: "role",
    label: "Role",
  },
];

const ListUsersComponent = ({ rows, sendRowDetails }) => {
  return (
    <ListTableComponent
      columns={columns}
      rows={rows}
      sendRowDetails={sendRowDetails}
    />
  );
};

export default ListUsersComponent;
