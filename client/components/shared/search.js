import React, { useState, Fragment, useEffect } from "react";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
} from "@material-ui/core";
import capitalize from "../../helpers/capitalize";
import { styleSearchControls } from "../../helpers/shared-styles";

const SearchComponent = ({ filterableColumns, setQueryDetails }) => {
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
      <FormControl style={styleSearchControls}>
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
          {filterableColumns.map((column) => {
            return (
              <MenuItem value={column} key={column}>
                {capitalize(column)}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <FormControl style={styleSearchControls}>
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

export default SearchComponent;
