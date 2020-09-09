import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles((theme) => ({
  root: {
    // padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: "100%",
    marginBottom: 5,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    border: "none",
    "&:focus": {
      outline: "none !important",
    },
  },
  iconButton: {
    padding: 10,
    color: "green",
  },
}));

const AddRetroPoint = (props) => {
  const { classification, handleSave } = props;
  const classes = useStyles();
  const [description, setDescription] = useState("");

  const addItem = (event) => {
    const data = {
      sprint: "5f589e0f9e5a4000236e83de",
      classification,
      description,
    };
    handleSave(data);
    setDescription("");
  };
  return (
    <Paper component="form" className={classes.root}>
      <TextareaAutosize
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        className={classes.input}
        rowsMax={4}
        aria-label="retro points"
        placeholder="I would say.."
      />
      <IconButton
        className={classes.iconButton}
        aria-label="add"
        onClick={addItem}
      >
        <AddIcon />
      </IconButton>
    </Paper>
  );
};

export default AddRetroPoint;
