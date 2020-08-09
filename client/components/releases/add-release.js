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
  Chip,
  Checkbox,
  Grid,
  Button,
} from "@material-ui/core";
import {
  styleRoot,
  styleAppBar,
  styleAppBarTitle,
  styleCancelButton,
  styleAddControls,
} from "../../helpers/shared-styles";
import axios from "axios";
import { useForm } from "react-hook-form";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    width: "100%",
  },
}));

const AddReleaseComponent = ({ squads }) => {
  const [addMore, setAddMore] = useState(false);
  const [squadname, setSquadName] = useState("");
  const [releaseName, setReleaseName] = useState("");
  const [startDate, setStartDate] = useState(undefined);
  const [endDate, setEndDate] = useState(undefined);

  const { register, handleSubmit } = useForm();
  const { addToast } = useToasts();

  const handleAddMoreChange = (event) => {
    setAddMore(event.target.checked);
  };

  const handleSquadNameChange = (event) => {
    setSquadName(event.target.value);
  };

  const handleReleaseNameChange = (event) => {
    setReleaseName(event.target.value);
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  return (
    <Fragment>
      <form style={styleRoot} autoComplete="off" onSubmit={handleSubmit()}>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <CssBaseline />
            <AppBar position="static" style={styleAppBar}>
              <Toolbar>
                <Typography style={styleAppBarTitle} variant="h5">
                  Add Release
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
                <Button variant="outlined" style={styleCancelButton}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="outlined"
                  color="secondary"
                  onClick={() => handleSave()}
                >
                  Save
                </Button>
              </Toolbar>
            </AppBar>
          </Grid>
          <Grid item xs={6}>
              
          </Grid>
        </Grid>
      </form>
    </Fragment>
  );
};
