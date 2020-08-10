import React, { Fragment, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useToasts } from "react-toast-notifications";
import { TextField, CssBaseline, FormControl, Grid } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import AddHeaderComponent from "../shared/add-header";
import { styleRoot, styleAddControls } from "../../helpers/shared-styles";
import axios from "axios";
import { useForm } from "react-hook-form";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    width: "100%",
  },
}));

const AddSquadComponent = ({ users }) => {
  const [, setAddMore] = useState(false);
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

  const handleSave = async () => {
    const data = {
      squad_name: squadName,
      product_owner: productOwner,
      scrum_master: scrumMaster,
      scrum_team: scrumTeam,
    };

    await axios
      .post("/api/squads", { ...data })
      .then(() => {
        addToast("Squad Added", { appearance: "success" });
      })
      .catch((res) => {
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
            <AddHeaderComponent
              headerName="Add Squad"
              isAddMore={handleAddMoreChange}
              shouldSave={handleSave}
            />
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
