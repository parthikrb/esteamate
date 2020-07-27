import React, { Fragment, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useToasts } from "react-toast-notifications";
import {
  TextField,
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  FormControl,
  FormControlLabel,
  Checkbox,
  Grid,
  Button,
  InputLabel,
  Select,
} from "@material-ui/core";
import { useForm } from "react-hook-form";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    width: "100%",
  },
  formControl: {
    margin: "5px 10px",
    width: "-webkit-fill-available",
  },
  appBar: {
    backgroundColor: theme.palette.primary.main,
  },
  title: {
    flexGrow: 1,
  },
  cancelBtn: {
    color: theme.palette.error.main,
    marginRight: "20px",
  },
}));

const AddUserComponent = () => {
  const classes = useStyles();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [reserve, setReserve] = useState(0);
  const [addMore, setAddMore] = useState(false);

  const { register, handleSubmit, errors } = useForm();
  const { addToast } = useToasts();

  const onSubmit = async (data) => {
    await axios
      .post("/api/users/signup", { ...data })
      .then((res) => {
        addToast("User Added", { appearance: "success" });
      })
      .catch((res, err) => {
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
        className={classes.root}
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <CssBaseline />
            <AppBar position="static">
              <Toolbar>
                <Typography className={classes.title} variant="h5">
                  Add User
                </Typography>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={addMore}
                      onChange={handleAddMoreChange}
                      name="addMore"
                    />
                  }
                  label="Add More"
                />
                <Button variant="outlined" className={classes.cancelBtn}>
                  Cancel
                </Button>
                <Button type="submit" variant="outlined" color="secondary">
                  Save
                </Button>
              </Toolbar>
            </AppBar>
          </Grid>
          <Grid item xs={6}>
            <FormControl className={classes.formControl}>
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
            <FormControl className={classes.formControl}>
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
            <FormControl className={classes.formControl}>
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
            <FormControl className={classes.formControl}>
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
            <FormControl className={classes.formControl}>
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
            {/* <FormControl className={classes.formControl}>
              <TextField
                classes={{ root: classes.root }}
                select
                name="role"
                id="role"
                label="Role"
                inputRef={register({ required: true })}
                required
                SelectProps={{
                  multiple: false,
                  value: role,
                  onChange: handleRoleChange,
                }}
              >
                <MenuItem value={"Developer"}>Developer</MenuItem>
                <MenuItem value={"Quality Analyst"}>Quality Analyst</MenuItem>
                <MenuItem value={"Business Analyst"}>Business Analyst</MenuItem>
                <MenuItem value={"Scrum Master"}>Scrum Master</MenuItem>
                <MenuItem value={"Product Owner"}>Product Owner</MenuItem>
                <MenuItem value={"Manager"}>Manager</MenuItem>
              </TextField>
            </FormControl> */}
            <FormControl className={classes.formControl}>
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
            <FormControl className={classes.formControl}>
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
            <FormControl className={classes.formControl}>
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
