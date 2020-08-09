import React, { Fragment, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useToasts } from "react-toast-notifications";
import {
  TextField,
  CssBaseline,
  FormControl,
  FormControlLabel,
  Checkbox,
  Grid,
  InputLabel,
  Select,
} from "@material-ui/core";
import AddHeaderComponent from "../shared/add-header";
import { useForm } from "react-hook-form";
import axios from "axios";
import {
  styleRoot,
  styleAddControls,
} from "../../helpers/shared-styles";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    width: "100%",
  },
}));

const AddUserComponent = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [reserve, setReserve] = useState(0);
  const [, setAddMore] = useState(false);

  const { register, handleSubmit, errors } = useForm();
  const { addToast } = useToasts();

  const handleSave = async (data) => {
    await axios
      .post("/api/users/signup", { ...data })
      .then(() => {
        addToast("User Added", { appearance: "success" });
      })
      .catch((res) => {
        addToast(res.message, { appearance: "error" });
      });
    console.log(data);
  };

  const handleFirstnameChange = (event) => {
    setFirstname(event.target.value);
  };

  const handleLastnameChange = (event) => {
    setLastname(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleIsAdminChange = (event) => {
    setIsAdmin(event.target.checked);
  };

  const handleReserveChange = (event) => {
    setReserve(event.target.value);
  };

  const handleAddMoreChange = (event) => {
    setAddMore(event.target.checked);
  };

  return (
    <Fragment>
      <form
        style={styleRoot}
        autoComplete="off"
        onSubmit={handleSubmit(handleSave)}
      >
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <CssBaseline />
            <AddHeaderComponent
              isAddMore={handleAddMoreChange}
              shouldSave={handleSave}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl style={styleAddControls}>
              <TextField
                id="firstname"
                name="firstname"
                label="Firstname"
                inputRef={register({ required: true })}
                value={firstname}
                onChange={handleFirstnameChange}
                required
                autoFocus
              />
            </FormControl>
            {errors.firstname && <span>This field is required</span>}
          </Grid>
          <Grid item xs={6}>
            <FormControl style={styleAddControls}>
              <TextField
                id="lastname"
                name="lastname"
                label="Lastname"
                inputRef={register({ required: true })}
                value={lastname}
                onChange={handleLastnameChange}
                required
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl style={styleAddControls}>
              <TextField
                id="username"
                name="username"
                label="Username"
                inputRef={register({ required: true })}
                value={username}
                onChange={handleUsernameChange}
                required
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
                inputRef={register({ required: true })}
                value={password}
                onChange={handlePasswordChange}
                required
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl style={styleAddControls}>
              <TextField
                id="email"
                name="email"
                label="Email"
                inputRef={register({ required: true })}
                value={email}
                onChange={handleEmailChange}
                required
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl style={styleAddControls}>
              <InputLabel htmlFor="role">Role</InputLabel>
              <Select
                native
                value={role}
                onChange={handleRoleChange}
                inputProps={{
                  name: "role",
                  id: "role",
                }}
                inputRef={register({ required: true })}
                required
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
                  <Checkbox
                    checked={isAdmin}
                    inputRef={register}
                    onChange={handleIsAdminChange}
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
                inputRef={register({ required: true })}
                value={reserve}
                onChange={handleReserveChange}
              />
            </FormControl>
          </Grid>
        </Grid>
      </form>
    </Fragment>
  );
};

export default AddUserComponent;
