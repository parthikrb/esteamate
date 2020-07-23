import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import theme from "../../pages/theme";

const useStyles = makeStyles({
  root: {
    minWidth: "70%",
    animation: `$reduceWidth 5000ms easeInOut 500ms`,
  },
  container: {
    maxHeight: 440,
  },
  tableHead: {
    backgroundColor: "green",
  },
  pagination: {
    bottom: 0,
    position: "absolute",
  },
  "@keyframes reduceWidth": {
    "0%": {
      width: "100%",
    },
    "100%": {
      width: "70%",
    },
  },
});

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
    id: "email",
    label: "Email",
  },
  {
    id: "role",
    label: "Role",
  },
];

const ListUsersComponent = ({ users, sendUserDetails }) => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedRow, setSelectedRow] = useState(undefined);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleRowClick = (event, data) => {
    sendUserDetails(data);
    setSelectedRow(data.username);
  };

  const isSelected = (username) => selectedRow === username;

  return (
    <Paper style={selectedRow ? { width: "70%" } : { width: "100%" }}>
      <TableContainer className={classes.container}>
        <Table className={classes.table} stickyHeader aria-label="User Table">
          <TableHead className={classes.tableHead}>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} align={column.align}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {users
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                const isRowSelected = isSelected(row.username);
                return (
                  <TableRow
                    hover
                    tabIndex={-1}
                    onClick={(e) => handleRowClick(e, row)}
                    selected={isRowSelected}
                    key={row.id}
                  >
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        className={classes.pagination}
        rowsPerPageOptions={[10, 15, 20]}
        component="div"
        count={users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default ListUsersComponent;
