import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { addRelease } from "../../store/actions/release";
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
import RequiredField from "../shared/required-field";

const AddReleaseComponent = (props) => {
  const { squads } = props;
  const [addMore, setAddMore] = useState(false);

  const [formFields, setFormFields] = useState({
    squadName: "",
    releaseName: "",
    startDate: new Date(),
    endDate: new Date(),
    devReserve: 0,
    qaReserve: 0,
    isReleaseConfig: false,
  });

  const [formErrors, setFormErrors] = useState({
    squadName: false,
    releaseName: false,
    // startDate: false,
    // endDate: false,
    // devReserve: false,
    // qaReserve: false,
    // isReleaseConfig: false,
  });

  const [error, setError] = useState(false);

  const handleSave = async () => {
    const data = {
      squad: formFields.squadName,
      release_name: formFields.releaseName,
      start_date: formFields.startDate,
      end_date: formFields.endDate,
      dev_reserve: formFields.devReserve,
      qa_reserve: formFields.qaReserve,
      is_release_reserve: formFields.isReleaseConfig,
    };
    props.onSave(data);
  };

  const validateField = (event) => {
    const formFieldErrors = { ...formErrors };
    const valueLength =
      typeof event.target.value === "string"
        ? event.target.value.trim().length
        : event.target.value.length;

    formFieldErrors[event.target.name] = valueLength === 0 ? true : false;

    setError(Object.values(formFieldErrors).includes(true));
    setFormErrors(formFieldErrors);
  };

  const handleValueChange = (event, value) => {
    console.log(typeof value);
    const formValues = { ...formFields };
    const values =
      event.target.type === "checkbox" ? value : event.target.value;

    formValues[event.target.name] =
      value && typeof value !== "boolean"
        ? value.id
        : value && event.target.type === "checkbox"
        ? value
        : values;
    setFormFields(formValues);
  };

  const handleAddMoreChange = (event) => {
    setAddMore(event.target.checked);
  };

  const handleStartDateChange = (date) => {
    const formValues = { ...formFields };
    formValues.startDate = date;
    setFormFields(formValues);
  };

  const handleEndDateChange = (date) => {
    const formValues = { ...formFields };
    formValues.endDate = date;
    setFormFields(formValues);
  };

  return (
    <Fragment>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <form style={styleRoot} autoComplete="off">
          <Grid container spacing={0}>
            <Grid item xs={12}>
              <CssBaseline />
              <AddHeaderComponent
                headerName="Add Release"
                isAddMore={handleAddMoreChange}
                shouldSave={handleSave}
                disableSave={error}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl style={styleAddControls}>
                <Autocomplete
                  id="squadName"
                  options={squads}
                  onChange={handleValueChange}
                  onClose={validateField}
                  size="small"
                  getOptionLabel={(option) => `${option.squad_name}`}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Squad Name"
                      name="squadName"
                      placeholder="Squad"
                      error={formErrors.squadName}
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
                  value={formFields.releaseName}
                  onChange={handleValueChange}
                  onBlur={validateField}
                  error={formErrors.releaseName}
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
                  value={formFields.startDate}
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
                  value={formFields.endDate}
                  autoOk
                  minDate={new Date(formFields.startDate)}
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
                  name="devReserve"
                  label="Development Reserve"
                  value={formFields.devReserve}
                  onChange={handleValueChange}
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
                  name="qaReserve"
                  label="QA Reserve"
                  value={formFields.qaReserve}
                  onChange={handleValueChange}
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
                      checked={formFields.isReleaseConfig}
                      onChange={handleValueChange}
                      name="isReleaseConfig"
                    />
                  }
                  label="Is Release Config?"
                />
              </FormControl>
            </Grid>
            {error && (
              <Grid item xs={12}>
                <RequiredField />
              </Grid>
            )}
          </Grid>
        </form>
      </MuiPickersUtilsProvider>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    squads: state.squad.squads,
    loading: state.release.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSave: (data) => dispatch(addRelease(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddReleaseComponent);
