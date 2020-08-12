import React, { Fragment, useState } from "react";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import {
  TextField,
  CssBaseline,
  FormControl,
  FormControlLabel,
  Grid,
  Switch,
  Input,
  InputLabel,
  InputAdornment,
} from "@material-ui/core";
import { styleRoot, styleAddControls } from "../../helpers/shared-styles";
import Autocomplete from "@material-ui/lab/Autocomplete";
import AddHeaderComponent from "../shared/add-header";
import { useForm } from "react-hook-form";

const AddReleaseComponent = ({ squads }) => {
  const [addMore, setAddMore] = useState(false);
  const [squadName, setSquadName] = useState("");
  const [releaseName, setReleaseName] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [devReserve, setDevReserve] = useState(undefined);
  const [qaReserve, setQAReserve] = useState(undefined);
  const [isReleaseConfig, setIsReleaseConfig] = useState(false);

  const { handleSubmit: handleSave } = useForm();

  const handleAddMoreChange = (event) => {
    setAddMore(event.target.checked);
  };

  const handleSquadNameChange = (event) => {
    setSquadName(event.target.value);
  };

  const handleReleaseNameChange = (event) => {
    setReleaseName(event.target.value);
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const handleDevReserveChange = (event) => {
    setDevReserve(event.target.value);
  };

  const handleQaReserveChange = (event) => {
    setQAReserve(event.target.value);
  };

  const handleIsReleaseConfigChange = (event) => {
    setIsReleaseConfig(event.target.checked);
  };

  return (
    <Fragment>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <form style={styleRoot} autoComplete="off" onSubmit={handleSave()}>
          <Grid container spacing={0}>
            <Grid item xs={12}>
              <CssBaseline />
              <AddHeaderComponent
                headerName="Add Release"
                isAddMore={handleAddMoreChange}
                shouldSave={handleSave}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl style={styleAddControls}>
                <Autocomplete
                  id="squadName"
                  options={squads}
                  onChange={handleSquadNameChange}
                  size="small"
                  getOptionLabel={(option) => `${option.squad_name}`}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Squad Name"
                      name="squadName"
                      placeholder="Squad"
                    />
                  )}
                ></Autocomplete>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl style={styleAddControls}>
                <TextField
                  id="releaseName"
                  name="releaseName"
                  label="Release Name"
                  value={releaseName}
                  onChange={handleReleaseNameChange}
                  required
                />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl style={styleAddControls}>
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="MM/dd/yyyy"
                  margin="normal"
                  id="start-date-picker"
                  label="Start Date"
                  value={startDate}
                  autoOk
                  onChange={handleStartDateChange}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl style={styleAddControls}>
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="MM/dd/yyyy"
                  margin="normal"
                  id="end-date-picker"
                  label="End Date"
                  value={endDate}
                  autoOk
                  minDate={new Date(startDate)}
                  onChange={handleEndDateChange}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl style={styleAddControls}>
                <InputLabel htmlFor="devReserve">
                  Development Reserve
                </InputLabel>
                <Input
                  type="number"
                  id="devReserve"
                  label="Development Reserve"
                  value={devReserve}
                  onChange={handleDevReserveChange}
                  endAdornment={
                    <InputAdornment position="end">%</InputAdornment>
                  }
                  required
                />
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl style={styleAddControls}>
                <InputLabel htmlFor="qaReserve">QA Reserve</InputLabel>
                <Input
                  type="number"
                  id="qaReserve"
                  label="QA Reserve"
                  value={qaReserve}
                  onChange={handleQaReserveChange}
                  endAdornment={
                    <InputAdornment position="end">%</InputAdornment>
                  }
                  required
                />
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl style={styleAddControls}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={isReleaseConfig}
                      onChange={handleIsReleaseConfigChange}
                      name="isReleaseConfig"
                    />
                  }
                  label="Is Release Config?"
                />
              </FormControl>
            </Grid>
          </Grid>
        </form>
      </MuiPickersUtilsProvider>
    </Fragment>
  );
};

export default AddReleaseComponent;
