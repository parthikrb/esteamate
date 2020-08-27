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
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import FaceIcon from "@material-ui/icons/Face";

const useStyles = makeStyles({
  root: {
    minWidth: "100%",
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
  chip: {
    marginRight: 5,
    marginBottom: 5,
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

const ListTableComponent = React.memo(({ columns, rows, sendRowDetails }) => {
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
    sendRowDetails(data);
    setSelectedRow(data.id);
  };

  const isSelected = (id) => selectedRow === id;

  return (
    <Paper>
      <TableContainer className={classes.container}>
        <Table
          className={classes.table}
          size="small"
          stickyHeader
          aria-label="User Table"
        >
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
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                const isRowSelected = isSelected(row.id);
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
                          {typeof value === "string" &&
                          column.id.includes("date")
                            ? value.substring(0, 10)
                            : typeof value === "string"
                            ? value
                            : value.hasOwnProperty("squad_name")
                            ? value.squad_name
                            : value.map((v) => {
                                return (
                                  <Chip
                                    className={classes.chip}
                                    variant="outlined"
                                    size="small"
                                    key={v.id}
                                    avatar={
                                      <Avatar>
                                        {`${v.firstname
                                          .charAt(0)
                                          .toUpperCase()}`}
                                      </Avatar>
                                    }
                                    label={`${v.firstname} ${v.lastname}`}
                                    color="primary"
                                  />
                                );
                              })}
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
        rowsPerPageOptions={[5, 10]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
});

export default ListTableComponent;
