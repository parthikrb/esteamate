import React, { useState, Fragment, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
} from "@material-ui/core";

const useStyles = makeStyles({
  formControl: {
    margin: "10px",
    width: "47%",
  },
});

const SearchUserComponent = ({ setQueryDetails }) => {
  const classes = useStyles();
  const [filterColumn, setFilterColumn] = useState("");
  const [filterQuery, setFilterQuery] = useState("");

  const handleChange = (event) => {
    setFilterColumn(event.target.value);
  };

  const handleQueryChange = (event) => {
    setFilterQuery(event.target.value.toLowerCase());
  };

  useEffect(() => {
    setQueryDetails(filterColumn, filterQuery);
  }, [filterQuery]);

  return (
    <Fragment>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="filter-column">Filter column</InputLabel>
        <Select
          labelId="filter-column"
          id="filter-column"
          label="Filter Column"
          placeholder="Column to Filter"
          value={filterColumn}
          onChange={handleChange}
          fullWidth
        >
          <MenuItem value={"firstname"}>Firstname</MenuItem>
          <MenuItem value={"lastname"}>Lastname</MenuItem>
          <MenuItem value={"username"}>Username</MenuItem>
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <TextField
          id="filter-query"
          label="Query"
          placeholder="parthi"
          onChange={handleQueryChange}
          value={filterQuery}
        />
      </FormControl>
    </Fragment>
  );
};

export default SearchUserComponent;
