import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { addSprint } from "../../store/actions/sprint";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { TextField, CssBaseline, FormControl, Grid } from "@material-ui/core";
import { styleRoot, styleAddControls } from "../../helpers/shared-styles";
import Autocomplete from "@material-ui/lab/Autocomplete";
import AddHeaderComponent from "../shared/add-header";
import RequiredField from "../shared/required-field";

const AddSprintComponent = (props) => {
  const { releases } = props;
  const [, setAddMore] = useState(false);
  const [formFields, setFormFields] = useState({
    releaseName: "",
    sprintName: "",
    startDate: new Date(),
    endDate: new Date(),
  });

  const [formErrors, setFormErrors] = useState({
    releaseName: false,
    sprintName: false,
  });

  const [error, setError] = useState(false);

  const handleSave = async () => {
    const data = {
      release: formFields.releaseName,
      sprint_name: formFields.sprintName,
      start_date: formFields.startDate,
      end_date: formFields.endDate,
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
    console.log(value);
    const formValues = { ...formFields };
    const values =
      event.target.type === "checkbox"
        ? value
        : typeof value === "object"
        ? value?.id
        : event.target.value;

    const fieldName =
      typeof value === "object" ? "releaseName" : event.target.name;

    formValues[fieldName] =
      value && typeof value !== "boolean"
        ? value.id
        : value && event.target.type === "checkbox"
        ? value
        : values;
    console.log(formValues);
    setFormFields(formValues);
  };

  const handleAutoValueChange = (event, value) => {
    console.log(`Auto`);
    console.log(event);
    console.log(value);
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
                  id="releaseName"
                  options={releases}
                  onChange={handleValueChange}
                  onClose={validateField}
                  size="small"
                  getOptionLabel={(option) => `${option.release_name}`}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Release Name"
                      name="releaseName"
                      placeholder="Squad"
                      error={formErrors.releaseName}
                    />
                  )}
                ></Autocomplete>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl style={styleAddControls}>
                <TextField
                  id="sprintName"
                  name="sprintName"
                  label="Sprint Name"
                  value={formFields.sprintName}
                  onChange={handleValueChange}
                  onBlur={validateField}
                  error={formErrors.sprintName}
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
    releases: state.release.releases,
    loading: state.sprint.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSave: (data) => dispatch(addSprint(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddSprintComponent);
