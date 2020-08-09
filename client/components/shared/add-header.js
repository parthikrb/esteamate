import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  FormControlLabel,
  Checkbox,
  Button,
} from "@material-ui/core";
import {
  styleAppBar,
  styleAppBarTitle,
  styleCancelButton,
} from "../../helpers/shared-styles";

const AddHeaderComponent = ({ isAddMore, shouldSave }) => {
  const [addMore, setAddMore] = useState(false);

  const handleAddMoreChange = (event) => {
    setAddMore(event.target.checked);
    isAddMore(event);
  };

  const handleSave = () => {
    shouldSave();
  };

  return (
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
          onClick={() => handleSave()}
        >
          Save
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default AddHeaderComponent;
