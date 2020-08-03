import React from "react";
import ListTableComponent from "../shared/list-table";

const columns = [
  {
    id: "squad_name",
    label: "Squad Name",
  },
  {
    id: "product_owner",
    label: "Product Owner",
  },
  {
    id: "scrum_master",
    label: "Scrum Master",
  },
];

const ListSquadsComponent = ({ rows, sendRowDetails }) => {
  return (
    <ListTableComponent
      columns={columns}
      rows={rows}
      sendRowDetails={sendRowDetails}
    />
  );
};

export default ListSquadsComponent;
