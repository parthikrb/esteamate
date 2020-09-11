import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: 0,
    minWidth: 120,
  },
}));

const SelectSprint = (props) => {
  const { sprints } = props;
  const [sprintId, setSprintId] = useState(sprints[0].id);

  const classes = useStyles();

  const handleChange = (event) => {
    setSprintId(event.target.value);
    props.handleSprintChange(event.target.value);
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="select-sprint">Sprint</InputLabel>
        <Select
          labelId="select-sprint"
          id="select-sprint"
          value={sprintId}
          onChange={handleChange}
        >
          {sprints.map((sprint) => {
            return (
              <MenuItem key={sprint.id} value={sprint.id}>
                {sprint.sprint_name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
};

export default SelectSprint;
