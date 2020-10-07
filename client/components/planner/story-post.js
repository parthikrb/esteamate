import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: 1,
      width: "50%",
    },
  },
  buttons: {
    display: "flex",
    justifyContent: "space-around",
  },
}));

const StoryPost = () => {
  const classes = useStyles();

  return (
    <Paper elevation={3}>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField id="story" label="Story Number" />
        <Button variant="outlined" color="primary">
          Poll
        </Button>
      </form>
      <div className={classes.buttons}>
        <Button>Revote</Button>
        <Button color="secondary">Save</Button>
        <Button color="primary">Reset</Button>
      </div>
    </Paper>
  );
};

export default StoryPost;
