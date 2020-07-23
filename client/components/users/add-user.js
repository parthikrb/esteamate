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
  MenuItem,
  Checkbox,
  Grid,
  Button,
} from "@material-ui/core";

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

  const { addToast } = useToasts();

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
      <form className={classes.root} autoComplete="off">
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
                <Button variant="outlined" color="secondary">
                  Save
                </Button>
              </Toolbar>
            </AppBar>
          </Grid>
          <Grid item xs={6}>
            <FormControl className={classes.formControl}>
              <TextField
                id="firstname"
                label="Firstname"
                value={firstname}
                onChange={handleFirstnameChange}
                required
                autoFocus
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl className={classes.formControl}>
              <TextField
                id="lastname"
                label="Lastname"
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
                label="Username"
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
                label="Password"
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
                label="Email"
                value={email}
                onChange={handleEmailChange}
                required
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl className={classes.formControl}>
              <TextField
                classes={{ root: classes.root }}
                select
                name="role"
                id="role"
                label="Role"
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
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl className={classes.formControl}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isAdmin}
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
                id="reserve"
                label="Reserved Capacity"
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
