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
import {
  styleRoot,
  styleAppBar,
  styleAppBarTitle,
  styleCancelButton,
  styleAddControls,
} from "../../helpers/shared-styles";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    width: "100%",
  },
}));

const AddSquadComponent = ({ users }) => {
  const classes = useStyles();

  const [addMore, setAddMore] = useState(false);
  const [squadName, setSquadName] = useState("");
  const [productOwner, setProductOwner] = useState([]);
  const [scrumMaster, setScrumMaster] = useState([]);
  const [scrumTeam, setScrumTeam] = useState([]);

  const { register, handleSubmit } = useForm();
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

  const handleClick = async () => {
    const data = {
      squad_name: squadName,
      product_owner: productOwner,
      scrum_master: scrumMaster,
      scrum_team: scrumTeam,
    };

    await axios
      .post("/api/squads", { ...data })
      .then((res) => {
        addToast("Squad Added", { appearance: "success" });
      })
      .catch((res, err) => {
        addToast(res.message, { appearance: "error" });
      });
    console.log("Button Clicked");
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
                <Button variant="outlined" style={styleCancelButton}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="outlined"
                  color="secondary"
                  onClick={() => handleClick()}
                >
                  Save
                </Button>
              </Toolbar>
            </AppBar>
          </Grid>
          <Grid item xs={6}>
            <FormControl style={styleAddControls}>
              <TextField
                id="squadname"
                name="squadname"
                label="Squadname"
                inputRef={register({ required: true })}
                value={squadName}
                onChange={handleSquadNameChange}
                required
                autoFocus
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl style={styleAddControls}>
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
                    name="productOwner"
                    inputRef={register({ required: true })}
                    placeholder="Parthiban Baskar"
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl style={styleAddControls}>
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
                    name="scrumMaster"
                    placeholder="Parthiban Baskar"
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl style={styleAddControls}>
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
                    name="scrumTeam"
                    inputRef={register({ required: true })}
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
