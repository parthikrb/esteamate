import React from "react";
// import MUIDataTable from "mui-datatables";

const ListUsersComponent = ({ users }) => {
  const columns = [
    {
      name: "firstname",
      label: "Firstname",
    },
    {
      name: "lastname",
      label: "Lastname",
    },
    {
      name: "username",
      label: "Username",
    },
    {
      name: "email",
      label: "Email",
    },
    {
      name: "role",
      label: "Role",
    },
    {
      name: "capacity_reserve",
      label: "Reserved Capacity",
    },
    {
      name: "isAdmin",
      label: "IsAdmin?",
    },
  ];

  const options = {
    filterType: "checkbox",
    filter: true,
    sort: true,
  };

  // <MUIDataTable
  //   title={"Users List"}
  //   data={users}
  //   columns={columns}
  //   options={options}
  // />
};

export default ListUsersComponent;
