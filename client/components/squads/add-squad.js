import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { addSquad } from "../../store/actions/squad";
import { TextField, CssBaseline, FormControl, Grid } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import AddHeaderComponent from "../shared/add-header";
import { styleRoot, styleAddControls } from "../../helpers/shared-styles";
import RequiredField from "../shared/required-field";

const AddSquadComponent = (props) => {
  const { users } = props;
  const [, setAddMore] = useState(false);

  const [formFields, setFormFields] = useState({
    squadName: "",
    productOwner: [],
    scrumMaster: [],
    scrumTeam: [],
  });

  const [formErrors, setFormErrors] = useState({
    squadName: false,
    productOwner: false,
    scrumMaster: false,
    scrumTeam: false,
  });

  const [error, setError] = useState(false);

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
    const formValues = { ...formFields };
    const selectedValues = [];

    if (value) {
      value.map((v) => selectedValues.push(v.id));
      formValues[event.target.name] = selectedValues;
    } else {
      formValues[event.target.name] = event.target.value;
    }

    setFormFields(formValues);
  };

  const handleAddMoreChange = (event) => {
    setAddMore(event.target.checked);
  };

  const handleSave = async () => {
    const data = {
      squad_name: formFields.squadName,
      product_owner: formFields.productOwner,
      scrum_master: formFields.scrumMaster,
      scrum_team: formFields.scrumTeam,
    };

    props.onSave(data);
  };

  return (
    <Fragment>
      <form style={styleRoot} autoComplete="off">
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
                name="squadName"
                label="Squadname"
                value={formFields.squadName}
                onChange={handleValueChange}
                onBlur={validateField}
                required
                autoFocus
                error={formErrors.squadName}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl style={styleAddControls}>
              <Autocomplete
                multiple
                id="productOwner"
                options={users}
                onChange={handleValueChange}
                onClose={validateField}
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
                    placeholder="Parthiban Baskar"
                    error={formErrors.productOwner}
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
                onChange={handleValueChange}
                onClose={validateField}
                filterSelectedOptions
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Scrum Master"
                    name="scrumMaster"
                    placeholder="Parthiban Baskar"
                    error={formErrors.scrumMaster}
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
                onChange={handleValueChange}
                onClose={validateField}
                filterSelectedOptions
                renderInput={(params) => (
                  <TextField
                    {...params}
                    name="scrumTeam"
                    label="Scrum Team"
                    placeholder="Parthiban Baskar"
                    error={formErrors.scrumTeam}
                  />
                )}
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
    loading: state.squad.loading,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onSave: (data) => dispatch(addSquad(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddSquadComponent);
