import React, { Fragment, useState, useEffect } from "react";
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
import Autocomplete from "@material-ui/lab/Autocomplete";

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

const AddSquadComponent = ({ users }) => {
  const classes = useStyles();

  const [addMore, setAddMore] = useState(false);
  const [squadName, setSquadName] = useState("");
  const [productOwner, setProductOwner] = useState([]);
  const [scrumMaster, setScrumMaster] = useState([]);
  const [scrumTeam, setScrumTeam] = useState([]);

  const { addToast } = useToasts();

  const handleAddMoreChange = (event) => {
    setAddMore(event.target.checked);
  };

  const handleSquadNameChange = (event) => {
    setSquadName(event.target.value);
  };

  const handleProductOwnerChange = (event, values) => {
    const selectedPO = [];
    values.map((value) => selectedPO.push(value.id));
    setProductOwner(selectedPO);
  };

  const handleScrumMasterChange = (event, values) => {
    const selectedSM = [];
    values.map((value) => selectedSM.push(value.id));
    setScrumMaster(selectedSM);
  };

  const handleScrumTeamChange = (event, values) => {
    const selectedST = [];
    values.map((value) => selectedST.push(value.id));
    setScrumTeam(selectedST);
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
                  Add Squad
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
                id="squadname"
                label="Squadname"
                value={squadName}
                onChange={handleSquadNameChange}
                required
                autoFocus
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl className={classes.formControl}>
              <Autocomplete
                multiple
                id="productOwner"
                options={users}
                onChange={handleProductOwnerChange}
                size="small"
                getOptionLabel={(option) =>
                  `${option.firstname} ${option.lastname}`
                }
                filterSelectedOptions
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Product Owner"
                    placeholder="Parthiban Baskar"
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl className={classes.formControl}>
              <Autocomplete
                multiple
                id="scrumMaster"
                options={users}
                getOptionLabel={(option) =>
                  `${option.firstname} ${option.lastname}`
                }
                size="small"
                onChange={handleScrumMasterChange}
                filterSelectedOptions
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Scrum Master"
                    placeholder="Parthiban Baskar"
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl className={classes.formControl}>
              <Autocomplete
                multiple
                id="scrumTeam"
                options={users}
                getOptionLabel={(option) =>
                  `${option.firstname} ${option.lastname}`
                }
                size="small"
                onChange={handleScrumTeamChange}
                filterSelectedOptions
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Scrum Team"
                    placeholder="Parthiban Baskar"
                  />
                )}
              />
            </FormControl>
          </Grid>
        </Grid>
      </form>
    </Fragment>
  );
};

export default AddSquadComponent;
