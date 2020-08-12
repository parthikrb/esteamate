import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import MuiAlert from "@material-ui/lab/Alert";

const useStyles = makeStyles({
  error: {
    margin: 10,
  },
});

function Alert(props) {
  return <MuiAlert elevation={6} variant="outlined" {...props} />;
}

const RequiredField = () => {
  const classes = useStyles();
  return (
    <Alert className={classes.error} severity="error">
      Highlighted field(s) are required
    </Alert>
  );
};

export default RequiredField;
