import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { addUser } from "../../store/actions/user";
import { useToasts } from "react-toast-notifications";
import {
  TextField,
  CssBaseline,
  FormControl,
  FormControlLabel,
  Switch,
  Grid,
  InputLabel,
  Select,
} from "@material-ui/core";
import AddHeaderComponent from "../shared/add-header";
import { useForm } from "react-hook-form";
import axios from "axios";
import { styleRoot, styleAddControls } from "../../helpers/shared-styles";
import RequiredField from "../shared/required-field";

const AddUserComponent = (props) => {
  const [, setAddMore] = useState(false);
  const [error, setError] = useState(false);

  const [formFields, setFormFields] = useState({
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    email: "",
    role: "",
    isAdmin: false,
    capacity_reserve: 0,
  });

  const [formErrors, setFormErrors] = useState({
    firstname: false,
    lastname: false,
    username: false,
    password: false,
    email: false,
    role: false,
  });

  const { addToast } = useToasts();

  const handleSave = async () => {
    // await axios
    //   .post("/api/users/signup", formFields)
    //   .then(() => {
    //     addToast("User Added", { appearance: "success" });
    //   })
    //   .catch((res) => {
    //     addToast(res.message, { appearance: "error" });
    //   });
    props.onSaveUser(formFields);
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

  const handleValueChange = (event) => {
    const formValues = { ...formFields };
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    formValues[event.target.name] = value;
    setFormFields(formValues);
  };

  const handleAddMoreChange = (event) => {
    setAddMore(event.target.checked);
  };

  return (
    <Fragment>
      <form style={styleRoot} autoComplete="off">
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <CssBaseline />
            <AddHeaderComponent
              headerName="Add User"
              isAddMore={handleAddMoreChange}
              shouldSave={handleSave}
              disableSave={error}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl style={styleAddControls}>
              <TextField
                id="firstname"
                name="firstname"
                label="Firstname"
                value={formFields.firstname}
                onChange={handleValueChange}
                onBlur={validateField}
                required
                autoFocus
                error={formErrors.firstname}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl style={styleAddControls}>
              <TextField
                id="lastname"
                name="lastname"
                label="Lastname"
                value={formFields.lastname}
                onChange={handleValueChange}
                onBlur={validateField}
                required
                error={formErrors.lastname}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl style={styleAddControls}>
              <TextField
                id="username"
                name="username"
                label="Username"
                value={formFields.username}
                onChange={handleValueChange}
                onBlur={validateField}
                required
                error={formErrors.username}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl style={styleAddControls}>
              <TextField
                type="password"
                id="password"
                name="password"
                label="Password"
                value={formFields.password}
                onChange={handleValueChange}
                onBlur={validateField}
                required
                error={formErrors.password}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl style={styleAddControls}>
              <TextField
                id="email"
                name="email"
                label="Email"
                value={formFields.email}
                onChange={handleValueChange}
                onBlur={validateField}
                required
                error={formErrors.email}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl style={styleAddControls}>
              <InputLabel htmlFor="role">Role</InputLabel>
              <Select
                native
                value={formFields.role}
                onChange={handleValueChange}
                onBlur={validateField}
                inputProps={{
                  name: "role",
                  id: "role",
                }}
                required
                error={formErrors.role}
              >
                <option aria-label="None" value="" />
                <option value={"Developer"}>Developer</option>
                <option value={"Quality Analyst"}>Quality Analyst</option>
                <option value={"Business Analyst"}>Business Analyst</option>
                <option value={"Scrum Master"}>Scrum Master</option>
                <option value={"Product Owner"}>Product Owner</option>
                <option value={"Manager"}>Manager</option>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl style={styleAddControls}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formFields.isAdmin}
                    onChange={handleValueChange}
                    name="isAdmin"
                  />
                }
                label="isAdmin?"
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl style={styleAddControls}>
              <TextField
                type="number"
                id="capacity_reserve"
                name="capacity_reserve"
                label="Reserved Capacity"
                value={formFields.capacity_reserve}
                onChange={handleValueChange}
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
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    users: state.user.users,
    loading: state.user.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSaveUser: (data) => dispatch(addUser(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddUserComponent);
